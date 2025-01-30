<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocialMediaScrap extends Model
{
    use HasFactory, SoftDeletes;

    public function userKeywords()
    {
        return $this->belongsTo(UserKeyword::class, 'keyword', 'keyword');
    }
}
