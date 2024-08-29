<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Blog;
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
            new Middleware(AdminMiddleware::class, except:['index'])
        ];
    }

    public function index(){
        return response()->json([
            'status' => 'success',
            'message' => 'Success get all blog',
            'data' => Blog::all()->append(['tags', 'comments'])
        ]);
    }

    public function store(Request $request){
        $params = $request->validate([
            'image' => 'required|file|mimes:jpeg,jpg,png',
            'title' => 'required|string',
            'description' => 'required|string',
            'tags' => 'required|string'
        ]);

        if($params['image']){
            $path = Storage::putFile('blog_image', $params['image']);
            $params['image'] = $path;
        }

        $blog = Auth::user()->Blogs()->create([
            'image' => $params['image'],
            'title' => $params['title'],
            'description' => $params['description']
        ]);
        foreach(explode(',', $params['tags']) as $tag){
            $blog->Tags()->create(['name' => $tag]);
        }


        return response()->json([
            'status' => 'success',
            'message' => 'Success create blog',
            'data' => $blog
        ], 201);
    }

    public function update(Request $request, string $id){
        if(!($blog = Blog::query()->find($id))) return response()->json([
            'status' => 'not-found',
            'message' => 'Blog not found'
        ], 400);
        $params = $request->validate([
            'image' => 'file|mimes:jpeg,jpg,png',
            'title' => 'string',
            'description' => 'string',
            'tags' => 'string'
        ]);

        if(isset($params['image'])){
            Storage::delete($blog->image);
            $path = Storage::putFile('blog_image', $params['image']);
            $params['image'] = $path;
        }

        if(isset($params['tags'])){
            $blog->Tags()->delete();
            foreach(explode(',', $params['tags']) as $tag){
                $blog->Tags()->create(['name' => $tag]);
            }
            unset($params['tags']);
        }

        $blog->update($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success update blog',
            'data' => $blog
        ]);
    }

    public function destroy(string $id){
        if(!($blog = Blog::query()->find($id))) return response()->json([
            'status' => 'not-found',
            'message' => 'Blog not found'
        ], 400);

        Storage::delete($blog->image);
        $blog->delete();
        return response(status: 204);
    }
}
