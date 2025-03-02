<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserValue extends Model
{
    protected $table = 'user_values';

    public function user()
    {
        return $this->hasOneThrough(User::class, 'id_user');
    }
}
