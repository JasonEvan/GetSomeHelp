<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update_profile(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|nullable|string|max:255',
            'phone' => 'sometimes|nullable|string|max:20',
            'address' => 'sometimes|nullable|string|max:500',
            'detail_address' => 'sometimes|nullable|string|max:500',
        ]);

        $user->update($validatedData);

        return response()->json([
            'user' => $user,
        ]);
    }
}
