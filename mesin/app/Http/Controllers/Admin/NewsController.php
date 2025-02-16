<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExcelExport;
use App\Exports\ImportNewsSample;
use App\Http\Controllers\Controller;
use App\Models\MediaNews;
use App\Models\MediaUserTarget;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class NewsController extends Controller
{

    public function importNews(Request $request)
    {
        sleep(3);
        session()->flash('message', 'Failed to import data. Please check your file and try again.');
    }

    public function importSample(Request $request)
    {
        $user = DB::table('users')
            ->join('user_targets', 'user_targets.id_user', '=', 'users.id')
            ->join('target_type', 'target_type.id', '=', 'user_targets.type')
            ->select('users.name', 'user_targets.name AS target', 'target_type.name AS target_type')
            ->where('users.id', $request->input('user'))
            ->first();

        return Excel::download(new ImportNewsSample([
            [
                $user->name, now()->toDateString(), $user->target_type, $user->target, "Online", "Title from news", "kompas.com", "https://kompas.com", "Neutral"
            ]
        ]), 'import-news-sample.xlsx');
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|string',
            'date' => 'required',
            'journalist' => 'required|string',
            'spookerperson' => 'required|string',
            'url' => 'required|url',
            'images' => 'required|url',
            'content' => 'required|string',
        ]);

        if ($validate->errors()->count() > 0) {
            session()->flash('error', $validate->errors()->first());
            return;
        }

        MediaNews::query()
            ->where('id', $request->input('id'))
            ->update([
                'title' => $request->input('title'),
                'date' => $request->input('date'),
                'journalist' => $request->input('journalist'),
                'spookerperson' => $request->input('spookerperson'),
                'url' => $request->input('url'),
                'images' => $request->input('images'),
                'content' => $request->input('content'),
            ]);

        MediaUserTarget::query()
            ->where('id_news', $request->input('id'))
            ->update([
                'id_user_target' => $request->input('target_id.value'),
            ]);

        session()->flash('success', 'News Updated');
    }

    public function exportNews(Request $request)
    {
        $startDate = $request->input('dateStart');
        $endDate = $request->input('dateEnd');
        $user = $request->input('user');

        $globalAnalyticNews = DB::table('user_targets as ut')
            ->join('media_user_target as mut', 'mut.id_user_target', '=', 'ut.id')
            ->join('media_news as mn', 'mn.id', '=', 'mut.id_news')
            ->leftJoin('news_source as ns', 'ns.site', '=', 'mn.source')
            ->join('target_type as tt', 'tt.id', '=', 'ut.type')
            ->select(
                DB::raw('DATE(mn.date) AS date'),
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
            ->whereBetween(DB::raw('DATE(mn.date)'), [Carbon::parse($startDate)->toDateString(), Carbon::parse($endDate)->toDateString()])
            ->where('ut.id_user', $user)
            ->orderBy('mn.date', 'desc')
            ->get();

        $export = new ExcelExport($globalAnalyticNews->toArray(), [
            'Date',
            'Target Type',
            'User Target',
            'Title',
            'Source',
            'URL',
            'Tier',
            'Sentiment',
            'Summary',
            'Spooker Person',
            'Journalist',
            'Ad Value',
            'PR Value',
            'Viewership'
        ]);

        return Excel::download($export, 'news-export.xlsx');
    }

    public function index(Request $request)
    {

        $user = $request->input('user');
        $dateStart = $request->input('dateStart');
        $dateEnd = $request->input('dateEnd');

        return Inertia::render('Admin/News/Index')
            ->with([
                'news' => fn() => DB::table('media_news')
                    ->join('media_user_target', 'media_user_target.id_news', '=', 'media_news.id')
                    ->join('user_targets', 'user_targets.id', '=', 'media_user_target.id_user_target')
                    ->join('users', 'users.id', '=', 'user_targets.id_user')
                    ->join('news_source', 'news_source.site', '=', 'media_news.source')
                    ->selectRaw('media_news.*, users.name AS username, user_targets.name AS target, user_targets.id AS target_id')
                    ->orderByDesc('media_news.date')
                    ->where(function ($query) use ($user, $dateEnd, $dateStart) {
                        if (!empty($user)) {
                            $query->where('users.id', $user);
                        }

                        if (!empty($dateStart) && !empty($dateEnd)) {
                            $query->whereDate('media_news.date', '>=', Carbon::parse($dateStart)->toDateString())
                                ->whereDate('media_news.date', '<=', Carbon::parse($dateEnd)->toDateString());
                        } else {
                            $query->whereDate('media_news.date', '>=', now()->subDays(7)->toDateString())
                                ->whereDate('media_news.date', '<=', now()->toDateString());
                        }
                    })
                    ->paginate(10),
                'users' => fn() => User::query()
                    ->where('status', '1')
                    ->where('type', 'client')
                    ->select('id', 'name')
                    ->get(),
                'user_targets' => fn() => DB::table('user_targets')
                    ->join('users', 'users.id', '=', 'user_targets.id_user')
                    ->select('user_targets.id', 'user_targets.name', 'users.name AS username')
                    ->where('users.status', '1')
                    ->orderBy('users.id')
                    ->get(),
                'last_update' => fn() => Carbon::parse(MediaNews::query()->orderByDesc('created_at')->first()->only(['created_at'])['created_at'])->format('d F Y H:i:s'),
            ]);
    }
}
