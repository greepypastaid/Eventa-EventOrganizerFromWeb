<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        // Get hero event and recent events for homepage
        $heroEvent = Event::where('is_hero', true)->first();
        $recentEvents = Event::where('is_hero', false)
                            ->orderBy('date', 'asc')
                            ->limit(4)
                            ->get();
                            
        return Inertia::render('HomePage', [
            'heroEvent' => $heroEvent,
            'recentEvents' => $recentEvents
        ]);
    }

    public function about()
    {
        return Inertia::render('AboutPage');
    }

    public function events()
    {
        // Get all regular events
        $events = Event::where('event_type', 'regular')
                      ->orderBy('date', 'asc')
                      ->get();
                      
        return Inertia::render('EventsPage', [
            'events' => $events
        ]);
    }

    public function concerts()
    {
        // Get all concert events
        $concerts = Event::where('event_type', 'concert')
                        ->orderBy('date', 'asc')
                        ->get();
                        
        return Inertia::render('ConcertsPage', [
            'concerts' => $concerts
        ]);
    }

    public function eventDetail($id)
    {
        // Get the event from the database
        $event = Event::findOrFail($id);
        
        return Inertia::render('EventDetailPage', [
            'event' => $event
        ]);
    }
}
