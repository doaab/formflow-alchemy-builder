<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaSubscriptionsFeatureDescription extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function subscriptions()
    {
        return $this->belongsTo(WaSubscriptions::class);
    }
}
