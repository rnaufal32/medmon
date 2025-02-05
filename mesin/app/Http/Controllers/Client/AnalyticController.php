<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticController extends Controller
{
    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }

    public function index(Request $request) {
        $startDate = Carbon::parse($request->input('start_date', now()->subDays(7)->toDateString()));
        $endDate = Carbon::parse($request->input('end_date', now()->toDateString()));
        $target     = $request->input('target', null);
        $source     = $request->input('source', 'News');

        $dates = collect([]);
        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $dates->push($currentDate->toDateString());
            $currentDate->addDay();
        }
        
        $result     = [
            'labels'     => '',
            'datasets'   => [],
        ];

        $counts = [
            'mention'   => '-',
            'like'      => '-',
            'comment'   => '-',
            'view'      => '-',
            'positive'  => '-',
            'negative'  => '-',
            'neutral'   => '-',
        ];

        $summaries = [];

        if ($source == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, media_news.sentiment')
                ->whereNotNull('date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->whereDate('media_news.created_at', '>=', $startDate->toDateString())
                ->whereDate('media_news.created_at', '<=', $endDate->toDateString())
                ->get();

                $globalAnalyticNews = $globalAnalyticNews->filter(function($row) {
                    return validateDate($row->date_label);
                });

                $counts['mention']  = $globalAnalyticNews->count();

                $counts['positive'] = $globalAnalyticNews->where('sentiment', 'positive')->count();
                $counts['negative'] = $globalAnalyticNews->where('sentiment', 'negative')->count();
                $counts['neutral']  = $globalAnalyticNews->where('sentiment', 'neutral')->count();

                $targetList = $globalAnalyticNews->groupBy('name')->keys();

                foreach ($targetList as $key => $t) {
                    foreach ($dates as $dt) {
                        $result['datasets'][$key]['label'] = $t;
                        $result['datasets'][$key]['data'][] = $globalAnalyticNews->where('name', $t)->where('date_label', $dt)->count();
                    }
                }
        }else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, sentiment, likes, comments, views')
                ->whereNotNull('date')
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('date', '>=', $startDate->toDateString())
                ->whereDate('date', '<=', $endDate->toDateString())
                ->get();

                $globalAnalytic = $globalAnalytic->filter(function($row) {
                    return validateDate($row->date_label);
                });

                $counts['mention']  = $globalAnalytic->count();

                $counts['positive'] = $globalAnalytic->where('sentiment', 'positive')->count();
                $counts['negative'] = $globalAnalytic->where('sentiment', 'negative')->count();
                $counts['neutral']  = $globalAnalytic->where('sentiment', 'neutral')->count();
                $counts['like']     = $globalAnalytic->sum('likes');
                $counts['comment']  = $globalAnalytic->sum('comments');
                $counts['view']     = $globalAnalytic->sum('views');

                $targetList = $globalAnalytic->groupBy('name')->keys();

                foreach ($targetList as $key => $t) {
                    foreach ($dates as $dt) {
                        $result['datasets'][$key]['label'] = $t;
                        $result['datasets'][$key]['data'][] = $globalAnalytic->where('name', $t)->where('date_label', $dt)->count();
                    }
                }
                
                foreach ($targetList as $key => $t) {
                    $summaries[] = [
                        'target' => $t,
                        'counts' => [
                            'positive' => $globalAnalytic->where('sentiment', 'positive')->where('name', $t)->count(),
                            'negative' => $globalAnalytic->where('sentiment', 'negative')->where('name', $t)->count(),
                            'neutral' => $globalAnalytic->where('sentiment', 'neutral')->where('name', $t)->count(),
                            'like' => $globalAnalytic->where('name', $t)->sum('likes'),
                            'comment' => $globalAnalytic->where('name', $t)->sum('comments'),
                            'view' => $globalAnalytic->where('name', $t)->sum('views'),
                        ]
                    ];
                }
        }

        $result['labels'] = $dates;
        $targets = DB::table('target_type')
                        ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
                        ->selectRaw('target_type.*')
                        ->where('user_targets.id_user', $this->user->id)
                        ->groupBy('target_type.id')
                        ->get();

            
        // return [
        //     'chart'     => $result,
        //     'summaries' => $summaries,
        //     'targets'   => $targets,
        // ];

        return Inertia::render('Client/Analytics', [
            'chart'     => $result,
            'summaries' => $summaries,
            'targets'   => $targets,
        ]);
    }
}