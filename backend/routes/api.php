
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FormController;
use App\Http\Controllers\API\FormElementController;
use App\Http\Controllers\API\FormResponseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Test route to verify API is working
Route::get('/ping', function() {
    return response()->json(['message' => 'API is working!', 'timestamp' => now()]);
});

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user']);

// Auth check routes
Route::get('/auth/check', [AuthController::class, 'check']);
Route::get('/auth/debug', [AuthController::class, 'debug']);

// Public Routes for forms - These do NOT require authentication
Route::get('/forms', [FormController::class, 'index']); // Public forms list
Route::post('/forms', [FormController::class, 'store']); // Allow anonymous form creation
Route::put('/forms/{id}', [FormController::class, 'update']); // Allow anonymous form updates
Route::delete('/forms/{id}', [FormController::class, 'destroy']); // Allow anonymous form deletion
Route::post('/forms/{id}/toggle-publish', [FormController::class, 'togglePublish']);
Route::get('/forms/{id}', [FormController::class, 'show']); // Get form by ID
Route::get('/forms/slug/{slug}', [FormController::class, 'getBySlug']); // Get form by slug
Route::post('/forms/{slug}/responses', [FormResponseController::class, 'store']); // Submit form response

// Protected Routes - These all require authentication
Route::middleware('auth:sanctum')->group(function () {
    // Form Elements
    Route::get('/forms/{form}/elements', [FormElementController::class, 'index']);
    Route::post('/forms/{form}/elements', [FormElementController::class, 'store']);
    Route::get('/forms/{form}/elements/{element}', [FormElementController::class, 'show']);
    Route::put('/forms/{form}/elements/{element}', [FormElementController::class, 'update']);
    Route::delete('/forms/{form}/elements/{element}', [FormElementController::class, 'destroy']);

    // Form Responses
    Route::get('/forms/{formId}/responses', [FormResponseController::class, 'index']);
    Route::get('/forms/{formId}/responses/{responseId}', [FormResponseController::class, 'show']);
    Route::delete('/forms/{formId}/responses/{responseId}', [FormResponseController::class, 'destroy']);
    Route::get('/forms/{formId}/statistics', [FormResponseController::class, 'statistics']);
    Route::get('/forms/{formId}/responses/export', [FormResponseController::class, 'export']);
});
