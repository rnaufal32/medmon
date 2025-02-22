<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaUserTarget extends Model
{
    protected $table = 'media_user_target';

    // Relasi ke MediaNews
    public function news()
    {
        return $this->belongsTo(MediaNews::class, 'id_news', 'id');
    }

    // Relasi ke UserTarget
    public function userTarget()
    {
        return $this->belongsTo(UserTarget::class, 'id_user_target', 'id');
    }

    protected $fillable = [
        'id', 'id_news', 'id_user_target', 'status', 'created_at', 'updated_at'
    ];
}
