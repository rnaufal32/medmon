<?php

namespace App\Http\Controllers\Client;

use App\Exports\AnalyticExport;
use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function reportView(Request $request)
    {
        $startDate = Carbon::parse($request->input('start_date', now()->toDateString()));
        $endDate = Carbon::parse($request->input('end_date', now()->toDateString()));
        $target = $request->input('target', null);
        $sentiment = $request->input('sentiment', null);
        $source = $request->input('source', 'News');
        $platforms = $request->input('platforms', '');
        $sortBy = $request->input('sort_by', 'desc');
        $sortColumn = $request->input('sort_column', 'date');
//        if ($startDate->diff($endDate)->d > 7) {
//            abort(500, 'Error');
//        }

        $startDate = $startDate->toDateString();
        $endDate = $endDate->toDateString();

        $allowedColumns = ['caption', 'username', 'hashtags', 'likes', 'comments', 'views', 'url', 'title', 'summary', 'name', 'sentiment', 'images', 'url', 'journalist'];

        if (collect($allowedColumns)->search($sortColumn)) {
            $sortColumn = 'date';
        }

        $platformIDs = [];
        if (!empty($platforms)) {
            $platformIDs = explode(',', $platforms);
        }

        $targets = DB::table('target_type')
            ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
            ->selectRaw('target_type.*')
            ->where('user_targets.id_user', $this->user->id)
            ->groupBy('target_type.id')
            ->get();

        if ($source == 'News') {
            $globalAnalyticNews = DB::table('user_targets as ut')
                ->join('media_user_target as mut', 'mut.id_user_target', '=', 'ut.id')
                ->join('media_news as mn', 'mn.id', '=', 'mut.id_news')
                ->leftJoin('news_source as ns', 'ns.site', '=', 'mn.source')
                ->join('target_type as tt', 'tt.id', '=', 'ut.type')
                ->join('user_values', 'user_values.id_user', '=', 'ut.id_user')
                ->select(
                    'mn.date',
                    'tt.name as target_type',
                    'ut.name as user_target',
                    'mn.title',
                    'mn.source',
                    'mn.url',
                    DB::raw('COALESCE(ns.tier, 3) as tier'),
                    'mn.sentiment',
                    'mn.summary',
                    'mn.spookerperson',
                    'mn.journalist',
                    DB::raw('user_values.ad as ad'),
                    DB::raw('user_values.pr as pr'),
                    DB::raw('COALESCE(ns.viewership, 0) as viewership')
                )
                ->where(function ($query) use ($startDate, $endDate) {
                    $query->whereBetween(DB::raw('DATE(mn.date)'), [$startDate, $endDate]);
                })
                ->where('user_values.tier', '=', DB::raw('ns.tier'))
                ->where('ut.id_user', $this->user->id)
                ->when(!empty($target), function ($query) use ($target) {
                    return $query->where('tt.id', $target);
                })
                ->when(!empty($sentiment), function ($query) use ($sentiment) {
                    return $query->where('mn.sentiment', $sentiment);
                })
                ->when(count($platformIDs) > 0, function ($query) use ($platformIDs) {
                    return $query->whereIn('mn.type', $platformIDs);
                })
                ->whereNull('mn.deleted_at')
                // ->orderBy($sortColumn, $sortBy)
                ->get();

            // $result = $globalAnalyticNews;
            $result = collect($globalAnalyticNews)->filter(function ($row) {
                return validateDate($row->date);
            })->values();
        } else {
            $globalAnalytic = DB::table('social_posts')
                ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
                ->join('target_type', 'user_targets.type', '=', 'target_type.id')
                ->join('social_media', 'social_posts.id_socmed', '=', 'social_media.id')
                ->selectRaw('CAST(social_posts.date as DATETIME) as date, target_type.name as target_name, user_targets.name as user_target_name, social_posts.caption, social_posts.username, social_posts.hashtags, social_posts.likes, social_posts.comments, social_posts.views, social_posts.url, social_posts.sentiment, social_media.name')
                ->whereNotNull('social_posts.date')
                ->when(!empty($target), function ($query) use ($target) {
                    return $query->where('target_type.id', $target);
                })
                ->when(!empty($sentiment), function ($query) use ($sentiment) {
                    return $query->where('social_posts.sentiment', $sentiment);
                })
                ->when(count($platformIDs) > 0, function ($query) use ($platformIDs) {
                    return $query->whereIn('social_posts.id_socmed', $platformIDs);
                })
                ->where('user_targets.id_user', $this->user->id)
                ->whereDate('social_posts.date', '>=', $startDate)
                ->whereDate('social_posts.date', '<=', $endDate)
                // ->orderBy($sortColumn, $sortBy)
                ->get();

            $result = $globalAnalytic->filter(function ($row) {
                return validateDate($row->date);
            })->values();
        }

        $result = collect($result)->sortBy($sortColumn, SORT_REGULAR, $sortBy == 'desc')->values();

        // return [
        //     'targets'   => $targets,
        //     'result'    => $result
        // ];

        $platforms = DB::table('social_media')
            ->where(function ($query) use ($source) {
                if ($source == 'News') {
                    $query->where('type', 'media');
                } else {
                    $query->where('type', 'sosmed');
                }
            })
            ->get();

        return Inertia::render('Client/Excel', [
            'targets' => $targets,
            'result' => $result,
            'platforms' => $platforms
        ]);
    }

    public function exportToExcel(Request $request)
    {
        $startDate = Carbon::parse($request->input('start_date', now()->subDays(7)->toDateString()));
        $endDate = Carbon::parse($request->input('end_date', now()->toDateString()));
        $target = $request->input('target', null);
        $sentiment = $request->input('sentiment', null);
        $source = $request->input('source', 'News');
        $platforms = $request->input('platforms', null);
        $format = $request->input('format', 'xlsx');

//        if ($startDate->diff($endDate)->d > 7) {
//            abort(500, 'Error');
//        }

        $startDate = $startDate->toDateString();
        $endDate = $endDate->toDateString();


        $sortBy = $request->input('sort_by', 'desc');
        $sortColumn = $request->input('sort_column', 'date');

        $allowedColumns = ['caption', 'username', 'hashtags', 'likes', 'comments', 'views', 'url', 'title', 'summary', 'name', 'sentiment', 'images', 'url', 'journalist'];

        if (collect($allowedColumns)->search($sortColumn)) {
            $sortColumn = 'date';
        }

        $platformIds = [];
        if (!empty($platforms)) {
            $platformIds = explode(',', $platforms);
        }

        $targetName = "";
        if ($target) {
            $targetName = DB::table('target_type')
                ->join('user_targets', 'user_targets.type', '=', 'target_type.id')
                ->selectRaw('target_type.name')
                ->where('user_targets.id_user', $this->user->id)
                ->where('target_type.id', $target)
                ->groupBy('target_type.id')
                ->first()->name;
        }

        if ($format === 'csv') {
            return Excel::download(new AnalyticExport($this->user, $source, $target, $sentiment, $startDate, $endDate, $platformIds, $sortColumn, $sortBy), "report-analytic-$startDate-$endDate-$targetName-$source-" . ($sentiment ? "$sentiment-" : "") . time() . ".csv", \Maatwebsite\Excel\Excel::CSV);
        }

        return Excel::download(new AnalyticExport($this->user, $source, $target, $sentiment, $startDate, $endDate, $platformIds, $sortColumn, $sortBy), "report-analytic-$startDate-$endDate-$targetName-$source-" . ($sentiment ? "$sentiment-" : "") . time() . ".xlsx", \Maatwebsite\Excel\Excel::XLSX);
    }
}
