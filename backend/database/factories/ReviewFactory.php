<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bookings = Booking::all();
        $customers = User::where('role', 'customer')->get();
        $providers = Provider::all();

        return [
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->paragraph(),
            'booking_id' => $bookings->random()->id,
            'customer_id' => $customers->random()->id,
            'provider_id' => $providers->random()->id,
        ];
    }
}
