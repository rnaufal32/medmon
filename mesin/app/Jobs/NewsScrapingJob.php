<?php

namespace App\Jobs;

use App\Models\MediaNews;
use App\Models\MediaUserTarget;
use App\Models\NewsSource;
use App\Models\ScrapingData;
use App\Models\SocialPost;
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
        $this->params['crawler']->update([
            'status' => 'process'
        ]);

        $res = Http::timeout(24 * 60 * 60)->post('http://127.0.0.1:5000/news', [
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

                    NewsSource::firstOrCreate([
                        'name' => $item['source'],
                        'site' => $item['source'],
                    ], [
                        'type' => '6',
                        'category' => 'General',
                        'viewership' => '0',
                        'pr_value' => '0',
                        'ad_value' => '0',
                        'tier' => '3',
                    ]);

                    $media = MediaNews::updateOrCreate([
                        'url' => $item['url'],
                    ], [
                        'source' => $item['source'],
                        'date' => $item['date'],
                        'type' => $item['type'],
                        'title' => $item['title'],
                        'content' => $item['content'],
                        'summary' => $item['summary'],
                        'images' => $item['images'],
                        'sentiment' => $item['sentiment'],
                        'journalist' => $item['journalist'],
                        'spookerperson' => $item['spookerperson'],
                        'status' => $item['status'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    if (!empty($item['relevant'])) {
                        foreach ($item['relevant'] as $target) {
                            MediaUserTarget::updateOrCreate([
                                'id_news' => $media->id,
                                'id_user_target' => $target,
                            ]);
                        }
                    }

                }

                $this->params['crawler']->update([
                    'status' => 'complete'
                ]);

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
