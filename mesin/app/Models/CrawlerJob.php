<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrawlerJob extends Model
{
    protected $table = 'crawler_job';

    protected $fillable = [
        'search',
        'status',
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(CrawlerDetailJob::class, 'id_crawler', 'id');
    }
}
