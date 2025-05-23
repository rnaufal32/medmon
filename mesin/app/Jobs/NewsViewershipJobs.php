<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class NewsViewershipJobs implements ShouldQueue
{
    use Queueable;

    public $url;

    /**
     * Create a new job instance.
     */
    public function __construct($url)
    {
        $this->url = $url;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $res = Http::timeout(24 * 60 * 60)->post(env('CRAWLER_URL') . '/viewerShip', [
            'urls' => ["https://hypestat.com/info/" . $this->url],
        ]);

        if ($res->ok()) {
            $data = $res->json();

            if ($data['status'] == 'ok') {
                DB::table('news_source')
                    ->where('site', $this->url)
                    ->update([
                        'viewership' => $data['data']['viewership'],
                        'daily_reach' => $data['data']['daily'],
                        'updated_at' => now(),
                    ]);
            }
        }

        sleep(2);
    }
}
