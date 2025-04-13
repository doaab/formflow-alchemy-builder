<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    /**
     * Register a new user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        // Start session if not started
        if (!$request->session()->isStarted()) {
            $request->session()->start();
        }

        // Regenerate session ID for security
        $request->session()->regenerate();

        return response()->json([
            'user' => $user,
            'message' => 'User registered successfully',
        ], 201);
    }

    /**
     * Login user and create session
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Attempt to login
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        // Start session if not started
        if (!$request->session()->isStarted()) {
            $request->session()->start();
        }

        // Regenerate session ID for security
        $request->session()->regenerate();

        $user = Auth::user();

        // Create a token for API access if needed
        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'message' => 'User logged in successfully',
            // 'token' => $token,
        ]);
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        // Revoke all tokens if using token authentication
        // if (Auth::check()) {
        //     $user = Auth::user();
        //     $user->tokens()->delete();
        // }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'User logged out successfully']);
    }

    /**
     * Get the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        return response()->json(['user' => $request->user()]);
    }

    /**
     * Check if user is authenticated
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request)
    {
        return response()->json([
            'authenticated' => Auth::check(),
            'user' => Auth::check() ? Auth::user() : null,
        ]);
    }

    /**
     * Debug endpoint to check token information
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function debug(Request $request)
    {
        $sessionId = $request->session()->getId();
        $tokens = [];

        if (Auth::check()) {
            $user = Auth::user();
            $tokens = PersonalAccessToken::where('tokenable_id', $user->id)->get();
        }

        return response()->json([
            'session_id' => $sessionId,
            'tokens' => $tokens,
            'authenticated' => Auth::check(),
            'user' => Auth::check() ? Auth::user() : null,
            'session_data' => $request->session()->all(),
        ]);
    }
}
