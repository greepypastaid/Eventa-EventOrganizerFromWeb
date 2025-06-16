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
    
    // API endpoint for searching events
    public function searchEvents(Request $request)
    {
        $query = $request->input('query');
        $date = $request->input('date');
        $location = $request->input('location');
        $category = $request->input('category');

        $events = Event::query();

        // Filter by search query if provided
        if ($query) {
            $events->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('organizer', 'like', "%{$query}%");
            });
        }

        // Filter by month
        if ($date) {
            $events->whereRaw("DATE_FORMAT(date, '%m') = ?", [$date]);
        }

        // Filter by location
        if ($location) {
            $events->where('location', 'like', "%{$location}%");
        }

        // Filter by category (event_type)
        if ($category) {
            $events->where('event_type', $category);
        }

        return $events->orderBy('date', 'asc')->get();
    }
    
    // API endpoint for getting filter options
    public function getFilterOptions()
    {
        // Get all unique locations
        $locations = Event::select('location')
                        ->distinct()
                        ->whereNotNull('location')
                        ->pluck('location');
                        
        return [
            'locations' => $locations,
            'categories' => ['regular', 'concert']
        ];
    }
}
