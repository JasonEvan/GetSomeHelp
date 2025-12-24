<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function get_catalog(Request $request)
    {
        $data = Provider::query()
            ->select([
                'id', // id wajib untuk mapping relasi
                'service_type_id',
                'display_name', 
                'city',
                'starting_price',
                'rating',
                'experience_years',
            ])
            ->where('is_active', true)
            // id selalu diselect untuk keperluan relasi
            ->with(['serviceType:id,name,image'])
            ->get();

        return response()->json([
            'data' => $data
        ]);
    }
}
