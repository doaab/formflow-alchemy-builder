<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaServiceSubscriptionsFeature extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function service_subscriptions()
    {
        return $this->belongsTo(WaServiceSubscriptions::class, 'wa_service_subscription_id');
    }

    public function feature()
    {
        return $this->belongsTo(WaFeature::class, 'wa_feature_id');
    }
}
