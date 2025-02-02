<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

use Auth;
use DB;

class SentimentController extends Controller
{
    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }
    public function index(Request $request)
    {
        $type           = $request->input('type', 'News');
        $sentimentType  = $request->input('sentiment_type', null);
        $startDate      = Carbon::parse($request->input('startDate', now()->subDays(7)->toDateString()));
        $endDate        = Carbon::parse($request->input('endDate', now()->toDateString()));
        $targets        = $request->input('target');
        $platformFilters    = $request->input('platform_type');

        $target = DB::table('target_type')
            ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
            ->selectRaw('target_type.*')
            ->where('user_targets.id_user', $this->user->id)
            ->groupBy('target_type.id')
            ->get();

        $platforms = DB::table('social_media')
            ->where(function ($query) use ($type) {
                if ($type == 'News') {
                    $query->where('type', 'media');
                } else {
                    $query->where('type', 'sosmed');
                }
            })
            ->get();

        return Inertia::render('Client/Sentiment', [
            'analytic' => fn() => $this->_globalChart($type, $startDate, $endDate, $platformFilters, $sentimentType, $targets),
            'data' => fn() => $this->_dataList($targets, $type, $startDate, $endDate, $platformFilters, $sentimentType),
            'target' => $target,
            'platforms' => $platforms
        ]);
    }

    private function _globalChart($type, $startDate, $endDate, $platforms, $sentimentType, $target) {
        $now = $endDate;
        $now7 = $startDate->copy();
        $dates = collect([]);
        $result = [];

        $sentiments = ['positive', 'neutral', 'negative'];

        $platfomIds = [];
        if(!empty($platforms)) {
            $platfomIds = explode(',', $platforms);
        }

        $sentimentTypes = [];
        if(!empty($sentimentType)) {
            $sentimentTypes = explode(',', $sentimentType);
        }

        while ($now7 <= $now) {
            $dates->push($now7->toDateString());
            $now7->addDay();
        }

        if ($type == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, DATE(date) AS newDate, media_news.sentiment')
                ->where('user_targets.id_user', $this->user->id)
                ->whereNotNull('date')
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('media_news.type', $platfomIds);
                })
                ->when(count($sentimentTypes) > 0, function($query) use ($sentimentTypes) {
                    return $query->whereIn('sentiment', $sentimentTypes);
                })
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->get();

            $globalAnalyticNews = $globalAnalyticNews->filter(function($row) {
                return validateDate($row->newDate);
            });

            $sets = [];
            foreach($sentiments as $sentiment) {
                $dailyData = [];
                foreach ($dates as $dt) {
                    $dailyData[] = $globalAnalyticNews->where('sentiment', $sentiment)->where('newDate', $dt)->count();
                }
                
                $sets[] = [
                    'label'     => $sentiment,
                    'data'      => $dailyData
                ];
            }

            $result = [
                'labels' => $dates->toArray(),
                'datasets' => $sets,
            ];
        } else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, DATE(date) AS newDate, sentiment')
                ->where('user_targets.id_user', $this->user->id)
                ->whereNotNull('date')
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('id_socmed', $platfomIds);
                })
                ->when(count($sentimentTypes) > 0, function($query) use ($sentimentTypes) {
                    return $query->whereIn('sentiment', $sentimentTypes);
                })
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->get();
            
            $globalAnalytic = $globalAnalytic->filter(function($row) {
                return validateDate($row->newDate);
            });

            $sets = [];
            foreach($sentiments as $sentiment) {
                $dailyData = [];
                foreach ($dates as $dt) {
                    $dailyData[] = $globalAnalytic->where('sentiment', $sentiment)->where('newDate', $dt)->count();
                }
                
                $sets[] = [
                    'label'     => $sentiment,
                    'data'      => $dailyData
                ];
            }

            $result = [
                'labels' => $dates->toArray(),
                'datasets' => $sets,
            ];
        }

        return $result;
    }

    private function _dataList($target, $type, $startDate, $endDate, $platforms, $sentimentType) {
        $platfomIds = [];
        if(!empty($platforms)) {
            $platfomIds = explode(',', $platforms);
        }

        $sentimentTypes = [];
        if(!empty($sentimentType)) {
            $sentimentTypes = explode(',', $sentimentType);
        }

        if ($type == 'News') {
            return DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->leftJoin('news_source', 'news_source.site', '=', 'media_news.source')
                ->selectRaw('media_news.id, COALESCE(news_source.viewership, 0) AS viewership, COALESCE(news_source.pr_value, 0) AS pr_value, COALESCE(news_source.ad_value, 0) AS ad_value, COALESCE(news_source.tier, 3) AS tier, media_news.title, media_news.source AS username, media_news.content AS caption, media_news.created_at AS date, media_news.images, media_news.journalist, media_news.spookerperson, media_news.sentiment, media_news.url, "Media Online" AS platform')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('media_news.type', $platfomIds);
                })
                ->when(count($sentimentTypes) > 0, function($query) use ($sentimentTypes) {
                    return $query->whereIn('sentiment', $sentimentTypes);
                })
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->orderByDesc('media_news.id')
                ->paginate(10)->onEachSide(2);
        } else {
            return DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->join('social_media', 'social_media.id', '=', 'social_posts.id_socmed')
                ->selectRaw('social_posts.username, social_posts.caption, social_posts.date, social_posts.sentiment, social_posts.likes, social_posts.comments, social_posts.views, social_media.name AS platform, social_posts.url')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('id_socmed', $platfomIds);
                })
                ->when(count($sentimentTypes) > 0, function($query) use ($sentimentTypes) {
                    return $query->whereIn('sentiment', $sentimentTypes);
                })
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->orderByDesc('social_posts.id')
                ->paginate(10)->onEachSide(2);
        }
    }
}
