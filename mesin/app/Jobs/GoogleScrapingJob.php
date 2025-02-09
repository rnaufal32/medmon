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

        $res = Http::timeout(24 * 60 * 60)->post('http://127.0.0.1:5000/google', $this->search);

        if ($res->ok()) {
            $data = $res->json();
            $status = $data['status'];
            $urls = $data['data'];
            $dataset = $data['dataset'];

            if ($status != 'ok') {
                return;
            }

            foreach ($urls as $url) {
                if (preg_match('/facebook|instagram|tiktok|threads|twitter|x\.com|youtube/', $url['url'])) {
                    $type = 'sosmed';
                } else {
                    $type = 'media';
                }
                CrawlerDetailJob::firstOrCreate(
                    ['url' => $url['url']],
                    ['id_crawler' => $crawler['id'], 'type' => $type, 'status' => 'pending', 'title' => $url['title'], 'description' => $url['description'],]
                );
            }

            $crawler->update([
                'status' => 'complete',
                'dataset' => $dataset,
            ]);
        } else {
            $crawler->update([
                'status' => 'failed',
                'dataset' => 'EMPTY',
            ]);
        }
    }
}
