<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\MediaNews;
use App\Models\SocialPost;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Laravel\Prompts\error;

class AnalyticController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function index(Request $request)
    {
        $startDate = Carbon::parse($request->input('start_date', now()->toDateString()));
        $endDate = Carbon::parse($request->input('end_date', now()->toDateString()));
        $target = $request->input('target', null);
        $source = $request->input('source', 'News');
        $platforms = $request->input('platform', null);

        if ($startDate->diff($endDate)->days > 7) {
            abort(500, 'Error');
        }

        $platfomIds = [];
        if (!empty($platforms)) {
            $platfomIds = explode(',', $platforms);
        }

        $dates = collect([]);
        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $dates->push($currentDate->toDateString());
            $currentDate->addDay();
        }

        $result = [
            'labels' => $dates,
            'datasets' => [],
        ];

        $summaries = [];

        $targets = DB::table('target_type')
            ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
            ->selectRaw('target_type.*')
            ->where('user_targets.id_user', $this->user->id)
            ->groupBy('target_type.id')
            ->get();

        $targetList = $targets->filter(function ($item) use ($target) {
            return $item->id == $target || $target == null;
        });

        if ($source == 'News') {
            $globalAnalyticNews = MediaNews::query()
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, media_news.sentiment, media_news.source')
                ->whereNotNull('date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function ($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(count($platfomIds) > 0, function ($query) use ($platfomIds) {
                    return $query->whereIn('media_news.type', $platfomIds);
                })
                ->whereDate('media_news.date', '>=', $startDate->toDateString())
                ->whereDate('media_news.date', '<=', $endDate->toDateString())
                ->get();
            
            $globalAnalyticNews = $globalAnalyticNews->filter(function ($row) {
                return validateDate($row->date_label);
            });

            $index = 0;
            foreach ($targetList as $t) {
                $result['datasets'][$index]['label'] = $t->name;
                foreach ($dates as $dt) {
                    $result['datasets'][$index]['data'][] = $globalAnalyticNews->where('name', $t->name)->where('date_label', $dt)->count();
                }
                $index++;
            }

            foreach ($targetList as $t) {
                $summaries[] = [
                    'target' => $t->name,
                    'counts' => [
                        'mention' => $globalAnalyticNews->where('name', $t->name)->count(),
                        'positive' => $globalAnalyticNews->where('sentiment', 'positive')->where('name', $t->name)->count(),
                        'negative' => $globalAnalyticNews->where('sentiment', 'negative')->where('name', $t->name)->count(),
                        'neutral' => $globalAnalyticNews->where('sentiment', 'neutral')->where('name', $t->name)->count(),
                        'like' => $globalAnalyticNews->where('name', $t->name)->sum('likes'),
                        'comment' => $globalAnalyticNews->where('name', $t->name)->sum('comments'),
                        'view' => $globalAnalyticNews->where('name', $t->name)->sum('views'),
                    ]
                ];
            }

            $pieData = [];
            $index = 0;
            foreach ($targetList as $t) {
                $pieData[$index]['target'] = $t->name;
                $sources = $globalAnalyticNews->where('name', $t->name)->groupBy('source')->map->count()->sortDesc()->take(5);

                $pieData[$index]['datasets']['labels'] = collect($sources)->keys();
                $pieData[$index]['datasets']['data'] = collect($sources)->values();;

                $index++;
            }
        } else {
            $globalAnalytic = SocialPost::query()
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, sentiment, likes, comments, views, username')
                ->whereNotNull('date')
                ->when(!empty($target), function ($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(count($platfomIds) > 0, function ($query) use ($platfomIds) {
                    return $query->whereIn('id_socmed', $platfomIds);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->get();

            $globalAnalytic = $globalAnalytic->filter(function ($row) {
                return validateDate($row->date_label);
            });

            $index = 0;
            foreach ($targetList as $t) {
                $result['datasets'][$index]['label'] = $t->name;
                foreach ($dates as $dt) {
                    $result['datasets'][$index]['data'][] = $globalAnalytic->where('name', $t->name)->where('date_label', $dt)->count();
                }
                $index++;
            }


            foreach ($targetList as $t) {
                $summaries[] = [
                    'target' => $t->name,
                    'counts' => [
                        'mention' => $globalAnalytic->where('name', $t->name)->count(),
                        'positive' => $globalAnalytic->where('sentiment', 'positive')->where('name', $t->name)->count(),
                        'negative' => $globalAnalytic->where('sentiment', 'negative')->where('name', $t->name)->count(),
                        'neutral' => $globalAnalytic->where('sentiment', 'neutral')->where('name', $t->name)->count(),
                        'like' => $globalAnalytic->where('name', $t->name)->sum('likes'),
                        'comment' => $globalAnalytic->where('name', $t->name)->sum('comments'),
                        'view' => $globalAnalytic->where('name', $t->name)->sum('views'),
                    ]
                ];
            }

            $pieData = [];
            $index = 0;
            foreach ($targetList as $t) {
                $pieData[$index]['target'] = $t->name;
                $sources = $globalAnalytic->where('name', $t->name)->groupBy('username')->map->count()->sortDesc()->take(5);

                $pieData[$index]['datasets']['labels'] = collect($sources)->keys();
                $pieData[$index]['datasets']['data'] = collect($sources)->values();;

                $index++;
            }
        }

        $platformList = DB::table('social_media')
            ->where(function ($query) use ($source) {
                if ($source == 'News') {
                    $query->where('type', 'media');
                } else {
                    $query->where('type', 'sosmed');
                }
            })
            ->get();

        // return [
        //     'chart'     => $result,
        //     'summaries' => $summaries,
        //     'targets'   => $targets,
        //     'pieData'   => $pieData,
        //     'platforms' => $platformList
        // ];

        $targetColor = $targets->pluck('color', 'name');

        return Inertia::render('Client/Analytics', [
            'target_color' => $targetColor,
            'chart' => $result,
            'summaries' => $summaries,
            'targets' => $targets,
            'pieData' => $pieData,
            'platforms' => $platformList,
        ]);
    }
}
