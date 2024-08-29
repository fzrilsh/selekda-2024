<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: '',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function(AuthenticationException $e){
            throw new HttpResponseException(response()->json([
                'status' => 'invalid',
                'message' => 'Invalid token.'
            ], 401));
        });

        $exceptions->render(function(ValidationException $e){
            throw new HttpResponseException(response()->json([
                'status' => 'invalid',
                'message' => 'Invalid field',
                'errors' => $e->errors()
            ], 400));
        });
    })->create();
