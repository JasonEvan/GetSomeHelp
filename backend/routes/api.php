<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Unauthenticated access to API',
    ], 401);
})->name('login');

Route::get('/catalog', [ServiceController::class, 'get_catalog']);
Route::get('/service-type', [ServiceController::class, 'get_service_types']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/status', function () {
        return response()->json(['status' => 'API is running']);
    });
});