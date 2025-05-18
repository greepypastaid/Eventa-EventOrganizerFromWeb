<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['qrCode', 'sentAt'];

    public function registration()
    {
        return $this->hasOne(Registration::class);
    }
}