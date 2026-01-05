<?php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Electrician',
                'description' => 'Eliable electrical installation and repair services for your home or office',
                'image' => '/img/icons/electrician.png',
                'jobDesks' => [
                    'Reliable electrical installation',
                    'Repair services for home or office',
                ],
            ],
            [
                'title' => 'AC Service',
                'description' => 'Professional air conditioner cleaning, repair, and installation at affordable rates',
                'image' => '/img/icons/ac.png',
                'jobDesks' => [
                    'Cleaning air conditioner',
                    'Repair broken air conditioner',
                    'Install air conditioner',
                ],
            ],
            [
                'title' => 'House Cleaner',
                'description' => 'Trusted home cleaning services to keep your space spotless and comfortable',
                'image' => '/img/icons/cleaner.png',
                'jobDesks' => [
                    'Cleaning house furnitures',
                    'Cleaning bathrooms',
                ],
            ],
            [
                'title' => 'Laundry',
                'description' => 'Fast and fresh laundry services with pickup and delivery options available',
                'image' => '/img/icons/laundry.png',
                'jobDesks' => [
                    'Receiving dirty clothes from customers',
                    'Washing, drying, and ironing clothes',
                ],
            ],
            [
                'title' => 'Pest Control',
                'description' => 'Effective pest control solutions to protect your home or business from unwanted guests',
                'image' => '/img/icons/bug.png',
                'jobDesks' => [
                    'Reliable electrical installation',
                    'Repair services for home and office',
                ],
            ],
            [
                'title' => 'Plumbing',
                'description' => 'Expert plumbing services for installations, repairs, and maintenance of your water systems',
                'image' => '/img/icons/pipe.png',
                'jobDesks' => [
                    'Reliable electrical installation',
                    'Repair services for home and office',
                ],
            ],
            [
                'title' => 'Lawn Care',
                'description' => 'Professional lawn care and landscaping services to keep your outdoor spaces beautiful and healthy',
                'image' => '/img/icons/garden.png',
                'jobDesks' => [
                    'Reliable electrical installation',
                    'Repair services for home and office',
                ],
            ],
            [
                'title' => 'Appliance Repair',
                'description' => 'Skilled appliance repair services for all brands and types of household appliances',
                'image' => '/img/icons/hammer.png',
                'jobDesks' => [
                    'Reliable electrical installation',
                    'Repair services for home and office',
                ],
            ],
        ];

        foreach ($services as $service) {
            $s = ServiceType::create([
                'name' => $service['title'],
                'description' => $service['description'],
                'image' => $service['image'],
            ]);

            foreach ($service['jobDesks'] as $jobDesk) {
                $s->serviceJobDesks()->create([
                    'job_desk' => $jobDesk,
                ]);
            }
        }
    }
}
