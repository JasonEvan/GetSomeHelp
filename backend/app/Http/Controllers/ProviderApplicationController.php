<?php

namespace App\Http\Controllers;

use App\Models\ProviderApplication;
use App\Models\ServiceType;
use Illuminate\Http\Request;

class ProviderApplicationController extends Controller
{
    public function submit_application(Request $request)
    {
        $validatedData = $request->validate([
            'service_type' => 'required|string|exists:service_types,name',

            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'expected_salary' => 'required|numeric',
            'availability' => 'required|array',

            'availability.monday' => 'required|boolean',
            'availability.tuesday' => 'required|boolean',
            'availability.wednesday' => 'required|boolean',
            'availability.thursday' => 'required|boolean',
            'availability.friday' => 'required|boolean',
            'availability.saturday' => 'required|boolean',
            'availability.sunday' => 'required|boolean',

            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
        ]);

        $serviceType = ServiceType::whereRaw('LOWER(name) = ?', [strtolower($validatedData['service_type'])])
                                    ->first();

        $filePath = $request->file('resume')->store('resumes');
        
        ProviderApplication::create([
            'cv_file' => $filePath,
            'expected_salary' => $validatedData['expected_salary'],
            'availability' => $validatedData['availability'],
            'start_time' => $validatedData['start_time'] ?? null,
            'end_time' => $validatedData['end_time'] ?? null,
            'status' => 'pending',
            'user_id' => $request->user()->id,
            'service_type_id' => $serviceType->id,
        ]);

        return response()->json([
            'message' => 'Application submitted successfully.',
        ]);
    }
}
