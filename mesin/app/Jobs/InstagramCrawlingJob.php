<?php

namespace App\Jobs;

use App\Models\CrawlerDetailJob;
use App\Models\MediaNews;
use App\Models\MediaUserTarget;
use App\Models\ScrapingData;
use App\Models\SocialPost;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InstagramCrawlingJob implements ShouldQueue
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
        $res = Http::timeout(24 * 60 * 60)->post(env('CRAWLER_URL') . '/instagram', [
            'url' => $this->params['crawler']['url'],
            'targets' => $this->params['targets'],
        ]);

        if ($res->ok()) {
            $json = $res->json();

            if ($json['status'] == "ok") {
                $data = $json['data'];

                foreach ($data as $item) {
                    if (!empty($item['relevant'])) {
                        $media = SocialPost::firstOrCreate([
                            'url' => $item['url'],
                        ], [
                            'created_at' => now(),
                            'updated_at' => now(),
                            'id_user_target' => $item['relevant'],
                            'keyword' => '',
                            'id_socmed' => '1',
                            'caption' => $item['caption'],
                            'comments' => $item['comments'],
                            'date' => $item['date'],
                            'hashtags' => $item['hashtags'],
                            'images' => $item['images'],
                            'likes' => $item['likes'],
                            'sentiment' => $item['sentiment'],
                            'url' => $item['url'],
                            'username' => $item['username'],
                            'views' => $item['views'],
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
        } else {
            $this->params['crawler']->update([
                'status' => 'blocked'
            ]);
        }
    }
}
