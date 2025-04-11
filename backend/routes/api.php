
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

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

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Forms
    Route::get('/forms', [App\Http\Controllers\API\FormController::class, 'index']);
    Route::post('/forms', [App\Http\Controllers\API\FormController::class, 'store']);
    Route::get('/forms/{form}', [App\Http\Controllers\API\FormController::class, 'show']);
    Route::put('/forms/{form}', [App\Http\Controllers\API\FormController::class, 'update']);
    Route::delete('/forms/{form}', [App\Http\Controllers\API\FormController::class, 'destroy']);
    Route::post('/forms/{form}/toggle-publish', [App\Http\Controllers\API\FormController::class, 'togglePublish']);

    // Form Elements
    Route::get('/forms/{form}/elements', [App\Http\Controllers\API\FormElementController::class, 'index']);
    Route::post('/forms/{form}/elements', [App\Http\Controllers\API\FormElementController::class, 'store']);
    Route::get('/forms/{form}/elements/{element}', [App\Http\Controllers\API\FormElementController::class, 'show']);
    Route::put('/forms/{form}/elements/{element}', [App\Http\Controllers\API\FormElementController::class, 'update']);
    Route::delete('/forms/{form}/elements/{element}', [App\Http\Controllers\API\FormElementController::class, 'destroy']);

    // Form Responses
    Route::get('/forms/{form}/responses', [App\Http\Controllers\API\FormResponseController::class, 'index']);
    Route::get('/forms/{form}/responses/{response}', [App\Http\Controllers\API\FormResponseController::class, 'show']);
    Route::delete('/forms/{form}/responses/{response}', [App\Http\Controllers\API\FormResponseController::class, 'destroy']);
    Route::get('/forms/{form}/responses/export', [App\Http\Controllers\API\FormResponseController::class, 'export']);
});

// Public Routes for form submission
Route::post('/forms/{form}/responses', [App\Http\Controllers\API\FormResponseController::class, 'store']);
