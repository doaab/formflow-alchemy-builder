<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use EloquentFilter\Filterable;
// use App\ModelFilters\Store\CouponsFilter;

class SubscriptionCoupons extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => ['required'],
        'code' => ['required'],
        'type_reduction' => ['required'],
        'stores' => ['required'],
        'available_quantity' => ['required'],
        'type_discount' => ['required'],
        'reduction' => ['required'],
        'start_date' => ['required'],
        'end_date' => ['required']
    ];
}
