
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
    
    /**
     * Handle an unauthenticated request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function unauthenticated($request, array $guards)
    {
        // Allow form creation/updating without authentication
        if ($request->is('api/forms') || 
            preg_match('#^api/forms/\d+$#', $request->path()) && ($request->isMethod('PUT') || $request->isMethod('POST'))) {
            return;  // Just return without throwing an exception, which allows the request to continue
        }
        
        parent::unauthenticated($request, $guards);
    }
}
