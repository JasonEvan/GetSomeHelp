<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->enum('payment_method',['transfer','ewallet','cash'])->default('cash');
            $table->decimal('amount',10,2);
            $table->decimal('discount',10,2);
            $table->decimal('final_amount',10,2);
            $table->enum('payment_status',['pending','paid','failed'])->default('pending');
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
