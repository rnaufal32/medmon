<?php

namespace App\Exports;

use App\Models\BlockWord;
use App\Models\SocialPost;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use WordCounter\WordCounter;

class WordCloudExport implements FromCollection, WithHeadings
{
    protected $user;
    protected $startDate;
    protected $endDate;

    public function __construct($user, $startDate, $endDate) {
        $this->user         = $user;
        $this->startDate    = $startDate;
        $this->endDate      = $endDate;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $skipWords = BlockWord::all()->pluck('name')->toArray();
        $socialCaption = SocialPost::query()
            ->join('user_targets', 'user_targets.id', '=', 'social_posts.id_user_target')
            ->where('user_targets.id_user', $this->user->id)
            ->whereDate('date', '>=', $this->startDate->toDateString())
            ->whereDate('date', '<=', $this->endDate->toDateString())
            ->get();
        $captionWordCloud = new WordCounter($socialCaption->pluck('caption')->join(''));
        $captionWordCloud->skipWords($skipWords);
        $captionWordCloud = $captionWordCloud->get();
        $captionWordCloud = array_map(function ($key, $value) {
            return [
                'text' => $key,
                'value' => $value
            ];
        }, array_keys($captionWordCloud), $captionWordCloud);

        return collect($captionWordCloud);
    }

    public function headings(): array {
        return ["Text", 'Count'];
    }
}
