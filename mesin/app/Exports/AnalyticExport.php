<?php

namespace App\Exports;

use DB;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AnalyticExport implements FromCollection, WithHeadings
{
    protected $user;
    protected $type;
    protected $target;
    protected $sentiment;
    protected $startDate;
    protected $endDate;
    protected $platformIDs;
    protected $sortColumn;
    protected $sortBy;



    public function __construct($user, $type = 'News', $target, $sentiment, $startDate = null, $endDate = null, $platformIDs = [], $sortColumn, $sortBy) {
        $this->user         = $user;
        $this->type         = $type;
        $this->target       = $target;
        $this->sentiment    = $sentiment;
        $this->startDate    = $startDate;
        $this->endDate      = $endDate;
        $this->platformIDs  = $platformIDs;
        $this->sortColumn   = $sortColumn;
        $this->sortBy       = $sortBy;
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
                ->leftJoin('social_media', 'media_news.type', '=', 'social_media.id')
                ->selectRaw('CAST(media_news.date as DATETIME) as date, media_news.title, media_news.summary, social_media.name, media_news.sentiment, media_news.images, media_news.url, media_news.journalist')
                ->whereNotNull('media_news.date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($this->target), function($query) {
                    return $query->where('target_type.id', $this->target);
                })
                ->when(!empty($this->sentiment), function($query) {
                    return $query->where('media_news.sentiment', $this->sentiment);
                })
                ->when(count($this->platformIDs) > 0, function($query) {
                    return $query->whereIn('media_news.type', $this->platformIDs);
                })
                ->whereDate('media_news.date', '>=', $this->startDate)
                ->whereDate('media_news.date', '<=', $this->endDate)
                ->orderBy($this->sortColumn, $this->sortBy)
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
                ->selectRaw('CAST(social_posts.date as DATETIME) as date, social_posts.caption, social_posts.username, social_posts.hashtags, social_posts.likes, social_posts.comments, social_posts.views, social_posts.url, social_posts.sentiment, social_media.name')
                ->whereNotNull('social_posts.date')
                ->when(!empty($this->target), function($query)  {
                    return $query->where('target_type.id', $this->target);
                })
                ->when(!empty($this->sentiment), function($query)  {
                    return $query->where('social_posts.sentiment', $this->sentiment);
                })
                ->when(count($this->platformIDs) > 0, function($query)  {
                    return $query->whereIn('social_posts.id_socmed', $this->platformIDs);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('social_posts.date', '>=', $this->startDate)
                ->whereDate('social_posts.date', '<=', $this->endDate)
                ->orderBy($this->sortColumn, $this->sortBy)
                ->get();
                
                $result = $globalAnalytic->filter(function($row) {
                    return validateDate($row->date);
                })->values();
        }

        return $result;
    }

    public function headings(): array {
        if ($this->type == "News") {
            return ['Date','Title','Summary', 'Tipe', 'Sentiment','Image URL','URL','Journalist'];
        } else {
            return ['Date','Caption','Username','Hashtags','Likes','Comments','Views','Url','Sentiment', 'Social Media'];
        }
    }
}
