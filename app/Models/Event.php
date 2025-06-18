<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'organizer',
    'description',
    'date',
    'time',
    'location',
    'ticket_price',
    'logo_url',
    'photo_url',
    'primary_color',
    'secondary_color',
    'is_hero',
    'event_type',
  ];

  protected $casts = [
    'date' => 'datetime',
    'time' => 'datetime',
    'ticket_price' => 'decimal:2',
    'is_hero' => 'boolean',
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
