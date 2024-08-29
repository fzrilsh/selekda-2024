<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Captcha;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class BlogCommentController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    public function index(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 400);
        return response()->json([
            'status' => 'success',
            'message' => 'Success get all comments',
            'data' => $blog->comments()->get()
        ]);
    }

    public function store(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 400);
        $params = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'comment' => 'required|string',
            'captcha' => ['required', function(string $attribute, mixed $value, Closure $fail){
                if(!Captcha::query()->where('content', $value)->where('user_id', Auth::user()->id)->first()) $fail('Captcha is invalid.');
            }]
        ]);

        Captcha::query()->where('content', $params['captcha'])->where('user_id', Auth::user()->id)->first()->delete();
        unset($params['captcha']);

        $blog->comments()->create($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success post comment'
        ], 201);
    }

    public function update(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 400);
        if(!($comment = $blog->comments()->getQuery()->find($request->comment_id))) return response()->json(['status' => 'not-found', 'message' => 'Comment not found'], 400);
        $params = $request->validate([
            'name' => 'string',
            'email' => 'email',
            'subject' => 'string',
            'comment' => 'text',
            'captcha' => ['required', function(string $attribute, mixed $value, Closure $fail){
                if(!Captcha::query()->where('content', $value)->where('user_id', Auth::user()->id)->first()) $fail('Captcha is invalid.');
            }]
        ]);

        Captcha::query()->where('content', $params['captcha'])->where('user_id', Auth::user()->id)->first()->delete();
        unset($params['captcha']);

        $comment->update($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success post comment'
        ], 201);
    }

    public function destroy(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 400);
        if(!($comment = $blog->comments()->getQuery()->find($request->comment_id))) return response()->json(['status' => 'not-found', 'message' => 'Comment not found'], 400);

        $comment->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Success delete comment'
        ], 204);
    }
}
