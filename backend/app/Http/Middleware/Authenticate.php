
<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // If the request is an API request, return null to prevent redirection
        // and let the API handle the unauthenticated response appropriately
        if ($request->is('api/*')) {
            return null;
        }
        
        // For web requests, redirect to the login page
        return $request->expectsJson() ? null : '/login';
    }
}
