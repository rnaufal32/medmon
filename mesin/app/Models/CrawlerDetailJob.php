<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrawlerDetailJob extends Model
{
    protected $table = 'crawler_detail';

    protected $fillable = [
        'id',
        'id_crawler',
        'url',
        'type',
        'status',
        'title',
        'description',
        'created_at',
        'updated_at',
    ];

    public function job()
    {
        return $this->belongsTo(CrawlerJob::class, 'id_crawler', 'id');
    }
}
