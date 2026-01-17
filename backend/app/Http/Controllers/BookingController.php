<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Provider;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Get booking history for a specific user.
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Get service history for a specific service provider.
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function get_serviced_history(int $userId)
    {
        $providerId = Provider::where('user_id', $userId)->first()->id;
        $bookings = Booking::query()
            ->where('provider_id', $providerId)
            ->where('status', 'confirmed')
            ->orWhere('status', 'completed')
            ->select([
                'id',
                'date',
                'total_price',
                'customer_id',
                'service_type_id',
            ])
            ->with([
                'user:id,name',
                'service_type:id,name'
            ])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'data' => $bookings
        ]);
    }

    public function get_service_pending(int $userId)
    {
        $providerId = Provider::where('user_id', $userId)->first()->id;
        $bookings = Booking::query()
            ->where('provider_id', $providerId)
            ->where('status', 'pending')
            ->select([
                'id',
                'date',
                'total_price',
                'customer_id',
                'service_type_id',
            ])
            ->with([
                'user:id,name',
                'service_type:id,name'
            ])
            ->orderBy('date')
            ->get();

        return response()->json([
            'data' => $bookings
        ]);
    }

    public function update_status_booking(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:confirmed,canceled,completed'
        ]);

        // Authorization
        // Hanya provider pemilik booking yang boleh mengubah status
        if ($booking->provider_id !== $request->user()->provider->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        if ($booking->status !== 'pending') {
            return response()->json([
                'message' => 'Booking status cannot be changed'
            ], 400);
        }

        $booking->status = $validated['status'];
        $booking->save();

        return response()->json([
            'message' => 'Booking status updated successfully',
            'data' => $booking
        ]);
    }

    public function create_booking(Request $request)
    {
        $validated = $request->validate([
            'provider_id' => 'required|exists:providers,id',
            'date' => 'required|date|after_or_equal:today',
            'total_price' => 'required|numeric|min:0',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $booking = Booking::create([
            'customer_id' => $request->user()->id,
            'provider_id' => $validated['provider_id'],
            'service_type_id' => Provider::find($validated['provider_id'])->service_type_id,
            'date' => $validated['date'],
            'total_price' => $validated['total_price'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking
        ], 201);
    }
}
