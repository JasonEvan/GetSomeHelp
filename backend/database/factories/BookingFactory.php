<?php

namespace Database\Factories;

use App\Models\Provider;
use App\Models\ServiceType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customers = User::where('role', 'customer')->get();
        $providers = Provider::all();
        $serviceTypes = ServiceType::all();

        return [
            'customer_id' => $customers->random()->id,
            'provider_id' => $providers->random()->id,
            'service_type_id' => $serviceTypes->random()->id,
            'date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'status' => 'pending',
            'notes' => fake()->paragraph(),
        ];
    }
}
