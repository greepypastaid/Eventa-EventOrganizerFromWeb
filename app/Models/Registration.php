<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = ['event_id', 'user_id', 'ticket_id', 'verified', 'custom_fields'];

    protected $casts = [
        'verified' => 'boolean',
        'custom_fields' => 'array',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function participant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}