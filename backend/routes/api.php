
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FormController;
use App\Http\Controllers\API\FormElementController;
use App\Http\Controllers\API\FormResponseController;
use App\Http\Controllers\API\QuestionTypeController;

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

// Public routes
Route::get('forms/{slug}', [FormController::class, 'getBySlug']);
Route::post('forms/{slug}/responses', [FormResponseController::class, 'store']);
Route::get('question-types', [QuestionTypeController::class, 'index']);
Route::get('question-types/by-category', [QuestionTypeController::class, 'getByCategory']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Forms
    Route::apiResource('forms', FormController::class);
    Route::post('forms/{form}/toggle-publish', [FormController::class, 'togglePublish']);
    Route::get('forms/{form}/analytics', [FormController::class, 'analytics']);
    
    // Form Elements
    Route::apiResource('forms.elements', FormElementController::class);
    Route::post('forms/{form}/elements/reorder', [FormElementController::class, 'reorder']);
    
    // Form Responses
    Route::apiResource('forms.responses', FormResponseController::class)->only(['index', 'show']);
    Route::get('forms/{form}/responses/export', [FormResponseController::class, 'export']);
    Route::get('forms/{form}/responses/statistics', [FormResponseController::class, 'statistics']);
});
