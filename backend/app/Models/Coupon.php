<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use EloquentFilter\Filterable;
use App\ModelFilters\Store\CouponsFilter;

class Coupon extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];


    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'message' => ['required'],
        'policy' => ['nullable']
    ];

    public function modelFilter()
    {
        return $this->provideFilter(CouponsFilter::class);
    }
}
