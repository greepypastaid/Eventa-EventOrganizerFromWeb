<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RegistrationController extends Controller
{
    /**
     * Register a user for an event
     */
    public function register(Request $request, $eventId)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'organization' => 'nullable|string|max:255',
            'dietaryRestrictions' => 'nullable|string|max:255',
            'specialRequests' => 'nullable|string|max:1000',
        ]);
        
        // Get the event
        $event = Event::findOrFail($eventId);
        
        // Check if user is already registered for this event
        $existingRegistration = Registration::where('user_id', Auth::id())
                                         ->where('event_id', $eventId)
                                         ->first();
        
        if ($existingRegistration) {
            return response()->json([
                'message' => 'You are already registered for this event',
                'registration' => $existingRegistration
            ], 200);
        }
        
        // Create a ticket first
        $ticketCode = 'EVT-' . Str::upper(Str::random(8)) . '-' . $eventId;
        
        // Create ticket in the tickets table
        $ticket = \App\Models\Ticket::create([
            'qrCode' => $ticketCode,
            'sentAt' => now()
        ]);
        
        // Create the registration
        $registration = Registration::create([
            'registration_code' => $ticket->qrCode,
            'event_id' => $eventId,
            'user_id' => Auth::id(),
            'ticket_id' => $ticket->id,
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
        
        // Load the event relationship
        $registration->load('event');
        
        return response()->json([
            'message' => 'Registration successful',
            'registration' => $registration
        ], 201);
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
            'registrations' => $registrations
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
            'registration' => $registration
        ]);
    }
} 