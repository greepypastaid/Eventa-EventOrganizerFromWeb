<?php

namespace App\GraphQL\Mutations;

use App\Models\Attendance;
use App\Models\EventSession;
use App\Models\Registration;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
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
        
        // Find the ticket by QR code
        $ticket = Ticket::where('qrCode', $qrCode)->firstOrFail();
        
        // Find the registration associated with this ticket
        $registration = Registration::where('ticket_id', $ticket->id)->firstOrFail();
        
        // Find the session
        $session = EventSession::findOrFail($sessionId);
        
        // Check if the session belongs to the event the user is registered for
        if ($session->event_id !== $registration->event_id) {
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
        
        return $attendance;
    }
}