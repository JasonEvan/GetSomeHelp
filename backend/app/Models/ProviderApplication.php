<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProviderApplication extends Model
{
    /** @use HasFactory<\Database\Factories\ProviderApplicationFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'availability' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }
}
