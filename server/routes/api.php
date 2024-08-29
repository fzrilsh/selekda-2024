<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::get('/logout', [AuthController::class, 'Logout']);

Route::apiResource('/scores', ScoreController::class);
