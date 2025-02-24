<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Login successful',
                'token' => $request->user()->createToken("app")->plainTextToken
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}