<?php

namespace App\Exports;

use DB;
use Maatwebsite\Excel\Concerns\FromCollection;

class AnalyticExport implements FromCollection
{
    protected $type;
    protected $target;
    protected $sentiment;


    public function __construct($type, $target, $sentiment) {
        $this->type         = $type;
        $this->target       = $target;
        $this->sentiment    = $sentiment;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    
    public function collection()
    {
        $data = DB::table('media_news')->limit(10)->get();

        return $data;
    }
}
