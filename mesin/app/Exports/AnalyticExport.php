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


    public function __construct($user, $type = 'News', $target, $sentiment, $startDate = null, $endDate = null, $platformIDs = []) {
        $this->user         = $user;
        $this->type         = $type;
        $this->target       = $target;
        $this->sentiment    = $sentiment;
        $this->startDate    = $startDate;
        $this->endDate      = $endDate;
        $this->platformIDs      = $platformIDs;
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
                ->selectRaw('media_news.date, media_news.title, media_news.summary, social_media.name, media_news.sentiment, media_news.images, media_news.url, media_news.journalist')
                ->whereNotNull('date')
                ->where('user_targets.id_user', $this->user->id)
                ->when(!empty($target), function($query) {
                    return $query->where('target_type.id', $this->target);
                })
                ->when(count($this->platformIDs) > 0, function($query) {
                    return $query->whereIn('media_news.type', $this->platformIDs);
                })
                ->whereDate('media_news.created_at', '>=', $this->startDate)
                ->whereDate('media_news.created_at', '<=', $this->endDate)
                ->get();

                $result = $globalAnalyticNews->filter(function($row) {
                    return validateDate($row->date);
                });
        }else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->leftJoin('social_media', 'social_posts.id_socmed', '=', 'social_media.id')
                ->selectRaw('social_posts.date, social_posts.caption, social_posts.username, social_posts.hashtags, social_posts.likes, social_posts.comments, social_posts.views, social_posts.url, social_posts.sentiment, social_media.name')
                ->whereNotNull('date')
                ->when(!empty($target), function($query) {
                    return $query->where('target_type.id', $this->target);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('social_posts.created_at', '>=', $this->startDate)
                ->whereDate('social_posts.created_at', '<=', $this->endDate)
                ->get();

                $result = $globalAnalytic->filter(function($row) {
                    return validateDate($row->date);
                });
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
