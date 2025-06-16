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
        $allEvents = Event::orderBy('date', 'asc')->get();

        // Get unique months and years from events
        $uniqueDates = $allEvents->map(function($event) {
            return date('F Y', strtotime($event->date));
        })->unique()->values()->toArray();

        // Define price ranges
        $priceRanges = [
            ['label' => 'Free', 'min' => 0, 'max' => 0],
            ['label' => 'Under Rp 100.000', 'min' => 1, 'max' => 100000],
            ['label' => 'Rp 100.000 - Rp 500.000', 'min' => 100000, 'max' => 500000],
            ['label' => 'Rp 500.000 - Rp 1.000.000', 'min' => 500000, 'max' => 1000000],
            ['label' => 'Above Rp 1.000.000', 'min' => 1000000, 'max' => PHP_FLOAT_MAX],
        ];
                            
        return Inertia::render('HomePage', [
            'heroEvent' => $heroEvent,
            'recentEvents' => $recentEvents,
            'allEvents' => $allEvents,
            'uniqueDates' => $uniqueDates,
            'priceRanges' => $priceRanges
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
