<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\ServiceType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProviderApplication>
 */
class ProviderApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::where('role', 'provider')->get();
        $serviceType = ServiceType::all();

        return [
            'cv_file' => '',
            'expected_salary' => fake()->numberBetween(30000, 100000),
            'availability' => [
                'monday' => fake()->boolean(),
                'tuesday' => fake()->boolean(),
                'wednesday' => fake()->boolean(),
                'thursday' => fake()->boolean(),
                'friday' => fake()->boolean(),
                'saturday' => fake()->boolean(),
                'sunday' => fake()->boolean(),
            ],
            'status' => 'pending',
            'user_id' => $user->random()->id,
            'service_type_id' => $serviceType->random()->id,
        ];
    }
}
