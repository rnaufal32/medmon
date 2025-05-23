<?php

use App\Http\Controllers\Client\AnalyticController;
use App\Http\Controllers\Client\DashboardController;
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
    Route::get('/crawling', [\App\Http\Controllers\Client\DashboardController::class, 'index'])->name('crawling.index');
    Route::get('/excel', [ReportController::class, 'reportView'])->name('excel.index');
    Route::get('/excel/export', [ReportController::class, 'exportToExcel'])->name('excel.export');
    // Route::get('/excel', [ReportController::class, 'index'])->name('excel.index');
    Route::get('/word-cloud-export', [DashboardController::class, 'exportWordCloud'])->name('dashboard.wordcloud.export');

    // ADMIN
    Route::get('/news', [\App\Http\Controllers\Admin\NewsController::class, 'index'])->name('news.index');
    Route::post('/news', [\App\Http\Controllers\Admin\NewsController::class, 'store'])->name('news.store');
    Route::get('/news/export', [\App\Http\Controllers\Admin\NewsExportController::class, 'index'])->name('news.export');
//    Route::get('/news/export', [\App\Http\Controllers\Admin\NewsController::class, 'exportNews'])->name('news.export');
    Route::delete('/news/{id}', [\App\Http\Controllers\Admin\NewsController::class, 'delete'])->name('news.delete');
    Route::get('/news/import-sample', [\App\Http\Controllers\Admin\NewsController::class, 'importSample'])->name('news.import-sample');
    Route::post('/news/import', [\App\Http\Controllers\Admin\NewsController::class, 'importNews'])->name('news.import');
    Route::get('/news/crawling', [\App\Http\Controllers\Admin\NewsController::class, 'crawling'])->name('news.crawling');
    Route::post('/news/crawling', [\App\Http\Controllers\Admin\NewsController::class, 'crawlingSubmit'])->name('news.crawling.submit');
    Route::post('/news/crawling/store', [\App\Http\Controllers\Admin\NewsController::class, 'crawlingStore'])->name('news.crawling.store');

    Route::post('source/news/store', [\App\Http\Controllers\NewsSourceController::class, 'store'])->name('source.news.store');
    Route::get('source/news', [\App\Http\Controllers\NewsSourceController::class, 'index'])->name('source.news');

    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::post('/users/target', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.target.update');
    Route::post('/users/target/status', [\App\Http\Controllers\Admin\UserController::class, 'updateStatus'])->name('users.target.status.update');

    Route::get('/crawler', [\App\Http\Controllers\Admin\CrawlerController::class, 'index'])->name('crawler.index');
});

Route::get('/google-crawling/v2', [\App\Http\Controllers\CrawlingController::class, 'googleV2']);
Route::get('/news-crawling/v2', [\App\Http\Controllers\CrawlingController::class, 'newsV2']);
Route::get('/instagram-crawling/v2', [\App\Http\Controllers\CrawlingController::class, 'instagramScrape']);
Route::get('/tiktok-crawling/v2', [\App\Http\Controllers\CrawlingController::class, 'tiktokScrape']);
Route::get('/facebook-crawling/v2', [\App\Http\Controllers\CrawlingController::class, 'facebookScrape']);
Route::get('/youtube-crawling/v2', [\App\Http\Controllers\CrawlingController::class, 'youtubeScrape']);
Route::get('/news-viewership', [\App\Http\Controllers\CrawlingController::class, 'newsViewership']);

Route::get('/maintenance', function () {
    dd(bcrypt('nanda-markathing'));
    return view('maintenance');
})->name('maintenance');
