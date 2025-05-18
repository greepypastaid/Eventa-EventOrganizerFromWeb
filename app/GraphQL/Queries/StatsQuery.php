<?php

namespace App\GraphQL\Queries;

use App\Models\Event;
use App\Models\Registration;
use App\Models\Attendance;
use App\Models\EventSession;

class StatsQuery
{
    public function stats($root, array $args)
    {
        $eventId = $args['eventId'];
        
        // Get total registrations
        $totalRegistrations = Registration::where('event_id', $eventId)->count();
        
        // Get verified registrations
        $verifiedRegistrations = Registration::where('event_id', $eventId)
            ->where('verified', true)
            ->count();
        
        // Get session attendance
        $sessions = EventSession::where('event_id', $eventId)->get();
        $sessionAttendance = [];
        
        foreach ($sessions as $session) {
            $count = Attendance::where('event_session_id', $session->id)->count();
            $sessionAttendance[] = [
                'session' => $session->title,
                'count' => $count
            ];
        }
        
        return [
            'totalRegistrations' => $totalRegistrations,
            'verifiedRegistrations' => $verifiedRegistrations,
            'sessionAttendance' => $sessionAttendance
        ];
    }
}