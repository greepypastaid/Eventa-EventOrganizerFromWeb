<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use App\Models\Ticket;
use App\Models\EventSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RegistrationController extends Controller
{
  /**
   * Register a user for an event
   */
  public function register(Request $request, $eventId)
  {
    // Check if user is admin and block registration
    if (Auth::user()->role === 'admin') {
      return response()->json(
        [
          'message' => 'Admins are not allowed to register for events.',
        ],
        403
      );
    }

    // Validate the request
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255',
      'phone' => 'required|string|max:20',
      'organization' => 'nullable|string|max:255',
      'dietaryRestrictions' => 'nullable|string|max:255',
      'specialRequests' => 'nullable|string|max:1000',
      'session_ids' => 'nullable|array',
      'session_ids.*' => 'exists:event_sessions,id',
    ]);

    // Get the event
    $event = Event::findOrFail($eventId);

    // Check if user is already registered for this event
    $existingRegistration = Registration::where('user_id', Auth::id())
      ->where('event_id', $eventId)
      ->first();

    if ($existingRegistration) {
      return response()->json(
        [
          'message' => 'You are already registered for this event',
          'registration' => $existingRegistration,
        ],
        200
      );
    }

    // Create the registration without a ticket
    $registration = Registration::create([
      'registration_code' => 'EVT-' . strtoupper(Str::random(8)),
      'event_id' => $eventId,
      'user_id' => Auth::id(),
      'verified' => false,
      'custom_fields' => [
        'name' => $validated['name'],
        'email' => $validated['email'],
        'phone' => $validated['phone'],
        'organization' => $validated['organization'] ?? null,
        'dietaryRestrictions' => $validated['dietaryRestrictions'] ?? null,
        'specialRequests' => $validated['specialRequests'] ?? null,
      ],
    ]);

    // Attach sessions if provided
    if (!empty($validated['session_ids'])) {
      foreach ($validated['session_ids'] as $sessionId) {
        $registration->registrationSessions()->create([
          'event_session_id' => $sessionId,
          'attended' => false,
        ]);
      }
    } else {
      // If no specific sessions are selected, register for all sessions
      $allSessions = $event->sessions()->get();
      foreach ($allSessions as $session) {
        $registration->registrationSessions()->create([
          'event_session_id' => $session->id,
          'attended' => false,
        ]);
      }
    }

    return response()->json([
      'message' => 'Registration successful!',
      'registration' => $registration,
    ]);
  }

  /**
   * Get all registrations for the authenticated user
   */
  public function getUserRegistrations()
  {
    $registrations = Registration::with('event')
      ->where('user_id', Auth::id())
      ->orderBy('created_at', 'desc')
      ->get();

    return response()->json([
      'registrations' => $registrations,
    ]);
  }

  /**
   * Get a specific registration for the authenticated user
   */
  public function getUserRegistration($id)
  {
    $registration = Registration::with('event')
      ->where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    return response()->json([
      'registration' => $registration,
    ]);
  }

  /**
   * Verify a registration
   */
  public function verifyRegistration(Request $request, $registrationId)
  {
    $registration = Registration::findOrFail($registrationId);

    // Check if already verified
    if ($registration->verified) {
      return response()->json(
        [
          'message' => 'Registration is already verified',
        ],
        400
      );
    }

    // Update registration status
    $registration->update([
      'verified' => true,
      'registration_code' =>
        'VERIFIED-' .
        Str::upper(Str::random(8)) .
        '-' .
        $registration->event_id,
    ]);

    // TODO: Send email notification to user about verification

    return response()->json([
      'message' => 'Registration verified successfully',
      'registration' => $registration->load('event'),
    ]);
  }

  /**
   * Send ticket to a registration
   */
  public function sendTicket(Request $request, $registrationId)
  {
    $registration = Registration::findOrFail($registrationId);

    // Check if ticket already exists
    if ($registration->ticket_id) {
      return response()->json(
        [
          'message' => 'Ticket already sent for this registration',
        ],
        400
      );
    }

    // Ensure registration is verified before sending ticket
    if (!$registration->verified) {
      return response()->json(
        [
          'message' => 'Registration must be verified before sending ticket',
        ],
        400
      );
    }

    // Create a ticket
    $ticket = Ticket::create([
      'qrCode' =>
        'EVT-' . Str::upper(Str::random(8)) . '-' . $registration->event_id,
      'sentAt' => now(),
    ]);

    // Update registration with ticket
    $registration->update([
      'ticket_id' => $ticket->id,
      'registration_code' => $ticket->qrCode,
    ]);

    // TODO: Send email notification to user

    return response()->json([
      'message' => 'Ticket sent successfully',
      'registration' => $registration->load('event', 'ticket'),
    ]);
  }

  /**
   * View a ticket
   */
  public function viewTicket($ticketId)
  {
    $ticket = Ticket::with([
      'registration.event',
      'registration.user',
    ])->findOrFail($ticketId);

    // Only allow the ticket owner to view their ticket
    if ($ticket->registration->user_id !== Auth::id()) {
      abort(403, 'Unauthorized action.');
    }

    return Inertia::render('Tickets/View', [
      'ticket' => $ticket,
      'auth' => [
        'user' => Auth::user(),
      ],
    ]);
  }
}
