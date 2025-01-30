<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaUserTarget extends Model
{
    protected $table = 'media_user_target';

    protected $fillable = [
        'id', 'id_news', 'id_user_target', 'status', 'created_at', 'updated_at'
    ];
}
