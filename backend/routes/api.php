<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Unauthenticated access to API',
    ], 401);
})->name('login');

Route::get('/catalog', [ServiceController::class, 'get_catalog']);
Route::get('/service-type', [ServiceController::class, 'get_service_types']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/catalog/{provider}', [ServiceController::class, 'get_catalog_detail']);

    Route::put('/user/{user}', [UserController::class, 'update_profile']);
    Route::get('/user/{id}/history', [BookingController::class, 'get_history']);
});