<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Attendance;

class EventSession extends Model
{
  use HasFactory;

  protected $fillable = [
    'event_id',
    'name',
    'description',
    'speaker',
    'start_time',
    'end_time',
    'capacity',
    'is_full_day',
  ];

  protected $casts = [
    'start_time' => 'datetime',
    'end_time' => 'datetime',
    'is_full_day' => 'boolean',
  ];

  public function event()
  {
    return $this->belongsTo(Event::class);
  }

  public function attendances()
  {
    return $this->hasMany(Attendance::class);
  }

  public function registrationSessions()
  {
    return $this->hasMany(RegistrationSession::class);
  }

  public function registrations()
  {
    return $this->belongsToMany(Registration::class, 'registration_sessions');
  }
}
