<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProviderController extends Controller
{
    public function get_provider_profile(Request $request)
    {
        $provider = $request->user()->provider;
        if (!$provider) {
            return response()->json([
                'data' => null,
            ], 404);
        }

        $providerApplication = $request->user()->providerApplication;

        return response()->json([
            'data' => [
                'bio' => $provider->bio,
                'starting_price' => $provider->starting_price,
                'provider_application' => [
                    'availability_days' => $providerApplication->availability,
                    'start_time' => $providerApplication->start_time,
                    'end_time' => $providerApplication->end_time,
                ],
            ],
        ]);
    }

    public function update_provider_profile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'bio' => 'required|string',
            'starting_price' => 'required|numeric|min:0',

            'availability_days' => 'required|array',
            'availability_days.monday' => 'boolean',
            'availability_days.tuesday' => 'boolean',
            'availability_days.wednesday' => 'boolean',
            'availability_days.thursday' => 'boolean',
            'availability_days.friday' => 'boolean',
            'availability_days.saturday' => 'boolean',
            'availability_days.sunday' => 'boolean',
            
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
        ]);

        $user = $request->user();
        $provider = $user->provider;
        $providerApplication = $user->providerApplication;

        // Update user info
        $user->update([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
        ]);

        // Update provider info
        $provider->update([
            'bio' => $request->input('bio'),
            'starting_price' => $request->input('starting_price'),
        ]);

        // Update provider application info
        $providerApplication->availability = $request->input('availability_days');
        if ($request->has('start_time')) {
            $providerApplication->start_time = $request->input('start_time');
        }
        if ($request->has('end_time')) {
            $providerApplication->end_time = $request->input('end_time');
        }
        $providerApplication->save();

        return response()->json([
            'message' => 'Provider profile updated successfully.',
        ]);
    }
}
