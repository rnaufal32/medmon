<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MediaNews extends Model
{
    use SoftDeletes;

    protected $table = 'media_news';

    protected $fillable = [
        'url',
        'source',
        'summary',
        'date',
        'type',
        'title',
        'content',
        'images',
        'sentiment',
        'journalist',
        'spookerperson',
        'status',
        'publisher',
        'created_at',
        'updated_at',
        'type',
    ];

}
