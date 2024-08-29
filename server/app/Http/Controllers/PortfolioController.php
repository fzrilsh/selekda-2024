<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum'),
            new Middleware(AdminMiddleware::class, except: ['index'])
        ];
    }

    public function index(){
        return response()->json([
            'status' => 'success',
            'message' => 'Success get all portfolio',
            'data' => Portfolio::all()
        ]);
    }

    public function store(Request $request){
        $params = $request->validate([
            'title' => 'required|string',
            'image' => 'required|file|mimes:jpeg,jpg,png',
            'description' => 'required|string'
        ]);

        if($params['image']){
            $path = Storage::putFile('portfolio_image', $params['image']);
            $params['image'] = $path;
        }

        $user = User::query()->find(Auth::user()->id);
        $porto = $user->Portfolios()->create($params);

        return response()->json([
            'status' => 'success',
            'message' => 'Success store portfolio',
            'data' => $porto
        ], 201);
    }

    public function update(Request $request, string $id){
        if(!($portfolio = Portfolio::query()->find($id))) return response()->json([
            'status' => 'not-found',
            'message' => 'Portfolio not found'
        ], 400);

        $params = $request->validate([
            'title' => 'string',
            'image' => 'file|mimes:jpeg,jpg,png',
            'description' => 'string'
        ]);

        if(isset($params['image'])){
            $path = Storage::putFile('portfolio_image', $params['image']);
            $params['image'] = $path;
        }

        $portfolio->update($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success update portfolio',
            'data' => $portfolio
        ], 201);
    }

    public function destroy(string $id){
        if(!($portfolio = Portfolio::query()->find($id))) return response()->json([
            'status' => 'not-found',
            'message' => 'Portfolio not found'
        ], 400);

        $portfolio->delete();
        return response(status: 204);
    }
}
