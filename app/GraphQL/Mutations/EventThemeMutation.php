<?php

namespace App\GraphQL\Mutations;

use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

class EventThemeMutation
{
    public function updateEventTheme($root, array $args)
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('Anda harus login untuk memperbarui tema acara.');
        }
        
        $user = Auth::user();
        
        // Only admin can update event theme
        if ($user->role !== 'admin') {
            throw new \Exception('Tidak diizinkan: Hanya admin yang dapat memperbarui tema acara.');
        }
        
        $event = Event::findOrFail($args['eventId']);
        
        $event->update([
            'logo_url' => $args['input']['logoUrl'] ?? $event->logo_url,
            'primary_color' => $args['input']['primaryColor'] ?? $event->primary_color,
            'secondary_color' => $args['input']['secondaryColor'] ?? $event->secondary_color,
        ]);
        
        return $event;
    }
}