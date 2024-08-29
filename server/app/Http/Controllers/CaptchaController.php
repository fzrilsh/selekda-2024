<?php

namespace App\Http\Controllers;

use App\Models\Captcha;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class CaptchaController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    public function index(){
        $first = rand(10, 29);
        $second = rand(10, 29);
        $content = Hash::make("$first + $second");
        if($captcha = Captcha::query()->where('user_id', Auth::user()->id)->first()) $captcha->delete();

        $captcha = Captcha::query()->create(['content' => $content, 'user_id' => Auth::user()->id]);
        return response()->json([
            'status' => 'success',
            'message' => 'Make captcha successfully',
            'data' => $captcha->only(['id', 'content'])
        ], 201);
    }

    public function update(Request $request, string $id){
        if(!($captcha = Captcha::query()->find($id))) return response()->json([
            'status' => 'failed',
            'message' => 'Captcha invalid'
        ], 400);

        if($captcha->content !== $request->answer) return response()->json([
            'status' => 'failed',
            'message' => 'Captcha invalid'
        ], 400);

        return response()->json([
            'status' => 'success',
            'message' => 'Captcha validated.'
        ]);
    }
}
