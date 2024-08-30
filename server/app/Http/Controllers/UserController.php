<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
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
            new Middleware('auth:sanctum'),
            new Middleware(AdminMiddleware::class, only:['index'])
        ];
    }

    public function index(){
        return response()->json([
            'status' => 'success',
            'message' => 'Success get all user',
            'data' => User::all()
        ]);
    }

    public function show(string $id){
        if(!($user = User::query()->find($id))) return response()->json(['status' => 'not-found', 'message' => 'User not found'], 404);
        return response()->json([
            'status' => 'success',
            'message' => 'Success get user data',
            'data' => $user->append(['leaderboard'])
        ]);
    }

    public function update(Request $request, string $id){
        $user = User::query()->find($id);
        if(!$user) return response()->json([
            'status' => 'not-found',
            'message' => 'User not found'
        ], 404);
        if(Auth::user()->id !== $user->id && Auth::user()->role !== 'admin') return response()->json(['status' => 'forbidden', 'message' => 'Forbidden Access'], 403);

        $params = $request->validate([
            'name' => 'string',
            'username' => ['regex:/^[a-z0-9._]+$/', function(string $attribute, mixed $value, Closure $fail){
                if(Auth::user()->username !== $value && User::query()->where('username', $value)->first()) $fail('The :attribute has already been taken.');
            }],
            'email' => ['email', function(string $attribute, mixed $value, Closure $fail){
                if(Auth::user()->email !== $value && User::query()->where('email', $value)->first()) $fail('The :attribute has already been taken.');
            }],
            'password' => 'min:6',
            'date_of_birth' => 'date',
            'phone_number' => ['min:10', function(string $attribute, mixed $value, Closure $fail){
                if(!$value || $value[0] !== '0') $fail('The :attribute is not valid phone number');
            }],
            'profile_picture' => 'file|mimes:png, jpeg, jpg'
        ]);

        if(isset($params['profile_picture'])){
            $path = Storage::putFile('profile_picture', $params['profile_picture']);
            $params['profile_picture'] = $path;
        }

        if(isset($params['password'])) $params['password'] = Hash::make($params['password']);

        $user->update($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Update user success'
        ]);
    }
}
