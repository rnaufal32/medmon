<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsSource extends Model
{
    use SoftDeletes;

    protected $table = 'news_source';

    // Relasi ke MediaNews
    public function mediaNews()
    {
        return $this->hasMany(MediaNews::class, 'source', 'site');
    }

    protected $fillable = [
        'name',
        'site',
        'type',
        'category',
        'viewership',
        'pr_value',
        'ad_value',
        'tier',
        'created_at',
        'updated_at',
    ];
}
