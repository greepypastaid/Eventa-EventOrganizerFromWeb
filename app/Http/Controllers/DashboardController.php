<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Check if user is admin
        if ($user && $user->role === 'admin') {
            return $this->adminDashboard();
        }
        
        return $this->userDashboard();
    }
    
    private function adminDashboard()
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
    
    private function userDashboard()
    {
        $user = Auth::user();
        
        // Get user's registrations with event details
        $userRegistrations = Registration::with('event')
                                      ->where('user_id', $user->id)
                                      ->orderBy('created_at', 'desc')
                                      ->get();
        
        // Get upcoming events (not registered by user)
        $registeredEventIds = $userRegistrations->pluck('event_id')->toArray();
        
        $upcomingEvents = Event::where('date', '>=', now())
                            ->whereNotIn('id', $registeredEventIds)
                            ->orderBy('date', 'asc')
                            ->limit(6)
                            ->get();
        
        // Get some basic stats for the user
        $totalRegistered = $userRegistrations->count();
        $upcomingEventCount = $upcomingEvents->count();
        $pastEventCount = Registration::with('event')
                        ->where('user_id', $user->id)
                        ->whereHas('event', function ($query) {
                            $query->where('date', '<', now());
                        })
                        ->count();

        return Inertia::render('Dashboard', [
            'userRegistrations' => $userRegistrations,
            'upcomingEvents' => $upcomingEvents,
            'stats' => [
                'totalEvents' => $totalRegistered + $pastEventCount,
                'totalRegistrations' => $totalRegistered,
                'upcomingEvents' => $upcomingEventCount
            ],
            'recentEvents' => []
        ]);
    }
} 