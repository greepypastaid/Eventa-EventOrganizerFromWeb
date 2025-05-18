<?php

namespace App\GraphQL\Queries;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

class RegistrationQuery
{
    public function registrations($root, array $args)
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('Anda harus login untuk melihat pendaftaran.');
        }
        
        $user = Auth::user();
        $eventId = $args['eventId'];
        
        // If user is admin, return all registrations for the event
        if ($user->role === 'admin') {
            return Registration::where('event_id', $eventId)->get();
        }
        
        // Otherwise, return only the user's registrations for the event
        return Registration::where('event_id', $eventId)
            ->where('user_id', $user->id)
            ->get();
    }
}