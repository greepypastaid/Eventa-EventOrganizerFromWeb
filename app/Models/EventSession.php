<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Attendance; // Tambahkan baris ini jika belum ada

class EventSession extends Model
{
    protected $fillable = [
        'title',
        'speaker',
        'startTime',
        'endTime',
        'event_id',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
