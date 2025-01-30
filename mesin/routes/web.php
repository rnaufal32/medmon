<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('signin', [\App\Http\Controllers\Auth\SignInController::class, 'index'])->name('login');
Route::post('signin', [\App\Http\Controllers\Auth\SignInController::class, 'store']);

Route::group([
    'middleware' => 'auth'
], function () {
    Route::get('dashboard', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/mentions', [\App\Http\Controllers\MentionController::class, 'index'])->name('mentions.index');
    Route::get('/summary', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('summary.index');
    Route::get('/sentiment', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('sentiment.index');
    Route::get('/excel', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('excel.index');

    // UTILITY
    Route::post('/select-type-media', [\App\Http\Controllers\SelectTypeMediaController::class, 'store'])->name('select-type-media.store');

    Route::get('signout', function () {
        \Illuminate\Support\Facades\Auth::logout();

        return redirect('/signin');
    })->name('signout');
});
