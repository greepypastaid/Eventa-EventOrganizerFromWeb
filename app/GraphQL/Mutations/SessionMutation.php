<?php

namespace App\GraphQL\Mutations;

use App\Models\EventSession;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

class SessionMutation
{
    public function createSession($root, array $args)
    {
        
        // Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('Anda harus login untuk membuat sesi.');
        }
        
        // Get the event
        $event = Event::findOrFail($args['eventId']);
        
        // uncomment the following lines if you want to restrict session creation to event organizers or admins
        /*
        // Check if the user is the organizer or an admin
        if (Auth::user()->id !== $event->organizer_id && Auth::user()->role !== 'admin') {
            throw new AuthorizationException('Anda tidak memiliki izin untuk membuat sesi pada acara ini.');
        }*/
        
        // Create the session
        $session = EventSession::create([
            'title' => $args['title'],
            'speaker' => $args['speaker'] ?? null,
            'startTime' => $args['startTime'],
            'endTime' => $args['endTime'],
            'event_id' => $args['eventId'],
        ]);
        
        return $session;
    }
}