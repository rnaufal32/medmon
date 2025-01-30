<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScrapingData extends Model
{
    protected $table = 'scraping_data';

    protected $fillable = [
        'url',
        'status',
        'data',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
