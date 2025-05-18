<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title', 
        'description', 
        'date', 
        'location',
        'logo_url',
        'primary_color',
        'secondary_color'
    ];

    public function sessions()
    {
        return $this->hasMany(EventSession::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
