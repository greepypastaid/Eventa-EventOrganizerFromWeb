<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RegistrationSession extends Model
{
  use HasFactory;

  protected $fillable = [
    'registration_id',
    'event_session_id',
    'attended',
    'checked_in_at',
  ];

  protected $casts = [
    'attended' => 'boolean',
    'checked_in_at' => 'datetime',
  ];

  public function registration()
  {
    return $this->belongsTo(Registration::class);
  }

  public function eventSession()
  {
    return $this->belongsTo(EventSession::class);
  }
}
