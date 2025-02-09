<?php

namespace App\Jobs;

use App\Models\CrawlerDetailJob;
use App\Models\SocialPost;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class TiktokScrapingJob implements ShouldQueue
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
        $res = Http::timeout(24 * 60 * 60)->post('http://127.0.0.1:5000/tiktok', [
            'url' => $this->params['crawler']->pluck('url'),
            'targets' => $this->params['targets'],
        ]);
        /*
         * Cek di news
         * cek di google search
         * penambahan di google alert
         * tribun news gak masuk
         * kebijakan ritel, toko ritel, pusat perbelanjaan, umkm
         * sbn gak masuk, tapi masukin aja lah wkwk
         */
        if ($res->ok()) {
            $json = $res->json();

            if ($json['status'] == "ok") {
                $data = $json['data'];

                foreach ($data as $item) {
                    if (!empty($item['relevant'])) {
                        $media = SocialPost::updateOrCreate([
                            'url' => $item['url'],
                        ], [
                            'created_at' => now()->toDateString(),
                            'updated_at' => now()->toDateString(),
                            'id_user_target' => $item['relevant'][0],
                            'keyword' => '',
                            'id_socmed' => '4',
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

                CrawlerDetailJob::query()
                    ->whereIn('url', $this->params['crawler']->pluck('url'))
                    ->where('status', 'pending')
                    ->update([
                        'status' => 'complete',
                    ]);

            } else {
                CrawlerDetailJob::query()
                    ->whereIn('url', $this->params['crawler']->pluck('url'))
                    ->where('status', 'pending')
                    ->update([
                        'status' => 'complete',
                    ]);
            }
        } else {
            CrawlerDetailJob::query()
                ->whereIn('url', $this->params['crawler']->pluck('url'))
                ->where('status', 'pending')
                ->update([
                    'status' => 'complete',
                ]);
        }
    }
}
