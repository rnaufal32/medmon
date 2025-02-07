<?php

namespace App\Http\Controllers\Client;

use App\Exports\AnalyticExport;
use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }

    public function reportView(Request $request) {
        $startDate  = Carbon::parse($request->input('start_date', now()->subDays(7)->toDateString()))->toDateString();
        $endDate    = Carbon::parse($request->input('end_date', now()->toDateString()))->toDateString();
        $target     = $request->input('target', null);
        $sentiment  = $request->input('sentiment', null);
        $source     = $request->input('source', 'News');
        $platforms  = $request->input('platforms', '');

        $platformIds = [];
        if(!empty($platforms)) {
            $platformIds = explode(',', $platforms);
        }

        $targets = DB::table('target_type')
                    ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
                    ->selectRaw('target_type.*')
                    ->where('user_targets.id_user', $this->user->id)
                    ->groupBy('target_type.id')
                    ->get();
                
        if ($source == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->leftJoin('social_media', 'media_news.type', '=', 'social_media.id')
                ->selectRaw('media_news.date, media_news.title, media_news.summary, social_media.name, media_news.sentiment, media_news.images, media_news.url, media_news.journalist')
                ->whereNotNull('date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(!empty($sentiment), function($query) use ($sentiment) {
                    return $query->where('media_news.sentiment', $sentiment);
                })
                ->when(count($platformIds) > 0, function($query) use($platformIds) {
                    return $query->whereIn('media_news.type', $platformIds);
                })
                ->whereDate('media_news.created_at', '>=', $startDate)
                ->whereDate('media_news.created_at', '<=', $endDate)
                ->get();
                // $result = $globalAnalyticNews;
                $result = collect($globalAnalyticNews)->filter(function($row) {
                    return validateDate($row->date);
                })->values();
        }else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->join('social_media', 'social_posts.id_socmed', '=', 'social_media.id')
                ->selectRaw('social_posts.date, social_posts.caption, social_posts.username, social_posts.hashtags, social_posts.likes, social_posts.comments, social_posts.views, social_posts.url, social_posts.sentiment, social_media.name')
                ->whereNotNull('date')
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(!empty($sentiment), function($query) use ($sentiment) {
                    return $query->where('social_posts.sentiment', $sentiment);
                })
                ->when(count($platformIds) > 0, function($query) use($platformIds) {
                    return $query->whereIn('social_posts.id_socmed', $platformIds);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('social_posts.created_at', '>=', $startDate)
                ->whereDate('social_posts.created_at', '<=', $endDate)
                ->get();
                
                $result = $globalAnalytic->filter(function($row) {
                    return validateDate($row->date);
                })->values();
        }

        return [
            'targets'   => $targets,
            'result'    => $result
        ];

        return Inertia::render('Client/Excel', [
            'targets'   => $targets,
            'result'    => $result
        ]);
    }

    public function exportToExcel(Request $request) {
        $startDate  = Carbon::parse($request->input('start_date', now()->subDays(7)->toDateString()))->toDateString();
        $endDate    = Carbon::parse($request->input('end_date', now()->toDateString()))->toDateString();
        $target     = $request->input('target', null);
        $sentiment  = $request->input('sentiment', null);
        $source     = $request->input('source', 'News');
        $platforms  = $request->input('platforms', '');

        $platformIds = [];
        if(!empty($platforms)) {
            $platformIds = explode(',', $platforms);
        }

        $targetName = "";
        if($target) {
            $targetName = DB::table('target_type')
            ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
            ->selectRaw('target_type.name')
            ->where('user_targets.id_user', $this->user->id)
            ->where('target_type.id', $target)
            ->groupBy('target_type.id')
            ->first()->name;
        }

        return Excel::download(new AnalyticExport($this->user, $source, $target, $sentiment, $startDate, $endDate, $platformIds),  "report-analytic-$startDate-$endDate-$targetName-$source-".($sentiment ? "$sentiment-" : "") .time(). ".xlsx");
    }
}
