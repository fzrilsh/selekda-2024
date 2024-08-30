<?php

namespace App\Http\Controllers;

use App\Models\Captcha;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class CaptchaController extends Controller
{
    public function index(){
        $first = rand(10, 29);
        $second = rand(10, 29);
        $content = Hash::make($first + $second);

        $captcha = Captcha::query()->create(['content' => $content]);
        $captcha->question = "$first+$second";
        return response()->json([
            'status' => 'success',
            'message' => 'Make captcha successfully',
            'data' => $captcha->only(['id', 'question'])
        ], 201);
    }

    public function update(Request $request, string $id){
        if(!($captcha = Captcha::query()->find($id))) return response()->json([
            'status' => 'failed',
            'message' => 'Captcha invalid',
        ], 400);

        if(!$this->check($captcha, $request->answer)) return response()->json([
            'status' => 'failed',
            'message' => 'Captcha invalid',
        ], 400);

        return response()->json([
            'status' => 'success',
            'message' => 'Captcha validated.'
        ]);
    }

    public static function check(Captcha $captcha, $answer){
        $check = Hash::check($answer, $captcha->content);
        $captcha->delete();

        return $check;
    }
}
