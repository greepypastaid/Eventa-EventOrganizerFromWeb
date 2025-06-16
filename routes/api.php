<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Event;
use App\Http\Controllers\PageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Search events endpoints (support both URLs untuk backward compatibility)
Route::get('/search-events', [PageController::class, 'searchEvents']);
Route::get('/events/search', [PageController::class, 'searchEvents']);
Route::get('/events/filters', [PageController::class, 'getFilterOptions']);
