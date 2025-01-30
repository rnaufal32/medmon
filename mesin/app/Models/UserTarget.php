<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTarget extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function keyword()
    {
        return $this->hasMany(UserKeyword::class, 'id_user_target');
    }

    public function scrape()
    {
        return $this->hasMany(SocialPost::class, 'id_user_target');
    }
}
