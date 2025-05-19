<?php

namespace App\GraphQL\Mutations;

use App\Models\Attendance;
use App\Models\EventSession;
use App\Models\Registration;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;

class AttendanceMutation
{
    public function checkIn($root, array $args)
    {   // Uncomment the following lines if you want to restrict check-in to authenticated users
        
        if (!Auth::check()) {
            throw new AuthorizationException('Anda harus login untuk melakukan check-in.');
        }
        
        $user = Auth::user();
        
        /*
        // Check if the user is authenticated
        // Only admin can check in participants
        if ($user->role !== 'admin') {
            throw new \Exception('Tidak diizinkan: Hanya admin yang dapat melakukan check-in peserta.');
        }
        */

        $qrCode = $args['input']['qrCode'];
        $sessionId = $args['input']['sessionId'];
        
        Log::info('Mencoba check-in dengan QR Code: ' . $qrCode . ' dan Session ID: ' . $sessionId);
        
        // Find the ticket by QR code
        $ticket = Ticket::where('qrCode', $qrCode)->firstOrFail();
        Log::info('Ticket ditemukan dengan ID: ' . $ticket->id);
        
        // Find the registration associated with this ticket
        $registration = Registration::where('ticket_id', $ticket->id)->firstOrFail();
        Log::info('Registration ditemukan dengan ID: ' . $registration->id . ' untuk event ID: ' . $registration->event_id);
        
        try {
            // Find the session
            $session = EventSession::where('id', $sessionId)->first();
            
            if (!$session) {
                Log::error('EventSession dengan ID ' . $sessionId . ' tidak ditemukan');
                throw new \Exception('Sesi dengan ID ' . $sessionId . ' tidak ditemukan. Pastikan ID sesi valid.');
            }
            
            Log::info('EventSession ditemukan dengan ID: ' . $session->id . ' untuk event ID: ' . $session->event_id);
            
            // Check if the session belongs to the event the user is registered for
            if ($session->event_id !== $registration->event_id) {
                Log::warning('Ketidakcocokan event: Session event_id=' . $session->event_id . ', Registration event_id=' . $registration->event_id);
                throw new \Exception('Sesi ini tidak termasuk dalam acara yang didaftarkan.');
            }
            
            // Check if already checked in
            $existingAttendance = Attendance::where('user_id', $registration->user_id)
                ->where('event_session_id', $session->id)
                ->first();
                
            if ($existingAttendance) {
                throw new \Exception('Peserta sudah melakukan check-in untuk sesi ini.');
            }
            
            // Create attendance record
            $attendance = Attendance::create([
                'user_id' => $registration->user_id,
                'event_session_id' => $session->id,
                'checked_in_at' => now(),
            ]);
            
            // Mark registration as verified
            $registration->update(['verified' => true]);
            
            Log::info('Check-in berhasil untuk user ID: ' . $registration->user_id . ' pada sesi ID: ' . $session->id);
            
            return $attendance;
        } catch (\Exception $e) {
            Log::error('Error saat check-in: ' . $e->getMessage());
            throw $e;
        }
    }
}