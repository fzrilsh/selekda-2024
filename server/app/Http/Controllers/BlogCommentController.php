<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
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
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 404);
        return response()->json([
            'status' => 'success',
            'message' => 'Success get all comments',
            'data' => $blog->comments()->get()
        ]);
    }

    public function store(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 404);
        $params = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|exists:users,email',
            'subject' => 'required|string',
            'comment' => 'required|string',
            'captcha' => ['required', function(string $attribute, mixed $value, Closure $fail){
                $id = explode('|', $value)[0];
                $value = explode('|', $value)[1];
                $captcha = Captcha::query()->find((int)$id);
                if(!$captcha || !CaptchaController::check($captcha, $value)) $fail('Captcha is invalid.');
            }]
        ]);
        unset($params['captcha']);

        $blog->comments()->create($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success post comment'
        ], 201);
    }

    public function update(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 404);
        if(!($comment = $blog->comments()->getQuery()->find($request->comment_id))) return response()->json(['status' => 'not-found', 'message' => 'Comment not found'], 404);
        $params = $request->validate([
            'name' => 'string',
            'email' => 'email',
            'subject' => 'string',
            'comment' => 'string',
            'captcha' => ['required', function(string $attribute, mixed $value, Closure $fail){
                $id = explode('|', $value)[0];
                $captcha = Captcha::query()->find($id);
                if(!$captcha || !CaptchaController::check($captcha, $value)) $fail('Captcha is invalid.');
            }]
        ]);
        unset($params['captcha']);

        $comment->update($params);
        return response()->json([
            'status' => 'success',
            'message' => 'Success update comment'
        ]);
    }

    public function destroy(Request $request){
        if(!($blog = Blog::query()->find($request->blog_id))) return response()->json(['status' => 'not-found', 'message' => 'Blog not found'], 404);
        if(!($comment = $blog->comments()->getQuery()->find($request->comment_id))) return response()->json(['status' => 'not-found', 'message' => 'Comment not found'], 404);

        $comment->delete();
        return response(status:204);
    }
}
