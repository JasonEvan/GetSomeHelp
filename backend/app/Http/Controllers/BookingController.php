<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function get_history(int $userId)
    {

        $bookings = Booking::query()
            ->where('customer_id', $userId)
            ->select([
                'id',
                'date',
                'total_price',
                'provider_id',
                'service_type_id',
            ])
            ->with([
                'provider:id,display_name',
                'service_type:id,name'
            ])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'data' => $bookings
        ]);
    }
}
