<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTarget extends Model
{
    protected $casts = [
        'priority' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function keyword()
    {
        return $this->hasMany(UserKeyword::class, 'id_user_target');
    }

    public function scrape()
    {
        return $this->hasMany(SocialPost::class, 'id_user_target');
    }

    // Relasi ke MediaUserTarget
    public function mediaUserTargets()
    {
        return $this->hasMany(MediaUserTarget::class, 'id_user_target', 'id');
    }
}
