<?php

namespace App\Http\Controllers;

use App\Models\User;
use Attribute;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', only:['Logout'])
        ];
    }

    public function Login(Request $request){
        $params = $request->validate([
            'username' => 'string',
            'password' => 'string'
        ]);

        if(!Auth::attempt($params)) return response()->json([
            'status' => 'invalid',
            'message' => 'Username or password incorrect'
        ], 400);

        $user = User::query()->find(Auth::user()->id);
        $user->token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successfully',
            'data' => $user
        ]);
    }

    public function Register(Request $request){
        $params = $request->validate([
            'name' => 'required|string',
            'username' => 'required|unique:users,username|regex:/^[a-z0-9._]+$/',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'date_of_birth' => 'required|date',
            'phone_number' => ['required', 'min:10', function(string $attribute, mixed $value, Closure $fail){
                if($value[0] !== '0') $fail(':attribute is not valid phone number');
            }],
            'profile_picture' => 'required|file|mimes:png, jpeg, jpg'
        ]);

        if($params['profile_picture']){
            $path = Storage::putFile('profile_picture', $params['profile_picture']);
            $params['profile_picture'] = $path;
        }

        $params['password'] = Hash::make($params['password']);
        $params['role'] = 'user';
        
        $user = User::query()->create($params);
        $user->token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Register successfully',
            'data' => $user
        ], 201);
    }

    public function Logout(){
        Auth::user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout successfully'
        ], 204);
    }
}
