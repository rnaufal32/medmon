<?php

namespace App\Exports;

use DB;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class AnalyticExport implements FromCollection
{
    protected $user;
    protected $type;
    protected $target;
    protected $sentiment;
    protected $startDate;
    protected $endDate;


    public function __construct($user, $type = 'News', $target, $sentiment, $startDate = null, $endDate = null) {
        $this->user         = $user;
        $this->type         = $type;
        $this->target       = $target;
        $this->sentiment    = $sentiment;
        $this->startDate    = $startDate;
        $this->endDate      = $endDate;
    }
    /**
    * @return \Illuminate\Support\Collection
    */

    public function collection()
    {
        $result = new Collection([]);
        if ($this->type == 'News') {
            $globalAnalyticNews = DB::table('media_news')
                ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, media_news.sentiment')
                ->whereNotNull('date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) {
                    return $query->where('target_type.id', $this->target);
                })
                ->whereDate('media_news.created_at', '>=', $this->startDate)
                ->whereDate('media_news.created_at', '<=', $this->endDate)
                ->get();

                $result = $globalAnalyticNews->filter(function($row) {
                    return validateDate($row->date_label);
                });
        }else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name, target_type.id, DATE(date) AS date_label, sentiment, likes, comments, views')
                ->whereNotNull('date')
                ->when(!empty($target), function($query) {
                    return $query->where('target_type.id', $this->target);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('social_posts.created_at', '>=', $this->startDate)
                ->whereDate('social_posts.created_at', '<=', $this->endDate)
                ->get();

                $result = $globalAnalytic->filter(function($row) {
                    return validateDate($row->date_label);
                });
        }

        return $result;
    }
}
