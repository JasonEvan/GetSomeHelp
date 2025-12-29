<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use App\Models\ServiceType;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function get_service_types()
    {
        $serviceTypes = ServiceType::with('serviceJobDesks')->get();
        return response()->json([
            'data' => $serviceTypes,
        ]);
    }

    public function get_catalog(Request $request)
    {
        // Query Parameters
        $price = $request->query('price');
        $types = $request->query('types');

        // Preprocessing
        [$minPrice, $maxPrice] = $price
            ? array_map('intval', explode(',', $price))
            : [null, null];

        $typeIds = $types
            ? array_map('intval', explode(',', $types))
            : [];

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
            ->when($minPrice !== null, function ($q) use ($minPrice, $maxPrice) {
                $q->where('starting_price', '>=', $minPrice);

                if ($maxPrice !== -1 && $maxPrice !== null) {
                    $q->where('starting_price', '<=', $maxPrice);
                }
            })
            ->when(!empty($typeIds), function ($q) use ($typeIds) {
                $q->whereIn('service_type_id', $typeIds);
            })
            ->get();

        return response()->json([
            'data' => $data,
        ]);
    }
}
