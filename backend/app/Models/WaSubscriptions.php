<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaSubscriptions extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function service_provider()
    {
        return $this->belongsTo(WaServiceProvider::class);
    }
    public function serviceSubscriptions()
    {
        return $this->hasMany(WaServiceSubscriptions::class, 'wa_subscription_id');
    }

    public function featureDescriptions()
    {
        return $this->hasMany(WaSubscriptionsFeatureDescription::class, 'wa_subscription_id');
    }
}
