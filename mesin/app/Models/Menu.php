<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Menu extends Model
{
    use SoftDeletes;

    protected $appends = ['menu_all'];

    protected function menuAll(): Attribute
    {
        return new Attribute(
            get: function () {
                return explode(".", $this->attributes['route'])[0] . ".*";
            }
        );
    }
}
