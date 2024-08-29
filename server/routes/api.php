<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CaptchaController;
use App\Http\Controllers\ScoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::get('/logout', [AuthController::class, 'Logout']);

Route::apiResource('/blog', BlogController::class);
Route::get('/blog/{blog_id}/comment', [BlogCommentController::class, 'index']);
Route::post('/blog/{blog_id}/comment', [BlogCommentController::class, 'store']);
Route::put('/blog/{blog_id}/comment/{comment_id}', [BlogCommentController::class, 'update']);
Route::delete('/blog/{blog_id}/comment/{comment_id}', [BlogCommentController::class, 'destroy']);

Route::apiResource('/scores', ScoreController::class);
Route::apiResource('/captcha', CaptchaController::class);