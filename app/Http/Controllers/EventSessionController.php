<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventSession;
use Illuminate\Http\Request;

class EventSessionController extends Controller
{
  /**
   * Get all sessions for an event.
   */
  public function getSessions(Event $event)
  {
    $sessions = $event
      ->sessions()
      ->orderBy('start_time')
      ->get()
      ->map(function ($session) {
        return [
          'id' => $session->id,
          'name' => $session->name,
          'description' => $session->description,
          'speaker' => $session->speaker,
          'start_time' => $session->start_time->format('Y-m-d H:i:s'),
          'end_time' => $session->end_time->format('Y-m-d H:i:s'),
          'capacity' => $session->capacity,
          'is_full_day' => $session->is_full_day,
          'registrations_count' => $session->registrations()->count(),
        ];
      });

    return response()->json([
      'sessions' => $sessions,
    ]);
  }
}
