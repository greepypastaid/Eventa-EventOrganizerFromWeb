<?php

namespace App\GraphQL\Mutations;

use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;

class EventMutation{
    public function createEvent($root, array $args){
        // uncomment the following lines if you want to restrict event creation to authenticated users
        /* // Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('You must be logged in to create an event.');
        
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
        throw new \Exception('Unauthorized: Only admins can create events.');
        }} */
        $event = Event::create([
            'title' => $args['title'],
            'description' => $args['description'],
            'date' => $args['date'],
            'location' => $args['location'],
        ]);

        return $event;
    }
    public function updateEvent($root, array $args){
        $event = Event::findOrFail($args['id']);
        $event->update([
            'title' => $args['title'],
            'description' => $args['description'],
            'date' => $args['date'],
            'location' => $args['location'],
        ]);

        return $event;
    }
    public function deleteEvent($root, array $args){
        // uncomment the following lines if you want to restrict event deletion to authenticated users
        /*// Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('You must be logged in to delete an event.');
        }
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            throw new \Exception('Unauthorized: Only admins can delete events.');
        }*/
        $event = Event::findOrFail($args['id']);
        $event->delete();

        return [
            'success' => true,
            'message' => 'Event deleted successfully',
        ];
    }
}