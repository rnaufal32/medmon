<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Auth;
use DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AnalyticController extends Controller
{
    private $user;

    public function __construct() {
        $this->user = Auth::user();
    }

    public function index(Request $request) {
        $now = now();
        $startDate  = $request->input('start_date', $now->copy()->subDays(7));
        $endDate    = $request->input('end_date', $now);
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

        if ($source == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, media_news.sentiment')
                ->whereNotNull('date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('user_targets.type', $target);
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

                foreach ($dates as $dt) {
                    $result['datasets'][] = [
                        'label'     => $dt,
                        'data'      => $globalAnalyticNews->where('date_label', $dt)->count()
                    ];
                }
        }else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, sentiment, likes, comments, views')
                ->whereNotNull('date')
                ->when(!empty($target), function($query) use ($target) {
                    return $query->where('user_targets.type', $target);
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

                foreach ($dates as $dt) {
                    $result['datasets'][] = [
                        'label'     => $dt,
                        'data'      => $globalAnalytic->where('date_label', $dt)->count()
                    ];
                }
        }

        $result['labels'] = $dates;

        return [
            'chart'     => $result,
            'counts'    => $counts
        ];
    }
}