<?php

namespace App\GraphQL\Mutations;

use App\Models\Event;
use App\Models\Registration;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Auth\Access\AuthorizationException;

class RegistrationMutation
{
    public function registerToEvent($root, array $args)
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('Anda harus login untuk mendaftar ke acara.');
        }

        $user = Auth::user();
        $event = Event::findOrFail($args['input']['eventId']);
        
        // Check if user is already registered for this event
        $existingRegistration = Registration::where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->first();
            
        if ($existingRegistration) {
            throw new \Exception('Anda sudah terdaftar untuk acara ini.');
        }
        
        // Create a ticket with QR code
        $ticket = Ticket::create([
            'qrCode' => Str::uuid(),
            'sentAt' => now(),
        ]);
        
        // Create registration
        $registration = Registration::create([
            'event_id' => $event->id,
            'user_id' => $user->id,
            'ticket_id' => $ticket->id,
            'verified' => false,
            'custom_fields' => $args['input']['customFields'] ?? null,
        ]);
        
        return $registration;
    }
}