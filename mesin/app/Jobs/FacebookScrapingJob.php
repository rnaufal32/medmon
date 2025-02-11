<?php

namespace App\Jobs;

use App\Models\SocialPost;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class FacebookScrapingJob implements ShouldQueue
{
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

        $res = Http::timeout(24 * 60 * 60)->post('http://127.0.0.1:5000/tiktok', [
            'url' => $this->params['crawler']->url,
            'targets' => $this->params['targets'],
        ]);

        if ($res->ok()) {
            $json = $res->json();

            if ($json['status'] == "ok") {
                $data = $json['data'];

                if (!empty($item['relevant'])) {
                    $media = SocialPost::updateOrCreate([
                        'url' => $data['url'],
                    ], [
                        'created_at' => now(),
                        'updated_at' => now(),
                        'id_user_target' => $data['relevant'][0],
                        'keyword' => '',
                        'id_socmed' => '4',
                        'caption' => $data['caption'],
                        'comments' => $data['comments'],
                        'date' => $data['date'],
                        'hashtags' => $data['hashtags'],
                        'images' => $data['images'],
                        'likes' => $data['likes'],
                        'sentiment' => $data['sentiment'],
                        'url' => $data['url'],
                        'username' => $data['username'],
                        'views' => $data['views'],
                    ]);

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
