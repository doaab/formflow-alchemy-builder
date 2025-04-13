<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://localhost:5173', // Vite dev server default
        'http://127.0.0.1:5173',
        'https://e005b4a0-4ab9-477a-8ffb-cd1345d72df5.lovableproject.com',
        'https://lovable.dev/projects/e005b4a0-4ab9-477a-8ffb-cd1345d72df5',
        'https://preview--formflow-alchemy-builder.lovable.app',
        '*', // Allow all origins temporarily for debugging
    ],

    'allowed_origins_patterns' => ['#^https?://.+\.lovableproject\.com$#'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
