<?php

namespace Database\Seeders;

use App\Models\Provider;
use App\Models\ServiceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProviderServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serviceTypeIds = ServiceType::pluck('id');
        Provider::all()->each(function ($provider) use ($serviceTypeIds) {
            $provider->serviceTypes()->sync(
                $serviceTypeIds->random(rand(1, 3))->toArray()
            );
        });
    }
}
