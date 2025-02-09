<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsSource extends Model
{
    use SoftDeletes;
    
    protected $table = 'news_source';

    protected $fillable = [
        'name',
        'site',
        'type',
        'category',
        'viewership',
        'pr_value',
        'ad_value',
        'created_at',
        'updated_at',
    ];
}
