<?php

namespace App\Http\Controllers;

use App\Jobs\FacebookScrapingJob;
use App\Jobs\GoogleScrapingJob;
use App\Jobs\InstagramCrawlingJob;
use App\Jobs\NewsScrapingJob;
use App\Jobs\NewsViewershipJobs;
use App\Jobs\TiktokScrapingJob;
use App\Jobs\YoutubeScrapingJob;
use App\Models\CrawlerDetailJob;
use App\Models\ScrapingData;
use App\Models\UserTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CrawlingController extends Controller
{

    public function googleV2(Request $request)
    {
        $type = $request->input('type', 'media');

        $targets = UserTarget::with(['keyword', 'user'])
            ->whereIn('id', [40, 41, 42, 43, 44, 45, 46, 47, 48, 54])
//            ->whereHas('user', function ($query) {
//                $query->whereIn('id', [5, 6]);
//            })
            ->orderBy('user_targets.id_user')
            ->get();

        foreach ($targets as $key => $target) {
            $roleName = $target->user->roles->pluck('name')->first();
            if ($type == 'media' && ($roleName == "User Media" || $roleName == "User Media Sosmed")) {
                GoogleScrapingJob::dispatch([
                    'search' => $target->keywords,
                    'targets' => $targets,
                    'type' => 'media'
                ]);
            }

            if ($type == 'sosmed' && ($roleName == "User Sosmed" || $roleName == "User Media Sosmed")) {
                GoogleScrapingJob::dispatch([
                    'search' => $target->keywords,
                    'targets' => $targets,
                    'type' => 'sosmed'
                ]);
            }

        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function newsV2(Request $request)
    {
        $crawlers = CrawlerDetailJob::query()
            ->whereIn('status', ['pending'])
            ->where('type', 'media')
            ->orderByDesc('id')
            ->get();

        $keywords = UserTarget::query()
            ->whereIn('id_user', [5, 6])
            ->get();

        $keywords = $keywords->toArray();

        foreach ($crawlers as $index => $crawler) {
            NewsScrapingJob::dispatch([
                'crawler' => $crawler,
                'targets' => $keywords
            ]);
        }

        return response()->json([
            'status' => 'ok',
            'jml' => $crawlers->count(),
        ]);
    }

    public function newsViewership()
    {
        $data = DB::table('news_source')
            ->where('viewership', '=', 0)
            ->get();

        foreach ($data as $item) {
            NewsViewershipJobs::dispatch($item->site);
        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function instagramScrape()
    {
        $crawlers = CrawlerDetailJob::query()
//            ->whereIn('id', [])
            ->whereIn('status', ['pending'])
            ->where('type', 'sosmed')
            ->where('url', 'like', '%instagram.com%')
            ->orderBy('id', 'asc')
            ->get();

        $keywords = UserTarget::query()
            ->whereIn('id_user', [6])
            ->get();

        $keywords = $keywords->toArray();

        foreach ($crawlers as $index => $crawler) {
            InstagramCrawlingJob::dispatch([
                'crawler' => $crawler,
                'targets' => $keywords
            ])->onQueue('instagram-crawling');
        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function tiktokScrape()
    {
        $crawlers = CrawlerDetailJob::query()
            ->whereIn('status', ['pending'])
            ->where('type', 'sosmed')
            ->where('url', 'like', '%tiktok%')
            ->orderByDesc('id')
            ->get();

        $keywords = UserTarget::query()
            ->whereIn('id_user', [6])
            ->get();

        $keywords = $keywords->toArray();

        foreach ($crawlers as $index => $crawler) {
            TiktokScrapingJob::dispatch([
                'crawler' => $crawler,
                'targets' => $keywords
            ])->onQueue('tiktok-crawling');
        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function facebookScrape()
    {
        $crawlers = CrawlerDetailJob::query()
            ->whereIn('status', ['pending'])
            ->where('type', 'sosmed')
            ->where('url', 'like', '%facebook%')
            ->orderByDesc('id')
            ->get();

        $keywords = UserTarget::query()
            ->whereIn('id_user', [6])
            ->get();

        $keywords = $keywords->toArray();

        foreach ($crawlers as $index => $crawler) {
            FacebookScrapingJob::dispatch([
                'crawler' => $crawler,
                'targets' => $keywords
            ])->onQueue('facebook-crawling');
        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function youtubeScrape()
    {
        $crawlers = CrawlerDetailJob::query()
//            ->whereIn('id', [])
            ->whereIn('status', ['pending'])
            ->where('type', 'sosmed')
            ->where('url', 'like', '%youtube.com%')
            ->orderBy('id', 'asc')
            ->get();

        $keywords = UserTarget::query()
            ->whereIn('id_user', [6])
            ->get();

        $keywords = $keywords->toArray();

        foreach ($crawlers as $index => $crawler) {
            YoutubeScrapingJob::dispatch([
                'crawler' => $crawler,
                'targets' => $keywords
            ])->onQueue('youtube-crawling');
        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

}
