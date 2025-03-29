<?php

namespace App\Jobs;

use App\Models\MediaNews;
use App\Models\MediaUserTarget;
use App\Models\NewsSource;
use App\Models\ScrapingData;
use App\Models\SocialPost;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsScrapingJob implements ShouldQueue
{
    use Queueable;

    public $params;

    public $timeout = 24 * 60 * 60;

    /**
     * Create a new job instance.
     */
    public function __construct($params)
    {
        $this->params = $params;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        activity()->disableLogging();

        $this->params['crawler']->update([
            'status' => 'process'
        ]);

        $res = Http::timeout(24 * 60 * 60)->post(env('CRAWLER_URL') . '/news', [
            'urls' => [
                $this->params['crawler']->url,
            ],
            'targets' => $this->params['targets'],
        ]);

        if ($res->ok()) {
            $json = $res->json();

            if ($json['status'] == "OK") {
                $data = $json['data'];

                foreach ($data as $item) {

                    if ($item['status'] == 'complete') {

                        if (!empty($item['relevant'])) {
                            $newsSource = NewsSource::firstOrCreate([
                                'site' => $item['source'],
                            ], [
                                'name' => $item['source'],
                                'type' => '6',
                                'category' => 'General',
                                'viewership' => '0',
                                'pr_value' => '0',
                                'ad_value' => '0',
                                'tier' => '3',
                            ]);

                            $media = MediaNews::firstOrCreate([
                                'url' => $item['url'],
                            ], [
                                'source' => $item['source'],
                                'date' => $item['date'],
                                'type' => 6,
                                'title' => $item['title'],
                                'content' => $item['content'],
                                'summary' => $item['summary'],
                                'images' => $item['images'],
                                'sentiment' => $item['sentiment'],
                                'journalist' => $item['journalist'],
                                'spookerperson' => $item['spookerperson'] ?? 'N/A',
                                'status' => $item['status'],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);

                            if ($newsSource != null && (Carbon::parse($newsSource->created_at)->isToday() || !Carbon::parse($newsSource->updated_at)->isToday())) {
                                NewsViewershipJobs::dispatch($newsSource->site);
                            }

                            foreach ($item['relevant'] as $target) {
                                MediaUserTarget::firstOrCreate([
                                    'id_news' => $media->id,
                                ], [
                                    'id_user_target' => $target,
                                ]);
                            }
                        }

                        $this->params['crawler']->update([
                            'status' => 'complete'
                        ]);

                    } else {
                        $this->params['crawler']->update([
                            'status' => 'blocked'
                        ]);
                    }

                }

            } else {
                $this->params['crawler']->update([
                    'status' => 'failed'
                ]);
            }
        } else {
            $this->params['crawler']->update([
                'status' => 'failed'
            ]);
        }
    }
}
