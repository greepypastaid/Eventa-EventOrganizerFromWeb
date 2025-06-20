<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
  protected $fillable = ['user_id', 'event_session_id', 'checked_in_at'];

  protected $casts = [
    'checked_in_at' => 'datetime',
  ];

  // Tambahkan accessor untuk checkedInAt
  public function getCheckedInAtAttribute($value)
  {
    // Jika nilai null, kembalikan waktu saat ini
    return $value ?: now();
  }

  public function participant()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function session()
  {
    return $this->belongsTo(EventSession::class, 'event_session_id');
  }
}
