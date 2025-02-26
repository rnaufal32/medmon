<?php

namespace App\Http\Controllers;

use App\Jobs\GoogleScrapingJob;
use App\Jobs\InstagramCrawlingJob;
use App\Jobs\NewsScrapingJob;
use App\Jobs\NewsViewershipJobs;
use App\Jobs\TiktokScrapingJob;
use App\Models\CrawlerDetailJob;
use App\Models\ScrapingData;
use App\Models\UserTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CrawlingController extends Controller
{

    public function googleV2(Request $request)
    {
        $targets = UserTarget::with(['keyword', 'user'])
            ->whereHas('user', function ($query) {
                $query->whereIn('id', [5, 6]);
            })
            ->orderBy('user_targets.id_user')
            ->get();

        foreach ($targets as $target) {
            $roleName = $target->user->roles->pluck('name')->first();
            if ($roleName == "User Media") {
                GoogleScrapingJob::dispatch([
                    'search' => $target->keywords,
                    'targets' => $targets,
                    'type' => 'media'
                ]);
            }
            if ($roleName == "User Sosmed") {
                GoogleScrapingJob::dispatch([
                    'search' => $target->keywords,
                    'targets' => $targets,
                    'type' => 'sosmed'
                ]);
            }
            if ($roleName == "User Media Sosmed") {
                GoogleScrapingJob::dispatch([
                    'search' => $target->keywords,
                    'targets' => $targets,
                    'type' => 'media'
                ]);
//                GoogleScrapingJob::dispatch([
//                    'search' => $target->keywords,
//                    'targets' => $targets,
//                    'type' => 'sosmed'
//                ]);
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
            'status' => 'ok'
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
            ->where('id', '=', '20894')
//            ->whereIn('status', ['pending'])
//            ->where('type', 'sosmed')
//            ->where('url', 'like', '%instagram%')
            ->orderByDesc('id')
            ->get();

        $keywords = UserTarget::query()
            ->whereIn('id_user', [6])
            ->get();

        $keywords = $keywords->toArray();

        $crawlers->chunk(20)->each(function ($chunk) use ($keywords) {
            foreach ($chunk as $crawler) {
                InstagramCrawlingJob::dispatch([
                    'crawler' => $chunk,
                    'targets' => $keywords
                ]);
            }
        });

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

        TiktokScrapingJob::dispatch([
            'crawler' => $crawlers,
            'targets' => $keywords
        ]);

        return response()->json([
            'status' => 'ok'
        ]);
    }
}
