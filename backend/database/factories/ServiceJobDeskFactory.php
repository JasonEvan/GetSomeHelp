<?php

namespace Database\Factories;

use App\Models\ServiceType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceJobDesk>
 */
class ServiceJobDeskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $serviceTypes = ServiceType::all();
        return [
            'service_type_id' => $serviceTypes->random()->id,
            'job_desk' => fake()->sentence(),
        ];
    }
}
