<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organizer' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string|max:255',
            'ticket_price' => 'required|numeric',
            'event_type' => 'required|in:regular,concert',
            'photo' => 'required|image|max:2048',
            'logo' => 'nullable|image|max:2048',
            'primary_color' => 'nullable|string|max:7',
            'secondary_color' => 'nullable|string|max:7',
            'is_hero' => 'boolean',
            'sessions' => 'nullable|array',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('events/photos', 'public');
            $validated['photo_url'] = '/storage/' . $photoPath;
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('events/logos', 'public');
            $validated['logo_url'] = '/storage/' . $logoPath;
        }

        // If this event is set as hero, remove hero status from all other events
        if ($request->boolean('is_hero')) {
            Event::where('is_hero', true)->update(['is_hero' => false]);
        }

        $event = Event::create([
            'title' => $validated['title'],
            'organizer' => $validated['organizer'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'location' => $validated['location'],
            'ticket_price' => $validated['ticket_price'],
            'photo_url' => $validated['photo_url'] ?? null,
            'logo_url' => $validated['logo_url'] ?? null,
            'primary_color' => $validated['primary_color'] ?? null,
            'secondary_color' => $validated['secondary_color'] ?? null,
            'is_hero' => $request->boolean('is_hero'),
            'event_type' => $validated['event_type'],
        ]);

        // Create sessions if provided
        if ($request->has('sessions') && is_array($request->sessions)) {
            foreach ($request->sessions as $sessionData) {
                $event->sessions()->create([
                    'name' => $sessionData['name'],
                    'description' => $sessionData['description'] ?? null,
                    'speaker' => $sessionData['speaker'] ?? null,
                    'start_time' => $sessionData['start_time'],
                    'end_time' => $sessionData['end_time'],
                    'capacity' => $sessionData['capacity'] ?? null,
                    'is_full_day' => $sessionData['is_full_day'] ?? false,
                ]);
            }
        }

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Admin/Events/Show', [
            'event' => $event
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organizer' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string|max:255',
            'ticket_price' => 'required|numeric',
            'event_type' => 'required|in:regular,concert',
            'photo' => 'nullable|image|max:2048',
            'logo' => 'nullable|image|max:2048',
            'primary_color' => 'nullable|string|max:7',
            'secondary_color' => 'nullable|string|max:7',
            'is_hero' => 'boolean',
            'sessions' => 'nullable|array',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($event->photo_url) {
                $oldPath = str_replace('/storage/', '', $event->photo_url);
                Storage::disk('public')->delete($oldPath);
            }
            $photoPath = $request->file('photo')->store('events/photos', 'public');
            $validated['photo_url'] = '/storage/' . $photoPath;
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($event->logo_url) {
                $oldPath = str_replace('/storage/', '', $event->logo_url);
                Storage::disk('public')->delete($oldPath);
            }
            $logoPath = $request->file('logo')->store('events/logos', 'public');
            $validated['logo_url'] = '/storage/' . $logoPath;
        }

        // If this event is set as hero, remove hero status from all other events
        if ($request->boolean('is_hero') && !$event->is_hero) {
            Event::where('is_hero', true)->update(['is_hero' => false]);
        }

        $event->update([
            'title' => $validated['title'],
            'organizer' => $validated['organizer'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'location' => $validated['location'],
            'ticket_price' => $validated['ticket_price'],
            'photo_url' => $validated['photo_url'] ?? $event->photo_url,
            'logo_url' => $validated['logo_url'] ?? $event->logo_url,
            'primary_color' => $validated['primary_color'] ?? $event->primary_color,
            'secondary_color' => $validated['secondary_color'] ?? $event->secondary_color,
            'is_hero' => $request->boolean('is_hero'),
            'event_type' => $validated['event_type'],
        ]);

        // Update sessions if provided
        if ($request->has('sessions') && is_array($request->sessions)) {
            // Get existing session IDs
            $existingSessionIds = $event->sessions->pluck('id')->toArray();
            $newSessionIds = [];
            
            foreach ($request->sessions as $sessionData) {
                if (isset($sessionData['id']) && !is_null($sessionData['id']) && is_numeric($sessionData['id'])) {
                    // Update existing session
                    $session = $event->sessions()->find($sessionData['id']);
                    if ($session) {
                        $session->update([
                            'name' => $sessionData['name'],
                            'description' => $sessionData['description'] ?? null,
                            'speaker' => $sessionData['speaker'] ?? null,
                            'start_time' => $sessionData['start_time'],
                            'end_time' => $sessionData['end_time'],
                            'capacity' => $sessionData['capacity'] ?? null,
                            'is_full_day' => $sessionData['is_full_day'] ?? false,
                        ]);
                        $newSessionIds[] = $session->id;
                    }
                } else {
                    // Create new session
                    $session = $event->sessions()->create([
                        'name' => $sessionData['name'],
                        'description' => $sessionData['description'] ?? null,
                        'speaker' => $sessionData['speaker'] ?? null,
                        'start_time' => $sessionData['start_time'],
                        'end_time' => $sessionData['end_time'],
                        'capacity' => $sessionData['capacity'] ?? null,
                        'is_full_day' => $sessionData['is_full_day'] ?? false,
                    ]);
                    $newSessionIds[] = $session->id;
                }
            }
            
            // Delete sessions that are no longer in the request
            $sessionsToDelete = array_diff($existingSessionIds, $newSessionIds);
            if (!empty($sessionsToDelete)) {
                $event->sessions()->whereIn('id', $sessionsToDelete)->delete();
            }
        }

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Delete photo if exists
        if ($event->photo_url) {
            $photoPath = str_replace('/storage/', '', $event->photo_url);
            Storage::disk('public')->delete($photoPath);
        }

        // Delete logo if exists
        if ($event->logo_url) {
            $logoPath = str_replace('/storage/', '', $event->logo_url);
            Storage::disk('public')->delete($logoPath);
        }

        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully.');
    }
}
