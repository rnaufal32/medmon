<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocialPost extends Model
{
    use SoftDeletes;


    protected $fillable = [
        'id_user',
        'keyword',
        'id_socmed',
        'username',
        'caption',
        'hashtags',
        'date',
        'url',
        'sentiment',
        'created_at',
        'updated_at',
        'likes',
        'comments',
        'views',
        'title',
        'author',
        'date_custom',
        'id_user_target',
        'spookperson',
    ];

    public function target()
    {
        return $this->belongsTo(UserTarget::class, 'id_user_target', 'id');
    }

    public function socialMedia()
    {
        return $this->belongsTo(SocialMedia::class, 'id_socmed', 'id');
    }
}
