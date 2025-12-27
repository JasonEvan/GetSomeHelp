<?php

namespace Database\Seeders;

use App\Models\ProviderApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProviderApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProviderApplication::factory(15)->create();
    }
}
