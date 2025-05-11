<?php

namespace App\Models;

use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Contracts\Auth\Authenticatable; //implements
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use EloquentFilter\Filterable;
use App\ModelFilters\Store\StoresFilter;

class StoresCategories extends Model
{
    use HasFactory, Filterable;
    // TODO: use points instead of string in coordinate column.
    // use SpatialTrait;
    use HasApiTokens;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [

    ];

}
