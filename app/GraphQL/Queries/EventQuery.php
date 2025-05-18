<?php

namespace App\GraphQL\Queries;

use App\Models\Event;

class EventQuery{
    public function events($root,array $args){
        $perPage = $args['perPage'] ?? 10;
        return Event::paginate($perPage);
    }

    public function event($root, array $args){
        return Event::findOrFail($args['id']);
    }
    public function eventByTitle($root, array $args){
        return Event::where('title', 'like', '%'.$args['title'].'%')->get();
    }
}