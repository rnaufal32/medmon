<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use function Pest\Laravel\get;

class MentionController extends Controller
{
    private $user;

    private function globalChart($type, $startDate, $endDate, $platforms)
    {
        $now = $endDate;
        $now7 = $startDate->copy();
        $dates = collect([]);
        $platfomIds = [];
        if(!empty($platforms)) {
            $platfomIds = explode(',', $platforms);
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
                ->selectRaw('COUNT(*) AS jml, target_type.name, DATE(date) AS newDate')
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('type', $platfomIds);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id', 'newDate')
                ->get();

            $globalAnalyticNewsData = $globalAnalyticNews->groupBy('name')->map(function ($items, $name) {
                return [
                    'label' => $name,
                    'data' => $items->pluck('jml')->toArray(),
                ];
            })->values()->toArray();

            return [
                'labels' => $dates->toArray(),
                'datasets' => $globalAnalyticNewsData,
            ];
        } else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, DATE(date) AS newDate, COUNT(*) AS jml')
                ->where('user_targets.id_user', $this->user->id)
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('id_socmed', $platfomIds);
                })
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->groupBy('target_type.id', 'newDate')
                ->get()
                ->groupBy('name')
                ->map(function ($items, $name) use ($dates) {
                    $data = $dates->mapWithKeys(function ($date) use ($items) {
                        $item = $items->firstWhere('newDate', $date);
                        return [$date => $item ? $item->jml : 0];
                    });
                    return [
                        'label' => $name,
                        'data' => $data->values()->toArray(),
                    ];
                })->values()->toArray();

            return [
                'labels' => $dates->toArray(),
                'datasets' => $globalAnalytic,
            ];
        }
    }

    private function dataList($target, $type, $startDate, $endDate, $platforms)
    {
        $platfomIds = [];
        if(!empty($platforms)) {
            $platfomIds = explode(',', $platforms);
        }
        if ($type == 'News') {
            return DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->leftJoin('news_source', 'news_source.site', '=', 'media_news.source')
                ->selectRaw('media_news.id, COALESCE(news_source.viewership, 0) AS viewership, COALESCE(news_source.pr_value, 0) AS pr_value, COALESCE(news_source.ad_value, 0) AS ad_value, COALESCE(news_source.tier, 3) AS tier, media_news.title, media_news.source AS username, media_news.content AS caption, media_news.created_at AS date, media_news.images, media_news.journalist, media_news.spookerperson, media_news.sentiment, media_news.url, "Media Online" AS platform')
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('type', $platfomIds);
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
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->when(count($platfomIds) > 0, function($query) use ($platfomIds) {
                    return $query->whereIn('id_socmed', $platfomIds);
                })
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->orderByDesc('social_posts.id')
                ->paginate(10)->onEachSide(2);
        }
    }

    public function index(Request $request)
    {
        $this->user = Auth::user();

        $type = $request->input('type', 'News');
        $startDate = Carbon::parse($request->input('startDate', now()->subDays(7)->toDateString()));
        $endDate = Carbon::parse($request->input('endDate', now()->toDateString()));
        $targets = $request->input('target');
        $platformFilters = $request->input('platform_type');

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

        return Inertia::render('Client/Mention', [
            'analytic' => fn() => $this->globalChart($type, $startDate, $endDate, $platformFilters),
            'data' => fn() => $this->dataList($targets, $type, $startDate, $endDate, $platformFilters),
            'target' => $target,
            'platforms' => $platforms
        ]);
    }
}
