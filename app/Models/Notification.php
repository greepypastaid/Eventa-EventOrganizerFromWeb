<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
  protected $fillable = ['title', 'message', 'user_id', 'sent_at'];

  protected $casts = [
    'sent_at' => 'datetime',
  ];

  public function recipient()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
}
