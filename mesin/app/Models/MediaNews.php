<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MediaNews extends Model
{
    use SoftDeletes;

    protected $table = 'media_news';

    // Relasi ke MediaUserTarget
    public function userTargets()
    {
        return $this->hasMany(MediaUserTarget::class, 'id_news', 'id');
    }

    // Relasi ke NewsSource
    public function newsSource()
    {
        return $this->belongsTo(NewsSource::class, 'source', 'site');
    }

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
