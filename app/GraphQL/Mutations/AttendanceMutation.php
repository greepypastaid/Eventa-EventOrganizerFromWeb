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
    {   
        // Uncomment the following lines if you want to restrict check-in to authenticated users
        
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
        
        try {
            // Find the ticket by QR code
            $ticket = Ticket::where('qrCode', $qrCode)->firstOrFail();
            Log::info('Ticket ditemukan dengan ID: ' . $ticket->id);
            
            // Find the registration associated with this ticket
            $registration = Registration::where('ticket_id', $ticket->id)->firstOrFail();
            Log::info('Registration ditemukan dengan ID: ' . $registration->id . ' untuk event ID: ' . $registration->event_id);
            
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
                // If already checked in, return the existing attendance record
                Log::info('Peserta sudah check-in untuk sesi ini. Mengembalikan record yang sudah ada.');

                // Check if checked_in_at is null and update it if necessary
                if (is_null($existingAttendance->checked_in_at)) {
                    $existingAttendance->checked_in_at = now();
                    $existingAttendance->save();
                    // Refresh the model instance to get the updated data from the database
                    $existingAttendance->refresh();
                    Log::info('Updated checked_in_at for existing attendance: ' . $existingAttendance->checked_in_at);
                }

                return $existingAttendance;
            }
            
            // Buat objek Attendance baru dengan cara yang lebih eksplisit
            $attendance = new Attendance();
            $attendance->user_id = $registration->user_id;
            $attendance->event_session_id = $session->id;
            
            // Set checked_in_at dengan nilai waktu saat ini yang eksplisit
            $now = now();
            $attendance->checked_in_at = $now;
            
            Log::info('Mencoba menyimpan attendance dengan checked_in_at: ' . $now);
            
            $attendance->save();
            
            // Refresh model untuk memastikan semua field diambil dengan benar
            $attendance->refresh();
            
            Log::info('Check-in berhasil dengan checked_in_at: ' . $attendance->checked_in_at);
            
            // Verifikasi nilai checked_in_at setelah refresh
            if (is_null($attendance->checked_in_at)) {
                Log::warning('checked_in_at masih null setelah refresh! Mencoba update langsung...');
                // Coba update langsung ke database
                \DB::table('attendances')
                    ->where('id', $attendance->id)
                    ->update(['checked_in_at' => $now]);
                
                // Refresh lagi
                $attendance->refresh();
                Log::info('Setelah update langsung, checked_in_at: ' . $attendance->checked_in_at);
            }
            
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