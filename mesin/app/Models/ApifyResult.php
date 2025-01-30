<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApifyResult extends Model
{
    use SoftDeletes;

    protected $table = 'apify_result';

    public function userKeywords()
    {
        return $this->belongsTo(UserKeywordOld::class, 'keyword', 'keyword');
    }

    public function socmed()
    {
        return $this->belongsTo(SocialMedia::class, 'id_socmed', 'id');
    }
}
