<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Models\Event;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

// Test route to check if the API is accessible
Route::get('/test', function() {
    return response()->json(['status' => 'API is working']);
});

Route::get('/events', function(Request $request) {
    $organizer = $request->query('organizer');
    $excludeId = $request->query('exclude_id');
    $limit = $request->query('limit', 3);
    
    Log::info('Events API called', [
        'organizer' => $organizer,
        'exclude_id' => $excludeId,
        'limit' => $limit
    ]);
    
    $eventsQuery = Event::query();
    
    if ($organizer) {
        // Clean the organizer string and make search more robust
        $cleanOrganizer = trim($organizer);
        Log::info('Searching for events with organizer: ' . $cleanOrganizer);
        
        // Use case-insensitive search for better matching
        $eventsQuery->where(function($query) use ($cleanOrganizer) {
            $query->whereRaw('LOWER(organizer) = ?', [strtolower($cleanOrganizer)])
                  ->orWhereRaw('LOWER(organizer) LIKE ?', ['%' . strtolower($cleanOrganizer) . '%']);
        });
        
        // Also log current organizer values in DB for debugging
        $allOrganizers = Event::distinct('organizer')->pluck('organizer')->toArray();
        Log::info('All organizers in database:', $allOrganizers);
    }
    
    if ($excludeId) {
        $eventsQuery->where('id', '!=', $excludeId);
    }
    
    $events = $eventsQuery->orderBy('date', 'asc')
                         ->limit($limit)
                         ->get();
    
    Log::info('Events API found ' . $events->count() . ' results');
    
    return response()->json(['events' => $events]);
});
