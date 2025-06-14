<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('HomePage');
    }

    public function about()
    {
        return Inertia::render('AboutPage');
    }

    public function events()
    {
        return Inertia::render('EventsPage');
    }

    public function concerts()
    {
        return Inertia::render('ConcertsPage');
    }

    public function eventDetail($id)
    {
        // In a real application, you would fetch the event from the database
        // For now, we'll just pass the ID to the front-end
        return Inertia::render('EventDetailPage', [
            'eventId' => $id
        ]);
    }
}
