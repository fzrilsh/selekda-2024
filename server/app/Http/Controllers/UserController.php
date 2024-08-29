<?php

namespace App\Http\Controllers;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    public function show(string $id){
        if(!($user = User::query()->find($id))) return response()->json(['status' => 'not-found', 'message' => 'User not found'], 400);
        return response()->json([
            'status' => 'success',
            'message' => 'Success get user data',
            'data' => $user
        ]);
    }

    public function update(Request $request, string $id){
        if(Auth::user()->id !== $id) return response()->json(['status' => 'forbidden', 'message' => 'Forbidden Access'], 403);

        $params = $request->validate([
            'name' => 'string',
            'username' => ['regex:/^[a-z0-9._]+$/', function(string $attribute, mixed $value, Closure $fail){
                if(Auth::user()->username !== $value && User::query()->where('username', $value)->first()) $fail(':attribute has already exists');
            }],
            'email' => 'email',
            'password' => 'min:6',
            'date_of_birth' => 'date',
            'phone_number' => ['required', 'min:10', function(string $attribute, mixed $value, Closure $fail){
                if($value[0] !== '0') $fail(':attribute is not valid phone number');
            }],
            'profile_picture' => 'file|mimes:png, jpeg, jpg'
        ]);

        if($params['profile_picture']){
            $path = Storage::putFile('profile_picture', $params['profile_picture']);
            $params['profile_picture'] = $path;
        }

        if($params['password']) $params['password'] = Hash::make($params['password']);

        $user = User::query()->find($id);
        $user->update($params);
        $user->currentAccessToken()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Update user success, logged out'
        ]);
    }
}
