<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ImportNewsSample;
use App\Http\Controllers\Controller;
use App\Models\MediaNews;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                    ->orderByDesc('media_news.id')
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
                'last_update' => fn() => MediaNews::query()->orderByDesc('created_at')->first()->only(['created_at'])['created_at'],
            ]);
    }
}
