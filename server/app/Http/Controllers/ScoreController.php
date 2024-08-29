<?php

namespace App\Http\Controllers;

use App\Models\GameLeaderboard;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    public function index(){
        $scores = GameLeaderboard::all()->sortBy([['score', 'desc']])->values();
        return response()->json([
            'message' => 'Success get game leaderboard',
            'data' => $scores
        ]);
    }

    public function store(Request $request){
        $params = $request->validate([
            'username' => 'required|string',
            'score' => 'required|string',
            'country' => 'required|string'
        ]);

        Auth::user()->Scores()->create($params);
        return response()->json(['message' => 'success insert score'], 201);
    }
}
