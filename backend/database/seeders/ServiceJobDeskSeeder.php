<?php

namespace Database\Seeders;

use App\Models\ServiceJobDesk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceJobDeskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceJobDesk::factory(20)->create();
    }
}
