<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserKeywordOld extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user_keywords_old';

    protected $fillable = [
        'id_user_target',
        'keyword',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function socmed()
    {
        return $this->belongsTo(SocialMedia::class, 'id_socmed');
    }
}
