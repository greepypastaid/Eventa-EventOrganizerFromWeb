<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = ['registration_code', 'event_id', 'user_id', 'ticket_id', 'verified', 'custom_fields', 'checked_in_at'];

    protected $casts = [
        'verified' => 'boolean',
        'custom_fields' => 'array',
        'checked_in_at' => 'datetime',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function participant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
    
    public function registrationSessions()
    {
        return $this->hasMany(RegistrationSession::class);
    }
    
    public function sessions()
    {
        return $this->belongsToMany(EventSession::class, 'registration_sessions')
            ->withPivot('attended', 'checked_in_at')
            ->withTimestamps();
    }
}