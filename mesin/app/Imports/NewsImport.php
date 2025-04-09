<?php

namespace App\Imports;

use App\Jobs\NewsScrapingJob;
use App\Models\CrawlerDetailJob;
use App\Models\CrawlerJob;
use App\Models\MediaNews;
use App\Models\MediaUserTarget;
use App\Models\SocialMedia;
use App\Models\UserTarget;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class NewsImport implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {

        $crawler = CrawlerJob::create([
            'search' => 'import-news',
            'status' => 'process',
        ]);

        $keywords = UserTarget::query()
            ->whereIn('id_user', [5, 6])
            ->get();

        foreach ($collection as $row) {
            // Skip the first row (header)
            if ($row[0] == 'User') {
                continue;
            }

            // Process each row
            $data = [
                'user' => $row[0],
                'date' => $row[1],
                'target_type' => $row[2],
                'target' => $row[3],
                'media' => $row[4],
                'title' => $row[5],
                'content' => $row[6],
                'site' => $row[7],
                'url' => $row[8],
                'sentiment' => $row[9],
            ];

            if (strtolower($data['media']) == 'online') {
                $crawlerDetail = CrawlerDetailJob::firstOrCreate(
                    ['url' => $data['url']],
                    ['id_crawler' => $crawler->id, 'type' => 'media', 'status' => 'pending', 'title' => $data['title'], 'description' => 'import',]
                );

                NewsScrapingJob::dispatch([
                    'crawler' => $crawlerDetail,
                    'targets' => $keywords
                ]);
            } else {
                $mediaType = SocialMedia::where('name', 'like', $data['media'])
                    ->first();

                if ($mediaType) {
                    $news = MediaNews::create([
                        'source' => $data['site'],
                        'date' => $data['date'],
                        'title' => $data['title'],
                        'content' => $data['content'],
                        'summary' => '',
                        'url' => '',
                        'images' => $data['url'],
                        'sentiment' => $data['sentiment'],
                        'journalist' => '',
                        'spookerperson' => '',
                        'type' => $mediaType->id,
                        'publisher' => '',
                        'page' => '',
                        'ad' => 0,
                        'pr' => 0,
                        'reach' => 0,
                        'created_at' => now()->toDateTimeString(),
                        'updated_at' => now()->toDateTimeString(),
                    ]);

                    $target = UserTarget::where('name', 'like', $data['target'])
                        ->first();

                    if ($target) {
                        MediaUserTarget::create([
                            'id_news' => $news->id,
                            'id_user_target' => $target->id,
                        ]);
                    }
                }
            }
        }

    }
}
