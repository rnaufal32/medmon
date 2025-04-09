<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;

class ImportNewsSample implements FromArray
{

    public $data = [];

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function array(): array
    {
        $headers = ["User", "Date", "Target Type", "Target", "Category", "Title", "Content", "Source", "URL", "Sentiment"];
        return array_merge([$headers], $this->data);
    }
}
