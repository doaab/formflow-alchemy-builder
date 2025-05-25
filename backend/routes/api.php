
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\FormController;
use App\Http\Controllers\API\FormElementController;
use App\Http\Controllers\API\FormResponseController;
use App\Http\Controllers\API\QuestionTypeController;
use App\Http\Controllers\API\PackagesController;

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
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});
// Question types - public access
Route::get('/question-types', [QuestionTypeController::class, 'index']);
Route::get('/packages', [PackagesController::class, 'getPackages']);

// Public form access by slug - no authentication required
Route::get('/forms/by-slug/{slug}', [FormController::class, 'getBySlug']);

// Form routes - some are protected by auth
Route::prefix('forms')->group(function () {
    // Public routes
    Route::get('/', [FormController::class, 'index']);
    Route::get('/{form}', [FormController::class, 'show']);

    // Form elements - public read access
    Route::get('/{form}/element', [FormElementController::class, 'index']);

    // Submit form responses - public access
    Route::post('/{slug}/responses', [FormResponseController::class, 'store']);

    // Routes that need auth
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [FormController::class, 'store']);
        Route::put('/{form}', [FormController::class, 'update']);
        Route::delete('/{form}', [FormController::class, 'destroy']);
        Route::post('/{form}/toggle-publish', [FormController::class, 'togglePublish']);
        Route::post('/{form}/status', [FormController::class, 'updateStatus']);
        Route::get('/{form}/analytics', [FormController::class, 'analytics']);

        // Form elements management
        Route::post('/{form}/elements', [FormElementController::class, 'store']);
        Route::put('/{form}/elements/{element}', [FormElementController::class, 'update']);
        Route::delete('/{form}/elements/{element}', [FormElementController::class, 'destroy']);
        Route::post('/{form}/elements/reorder', [FormElementController::class, 'reorder']);

        // Form responses
        Route::get('/{form}/responses', [FormResponseController::class, 'index']);
        Route::get('/{form}/responses/{id}', [FormResponseController::class, 'show']);
        Route::delete('/{form}/responses/{response}', [FormResponseController::class, 'destroy']);
        Route::get('/{form}/responses/export', [FormResponseController::class, 'export']);
        Route::get('/{form}/responses/statistics', [FormResponseController::class, 'statistics']);
    });
});
