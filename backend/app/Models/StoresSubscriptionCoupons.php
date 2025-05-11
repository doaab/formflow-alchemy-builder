<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class StoresSubscriptionCoupons extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'store_id' => ['required'],
        'subscription_coupon_id' => ['required'],
    ];
}
