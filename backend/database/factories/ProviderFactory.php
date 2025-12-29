<?php

namespace Database\Factories;

use App\Models\ServiceType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Provider>
 */
class ProviderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $providers = User::where('role', 'provider')->get();
        $serviceTypes = ServiceType::all();

        return [
            'user_id' => $providers->random()->id,
            'service_type_id' => $serviceTypes->random()->id,
            'display_name' => fake()->word(),
            'bio' => fake()->paragraph(),
            'city' => fake()->city(),
            'experience_years' => fake()->numberBetween(1, 20),
            'starting_price' => fake()->randomFloat(2, 20000, 1500000),
            'rating' => fake()->randomFloat(1, 1, 5),
            'img_path' => 'https://picsum.photos/720/360'
        ];
    }
}
