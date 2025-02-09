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



    public function __construct($user, $type = 'News', $target, $sentiment, $startDate = null, $endDate = null, $platformIDs = [], $sortColumn = null, $sortBy = 'desc') {
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
            $globalAnalyticNews = DB::table('user_targets as ut')
                        ->join('media_user_target as mut', 'mut.id_user_target', '=', 'ut.id')
                        ->join('media_news as mn', 'mn.id', '=', 'mut.id_news')
                        ->leftJoin('news_source as ns', 'ns.site', '=', 'mn.source')
                        ->join('target_type as tt', 'tt.id', '=', 'ut.type')
                        ->select(
                            'mn.date',
                            'tt.name as target_type',
                            'ut.name as user_target',
                            'mn.title',
                            'mn.source',
                            'mn.url',
                            DB::raw('COALESCE(ns.tier, 0) as tier'),
                            'mn.sentiment',
                            'mn.summary',
                            'mn.spookerperson',
                            'mn.journalist',
                            DB::raw('COALESCE(ns.ad_value, 0) as ad'),
                            DB::raw('COALESCE(ns.pr_value, 0) as pr'),
                            DB::raw('COALESCE(ns.viewership, 0) as viewership')
                        )
                        ->where(function ($query) {
                            $query->whereBetween(DB::raw('DATE(mn.date)'), [$this->startDate, $this->endDate])
                                ->orWhereBetween(DB::raw('DATE(mn.created_at)'), [$this->startDate, $this->endDate]);
                        })
                        ->where('ut.id_user', $this->user->id)
                        ->when(!empty($this->target), function($query) {
                            return $query->where('tt.id', $this->target);
                        })
                        ->when(!empty($this->sentiment), function($query) {
                            return $query->where('mn.sentiment', $this->sentiment);
                        })
                        ->when(count($this->platformIDs) > 0, function($query) {
                            return $query->whereIn('mn.type', $this->platformIDs);
                        })
                        // ->orderBy($this->sortColumn, $this->sortBy)
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
                ->selectRaw('CAST(social_posts.date as DATETIME) as date, target_type.name as target_name, user_targets.name as user_target_name, social_posts.caption, social_posts.username, social_posts.hashtags, social_posts.likes, social_posts.comments, social_posts.views, social_posts.url, social_posts.sentiment, social_media.name')
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
                // ->orderBy($this->sortColumn, $this->sortBy)
                ->get();
                
                $result = $globalAnalytic->filter(function($row) {
                    return validateDate($row->date);
                })->values();
        }

        $result = collect($result)->sortBy($this->sortColumn, SORT_REGULAR, $this->sortBy == 'DESC');

        return $result;
    }

    public function headings(): array {
        if ($this->type == "News") {
            return ['Date','Type', 'Target', 'Title', 'Source', 'URL', 'Tier','Sentiment','Summary','Spokesperson', 'Journalist', 'AD', 'PR', 'Viewership'];
        } else {
            return ['Date','Type','Target','Caption','Username','Hashtags','Likes','Comments','Views','Url','Sentiment', 'Social Media'];
        }
    }
}
