<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum'),
            new Middleware(AdminMiddleware::class)
        ];
    }

    public function store(Request $request){
        $params = $request->validate([
            'image' => 'required|file|mimes:jpeg,jpg,png',
            'title' => 'required|string',
            'description' => 'required|string',
            'tags' => 'required|array'
        ]);

        if($params['image']){
            $path = Storage::putFile('blog_image', $params['image']);
            $params['image'] = $path;
        }

        $blog = Auth::user()->Blogs()->create($params);
        foreach($params['tags'] as $tag){
            $blog->Tags()->create(['name' => $tag]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Success create blog',
            'data' => $blog
        ], 201);
    }
}
