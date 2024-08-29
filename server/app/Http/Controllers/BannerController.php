<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller implements HasMiddleware
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
            'message' => 'Success get all bannner',
            'data' => Banner::all()
        ]);
    }

    public function store(Request $request){
        $params = $request->validate([
            'title' => 'required|string',
            'image' => 'required|file|mimes:jpeg,jpg,png',
            'description' => 'required|string',
            'status' => 'in:active,inactive',
        ]);

        if(!isset($params['status'])) $params['status'] = 'inactive';
        if($params['image']){
            $path = Storage::putFile('banner_image', $params['image']);
            $params['image'] = $path;
        }

        $banner = Banner::query()->create($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success store bannner',
            'data' => $banner
        ], 201);
    }

    public function update(Request $request, string $id){
        if(!($banner = Banner::query()->find($id))) return response()->json([
            'status' => 'not-found',
            'message' => 'Banner not found'
        ], 400);

        $params = $request->validate([
            'title' => 'string',
            'image' => 'file|mimes:jpeg,jpg,png',
            'description' => 'string',
            'status' => 'in:active,inactive',
        ]);

        if(isset($params['image'])){
            Storage::delete($banner->image);
            $path = Storage::putFile('banner_image', $params['image']);
            $params['image'] = $path;
        }

        $banner->update($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success update banner',
            'data' => $banner
        ]);
    }

    public function destroy(string $id){
        if(!($banner = Banner::query()->find($id))) return response()->json([
            'status' => 'not-found',
            'message' => 'Banner not found'
        ], 400);

        $banner->delete();
        return response(status: 204);
    }
}
