<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventSessionController extends Controller
{
  /**
   * Store a newly created session in storage.
   */
  public function store(Request $request, Event $event)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'speaker' => 'nullable|string|max:255',
      'start_time' => 'required|date',
      'end_time' => 'required|date|after:start_time',
      'capacity' => 'nullable|integer|min:1',
      'is_full_day' => 'boolean',
    ]);

    $event->sessions()->create($validated);

    return Redirect::back()->with('success', 'Session added successfully.');
  }

  /**
   * Update the specified session in storage.
   */
  public function update(Request $request, Event $event, EventSession $session)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'speaker' => 'nullable|string|max:255',
      'start_time' => 'required|date',
      'end_time' => 'required|date|after:start_time',
      'capacity' => 'nullable|integer|min:1',
      'is_full_day' => 'boolean',
    ]);

    $session->update($validated);

    return Redirect::back()->with('success', 'Session updated successfully.');
  }

  /**
   * Remove the specified session from storage.
   */
  public function destroy(Event $event, EventSession $session)
  {
    $session->delete();

    return Redirect::back()->with('success', 'Session deleted successfully.');
  }

  /**
   * Get all sessions for an event.
   */
  public function getSessions(Event $event)
  {
    $sessions = $event->sessions()->orderBy('start_time')->get();

    return response()->json([
      'sessions' => $sessions,
    ]);
  }
}
