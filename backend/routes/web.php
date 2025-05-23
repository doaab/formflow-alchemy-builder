
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Add a named route for login
Route::view('/login', 'welcome')->name('login');

// Add a route for survey forms - this simply passes through to the frontend
Route::get('/survey/{slug}', function () {
    return view('welcome');
})->where('slug', '[a-zA-Z0-9\-]+');

