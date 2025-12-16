<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceTypeFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function providers()
    {
        return $this->belongsToMany(Provider::class, 'provider_service_types');
    }

    public function providerApplications()
    {
        return $this->hasMany(ProviderApplication::class);
    }
}
