<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExcelExport;
use App\Exports\ImportNewsSample;
use App\Http\Controllers\Controller;
use App\Models\MediaNews;
use App\Models\MediaUserTarget;
use App\Models\User;
use App\Models\UserTarget;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
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
            ->join('user_values', 'user_values.id_user', '=', 'ut.id_user')
            ->select(
                DB::raw('DATE(mn.date) AS date'),
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
            ->whereBetween(DB::raw('DATE(mn.date)'), [Carbon::parse($startDate)->toDateString(), Carbon::parse($endDate)->toDateString()])
            ->where('ut.id_user', $user)
            ->where('user_values.tier', '=', DB::raw('ns.tier'))
            ->whereNull('mn.deleted_at')
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
        $search = $request->input('search');
        $user = $request->input('user');
        $dateStart = $request->input('dateStart');
        $dateEnd = $request->input('dateEnd');

        return Inertia::render('Admin/News/Index')
            ->with([
                'news' => fn() => MediaNews::with(['newsSource', 'userTargets.userTarget.user.userValue'])
                    // Filter tanggal dengan when, lebih sederhana
                    ->when(!empty($dateStart) && !empty($dateEnd), function ($query) use ($dateStart, $dateEnd) {
                        return $query->whereDate('media_news.date', '>=', Carbon::parse($dateStart)->toDateString())
                            ->whereDate('media_news.date', '<=', Carbon::parse($dateEnd)->toDateString());
                    }, function ($query) {
                        return $query->whereDate('media_news.date', '>=', now()->subDays(7)->toDateString())
                            ->whereDate('media_news.date', '<=', now()->toDateString());
                    })
                    // Filter user tetap sama
                    ->when($user, function ($query, $user) {
                        return $query->whereHas('userTargets.userTarget', function ($query) use ($user) {
                            $query->where('user_targets.id_user', $user);
                        });
                    }, function ($query) {
                        return $query->whereHas('userTargets.userTarget.user', function ($query) {
                            $query->where('users.status', 1);
                        });
                    })
                    // Perbaikan filter pencarian, pakai where(function) untuk mengelompokkan orWhere
                    ->when($search, function ($query, $search) {
                        return $query->where(function ($q) use ($search) {
                            $q->where('media_news.title', 'like', "%$search%")
                                ->orWhere('media_news.content', 'like', "%$search%");
                        });
                    })
                    ->orderByDesc('media_news.date')
                    ->orderByDesc('media_news.id')
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

    public function delete($id)
    {
        MediaNews::query()->where('id', $id)->delete();
        session()->flash('success', 'News Deleted');
    }

    public function crawling()
    {
        return Inertia::render('Admin/News/Crawling');
    }

    public function crawlingSubmit(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'url' => 'required|url',
        ]);

        if ($validate->errors()->count() > 0) {
            session()->flash('error', $validate->errors()->first());
            return Inertia::render('Admin/News/Crawling');
        }

        $news = MediaNews::query()
            ->where('url', 'like', '%' . $request->input('url') . '%')
            ->first();
        if ($news) {
            session()->flash('error', 'News already exist');
            return Inertia::render('Admin/News/Crawling');
        }

        $targets = UserTarget::with(['keyword', 'user'])
            ->whereHas('user', function ($query) {
                $query->whereIn('id', [5, 6]);
            })
            ->orderBy('user_targets.id_user')
            ->get();

        $res = Http::timeout(24 * 60 * 60)->post('https://89a7-2001-4858-aaaa-70-ec4-7aff-feca-274c.ngrok-free.app/news', [
            'urls' => [
                $request->input('url'),
            ],
            'targets' => $targets,
        ]);

        if ($res->ok()) {
            $json = $res->json();
            if ($json['status'] != 'OK') {
                session()->flash('error', 'Failed to crawl news');
                return Inertia::render('Admin/News/Crawling');
            }

            $data = $json['data'][0];

            return Inertia::render('Admin/News/Crawling', [
                'data' => $data,
                'targets' => $targets,
            ]);
        }

        session()->flash('error', 'Failed to crawl news');

        return Inertia::render('Admin/News/Crawling');
    }

    public function crawlingStore(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|string',
            'date' => 'required',
            'journalist' => 'required|string',
            'spookerperson' => 'required|string',
            'url' => 'required|url',
            'content' => 'required|string',
            'target_id' => 'required',
            'summary' => 'required|string',
            'sentiment' => 'required',
            'source' => 'required|string',
        ]);

        if ($validate->errors()->count() > 0) {
            session()->flash('error', $validate->errors()->first());
            return;
        }

        $news = MediaNews::firstOrCreate([
            'url' => $request->input('url'),
        ], [
            'source' => $request->input('source'),
            'date' => $request->input('date'),
            'type' => 6,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'summary' => $request->input('summary'),
            'images' => $request->input('images'),
            'sentiment' => $request->input('sentiment'),
            'journalist' => $request->input('journalist'),
            'spookerperson' => $request->input('spookerperson'),
            'status' => 'complete',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        MediaUserTarget::updateOrCreate([
            'id_news' => $news->id,
            'id_user_target' => $request->input('target_id.value'),
        ]);

        session()->flash('success', 'News Created');

//        return redirect()->route('news.crawling');
    }
}
