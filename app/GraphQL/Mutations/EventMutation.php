<?php

namespace App\GraphQL\Mutations;

use App\Models\Event;
use illuminate\Support\Facades\auth;

class EventMutation{
    public function createEvent($root, array $args){
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
        $event = Event::findOrFail($args['id']);
        $event->delete();

        return [
            'success' => true,
            'message' => 'Event deleted successfully',
        ];
    }
}