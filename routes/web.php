<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController as PublicEventController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public page routes
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/events', [PageController::class, 'events'])->name('events');
Route::get('/concerts', [PageController::class, 'concerts'])->name('concerts');
Route::get('/events/{id}', [PageController::class, 'eventDetail'])->name('events.detail');

// Dashboard route for all authenticated users
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    
    // Registration management
    Route::get('/registrations', [AdminController::class, 'registrations'])->name('registrations');
    
    // QR Check-in
    Route::get('/check-in', [AdminController::class, 'checkIn'])->name('check-in');
    Route::post('/admin/check-in/verify', [AdminController::class, 'verifyTicket'])->name('admin.check-in.verify');
    
    // Analytics
    Route::get('/analytics', [AdminController::class, 'analytics'])->name('analytics');
    Route::get('/analytics/{id}', [AdminController::class, 'getEventAnalytics'])->name('analytics.event');
    
    // Event-specific registrations
    Route::get('/events/{id}/registrations', [AdminController::class, 'eventRegistrations'])->name('events.registrations');
    
    // Admin Event CRUD
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('events', EventController::class);
    });
});

// Profile routes (accessible by all authenticated users)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Event registration routes
    Route::post('/events/{id}/register', [RegistrationController::class, 'register'])->name('events.register');
    Route::get('/user/registrations', [RegistrationController::class, 'getUserRegistrations'])->name('user.registrations');
    Route::get('/user/registrations/{id}', [RegistrationController::class, 'getUserRegistration'])->name('user.registrations.show');
});

Route::middleware(['auth'])->group(function () {
    // Registration routes
    Route::post('/api/registrations/{registration}/send-ticket', [RegistrationController::class, 'sendTicket'])
        ->name('registrations.send-ticket')
        ->middleware('admin');
});

require __DIR__.'/auth.php'; 