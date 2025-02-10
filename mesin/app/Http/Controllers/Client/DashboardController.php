<?php

namespace App\Http\Controllers\Client;

use App\Exports\WordCloudExport;
use App\Http\Controllers\Controller;
use App\Models\BlockWord;
use App\Models\SocialPost;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use WordCounter\WordCounter;

class DashboardController extends Controller
{

    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }

    private function globalChart($type, $startDate, $endDate)
    {
        $now = $endDate;
        $now7 = $startDate->copy();
        $dates = collect([]);

        while ($now7 <= $now) {
            $dates->push($now7->toDateString());
            $now7->addDay();
        }

        if ($type == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('COUNT(*) AS jml, target_type.name, DATE(date) AS newDate, target_type.color')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id', 'newDate')
                ->get();

            $globalAnalyticNewsData = $globalAnalyticNews->groupBy('name')->map(function ($items, $name) {
                return [
                    'label' => $name,
                    'color' => $items->first()->color,
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

    private function totalTopic($type, $startDate, $endDate)
    {
        if ($type == "News") {
            $totalAnalytic = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('COUNT(*) AS jml, target_type.name, target_type.color')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $totalAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'data' => $totalAnalytic->pluck('jml')->toArray(),
                    ]
                ]
            ];
        } else {
            $totalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('COUNT(*) AS jml, target_type.name, target_type.color')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $totalAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'data' => $totalAnalytic->pluck('jml')->toArray(),
                    ]
                ]
            ];
        }
    }

    private function sentiment($type, $startDate, $endDate)
    {
        if ($type == "News") {
            $sentimentAnalytic = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name')
                ->selectRaw('SUM(IF(sentiment = "positive", 1, 0)) AS positive')
                ->selectRaw('SUM(IF(sentiment = "negative", 1, 0)) AS negative')
                ->selectRaw('SUM(IF(sentiment = "neutral", 1, 0)) AS neutral')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $sentimentAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'label' => 'Positive',
                        'data' => $sentimentAnalytic->pluck('positive')->toArray(),
                        'backgroundColor' => ['green'],
                    ],
                    [
                        'label' => 'Negative',
                        'data' => $sentimentAnalytic->pluck('negative')->toArray(),
                        'backgroundColor' => ['red'],
                    ],
                    [
                        'label' => 'Neutral',
                        'data' => $sentimentAnalytic->pluck('neutral')->toArray(),
                        'backgroundColor' => ['gray'],
                    ],
                ]
            ];
        } else {
            $sentimentAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name')
                ->selectRaw('SUM(IF(sentiment = "positive", 1, 0)) AS positive')
                ->selectRaw('SUM(IF(sentiment = "negative", 1, 0)) AS negative')
                ->selectRaw('SUM(IF(sentiment = "neutral", 1, 0)) AS neutral')
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->groupBy('target_type.id')
                ->get();

            return [
                'labels' => $sentimentAnalytic->pluck('name')->toArray(),
                'datasets' => [
                    [
                        'label' => 'Positive',
                        'data' => $sentimentAnalytic->pluck('positive')->toArray(),
                        'backgroundColor' => ['green'],
                    ],
                    [
                        'label' => 'Negative',
                        'data' => $sentimentAnalytic->pluck('negative')->toArray(),
                        'backgroundColor' => ['red'],
                    ],
                    [
                        'label' => 'Neutral',
                        'data' => $sentimentAnalytic->pluck('neutral')->toArray(),
                        'backgroundColor' => ['gray'],
                    ],
                ]
            ];
        }
    }

    private function wordCloud($type, $startDate, $endDate)
    {
        $skipWords = BlockWord::all()->pluck('name')->toArray();
        $socialCaption = SocialPost::query()
            ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
            ->where('user_targets.id_user', $this->user->id)
            ->whereDate('date', '>=', $startDate->toDateString())
            ->whereDate('date', '<=', $endDate->toDateString())
            ->get();
        $captionWordCloud = new WordCounter($socialCaption->pluck('caption')->join(''));
        $captionWordCloud->skipWords($skipWords);
//        $captionWordCloud->limit(15);
        $captionWordCloud = $captionWordCloud->get();
        $captionWordCloud = array_map(function ($key, $value) {
            return [
                'text' => $key,
                'value' => $value
            ];
        }, array_keys($captionWordCloud), $captionWordCloud);

        return $captionWordCloud;
    }

    public function exportWordCloud(Request $request) {
        $startDate = Carbon::parse($request->input('startDate', now()->subDays(7)->toDateString()));
        $endDate = Carbon::parse($request->input('endDate', now()->toDateString()));

        return Excel::download(new WordCloudExport($this->user, $startDate, $endDate),  "word-cloud-$startDate-$endDate" .time(). ".xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }

    public function index(Request $request)
    {
        $this->user = Auth::user();

        $type = $request->input('type', 'news');
        $startDate = Carbon::parse($request->input('startDate', now()->subDays(7)->toDateString()));
        $endDate = Carbon::parse($request->input('endDate', now()->toDateString()));

        return Inertia::render('Client/Dashboard', [
            'global_chart' => fn() => $this->globalChart($type, $startDate, $endDate),
            'total_chart' => fn() => $this->totalTopic($type, $startDate, $endDate),
            'sentiment_chart' => fn() => $this->sentiment($type, $startDate, $endDate),
            'wordcloud_caption' => fn() => $this->wordCloud($type, $startDate, $endDate),
        ]);
    }
}
