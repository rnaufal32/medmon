<?php

namespace App\Jobs;

use App\Models\CrawlerDetailJob;
use App\Models\CrawlerJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class GoogleScrapingJob implements ShouldQueue
{
    use Queueable;

    public $search;

    public $timeout = 24 * 60 * 60;

    /**
     * Create a new job instance.
     */
    public function __construct($search)
    {
        $this->search = $search;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $crawler = CrawlerJob::create([
            'search' => $this->search['search'],
            'status' => 'process',
        ]);

        $res = Http::timeout(24 * 60 * 60)->post('https://0bbd-103-84-207-96.ngrok-free.app/google', $this->search);

        if ($res->ok()) {
            $data = $res->json();
            $status = $data['status'];
            $urls = $data['data'];

            if ($status != 'ok') {
                return;
            }

            foreach ($urls as $url) {
                if (preg_match('/facebook|instagram|tiktok|threads|twitter|x\.com|youtube/', $url['link'])) {
                    $type = 'sosmed';
                } else {
                    $type = 'media';
                }
                CrawlerDetailJob::firstOrCreate(
                    ['url' => $url['link']],
                    ['id_crawler' => $crawler['id'], 'type' => $type, 'status' => 'pending', 'title' => $url['title'], 'description' => $url['description'],]
                );
            }

            $crawler->update([
                'status' => 'complete',
                'dataset' => 'EMPTY',
            ]);
        } else {
            $crawler->update([
                'status' => 'failed',
                'dataset' => 'EMPTY',
            ]);
        }
    }
}
