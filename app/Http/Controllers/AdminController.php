<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Ticket;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Get stats for dashboard
        $totalEvents = Event::count();
        $totalRegistrations = Registration::count();
        $upcomingEvents = Event::where('date', '>=', now())->count();
        
        // Get recent events with registration counts
        $recentEvents = Event::withCount('registrations')
                           ->orderBy('created_at', 'desc')
                           ->limit(5)
                           ->get();
        
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalEvents' => $totalEvents,
                'totalRegistrations' => $totalRegistrations,
                'upcomingEvents' => $upcomingEvents
            ],
            'recentEvents' => $recentEvents
        ]);
    }
    
    public function createEvent()
    {
        return Inertia::render('EventCreatePage');
    }
    
    public function registrations()
    {
        $registrations = Registration::with(['event', 'user', 'ticket'])
                                   ->orderBy('created_at', 'desc')
                                   ->get();
        
        // Get all events for the dropdown
        $events = Event::orderBy('date', 'desc')->get();
                                   
        return Inertia::render('RegistrationsPage', [
            'registrations' => $registrations,
            'events' => $events
        ]);
    }
    
    public function checkIn()
    {
        // Get all events for the dropdown
        $events = Event::orderBy('date', 'desc')->get();
        
        return Inertia::render('CheckInPage', [
            'events' => $events
        ]);
    }
    
    public function analytics()
    {
        // Get events with registration counts
        $events = Event::withCount('registrations')
                      ->orderBy('date', 'desc')
                      ->get();
                      
        // Get daily registration counts for the past 30 days
        $dailyRegistrations = Registration::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                                        ->where('created_at', '>=', now()->subDays(30))
                                        ->groupBy('date')
                                        ->orderBy('date')
                                        ->get();
        
        return Inertia::render('AnalyticsPage', [
            'events' => $events,
            'dailyRegistrations' => $dailyRegistrations
        ]);
    }
    
    public function verifyTicket(Request $request)
    {
        $validated = $request->validate([
            'ticketCode' => 'required|string',
            'eventId' => 'required|integer|exists:events,id',
        ]);

        $registration = Registration::where('registration_code', $validated['ticketCode'])
                                    ->with(['user', 'event'])
                                    ->first();

        if (!$registration) {
            return response()->json(['message' => 'Ticket code not found.'], 404);
        }

        if ($registration->event_id != $validated['eventId']) {
            return response()->json(['message' => 'This ticket is not valid for the selected event.'], 422);
        }

        if ($registration->checked_in_at) {
            return response()->json([
                'message' => 'This ticket has already been checked in.',
                'checked_in_at' => Carbon::parse($registration->checked_in_at)->toIso8601String(),
                'attendee' => [
                    'name' => $registration->user->name,
                    'email' => $registration->user->email,
                    'ticketCode' => $registration->registration_code,
                ]
            ], 409);
        }

        $registration->checked_in_at = now();
        $registration->save();

        return response()->json([
            'message' => 'Check-in successful.',
            'attendee' => [
                'name' => $registration->user->name,
                'email' => $registration->user->email,
                'ticketCode' => $registration->registration_code,
                'registrationDate' => $registration->created_at->toIso8601String(),
                'verified' => true,
                'checked_in_at' => $registration->checked_in_at->toIso8601String(),
            ]
        ]);
    }
    
    public function eventRegistrations($id)
    {
        $event = Event::findOrFail($id);
        $registrations = Registration::with(['user', 'ticket'])
                                   ->where('event_id', $id)
                                   ->orderBy('created_at', 'desc')
                                   ->get();
        
        // Get all events for the dropdown
        $events = Event::orderBy('date', 'desc')->get();
                                   
        return Inertia::render('RegistrationsPage', [
            'event' => $event,
            'registrations' => $registrations,
            'events' => $events,
            'eventId' => $id
        ]);
    }

    public function getEventAnalytics($id)
    {
        $event = Event::findOrFail($id);

        $totalRegistrations = $event->registrations()->count();
        $totalAttendees = $event->registrations()->whereNotNull('checked_in_at')->count();
        $attendanceRate = $totalRegistrations > 0 ? round(($totalAttendees / $totalRegistrations) * 100, 2) : 0;
        
        // This is a simplified version. In a real app, you might have session data.
        // For now, we'll return a single "Main Event" data point.
        $sessionData = [
            [
                'session' => 'Overall Event',
                'registered' => $totalRegistrations,
                'attended' => $totalAttendees,
                'rate' => $attendanceRate,
            ]
        ];

        return response()->json([
            'totalRegistrations' => $totalRegistrations,
            'totalAttendees' => $totalAttendees,
            'attendanceRate' => $attendanceRate,
            'sessionData' => $sessionData,
        ]);
    }
}
