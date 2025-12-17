<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bookings = Booking::all();
        return [
            'booking_id' => $bookings->random()->id,
            'amount' => fake()->randomFloat(2, 10, 1000),
            'discount' => fake()->randomFloat(2, 0, 100),
            'final_amount' => function (array $attributes) {
                return $attributes['amount'] - $attributes['discount'];
            },
        ];
    }
}
