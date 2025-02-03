<?php

use App\Http\Controllers\Client\AnalyticController;
use App\Http\Controllers\Client\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('signin', [\App\Http\Controllers\Auth\SignInController::class, 'index'])->name('login');
Route::post('signin', [\App\Http\Controllers\Auth\SignInController::class, 'store']);

Route::group([
    'middleware' => 'auth'
], function () {
    Route::get('/dashboard', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/mentions', [\App\Http\Controllers\MentionController::class, 'index'])->name('mentions.index');
    Route::get('/summary', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('summary.index');
    Route::get('/sentiment', [\App\Http\Controllers\SentimentController::class, 'index'])->name('sentiment.index');
    Route::get('/excel', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('excel.index');

    // UTILITY
    Route::post('/select-type-media', [\App\Http\Controllers\SelectTypeMediaController::class, 'store'])->name('select-type-media.store');

    Route::get('/signout', function () {
        \Illuminate\Support\Facades\Auth::logout();

        return redirect('/signin');
    })->name('signout');

    Route::get('/analytics', [\App\Http\Controllers\Client\AnalyticController::class, 'index'])->name('analytics.index');

    Route::get('/roles', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('roles.index');
    Route::get('/permissions', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('permissions.index');
    Route::get('/users', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('users.index');
    Route::get('/menus', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('menus.index');
    Route::get('/scrape', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('scrape.index');
    Route::get('/keywords', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('keywords.index');
    Route::get('/news', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('news.index');
    Route::get('/crawling', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('crawling.index');

    Route::get('/analytics-report', [ReportController::class, 'reportView']);
    Route::get('/analytics/export', [ReportController::class, 'exportToExcel']);

});
