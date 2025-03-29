<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class NewsSource extends Model
{
    use SoftDeletes;

    protected $table = 'news_source';

    // Relasi ke MediaNews
    public function mediaNews()
    {
        return $this->hasMany(MediaNews::class, 'source', 'site');
    }

    public function userValue()
    {
        return $this->hasOne(UserValue::class, 'tier', 'tier');
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
        'daily_reach',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll();
    }
}
