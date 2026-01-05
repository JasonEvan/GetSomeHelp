<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceJobDesk extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceJobDeskFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }
}
