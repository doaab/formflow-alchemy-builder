<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaServiceSubscriptions extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function service_provider()
    {
        return $this->belongsTo(WaServiceProvider::class);
    }

    public function subscriptions()
    {
        return $this->belongsTo(WaSubscriptions::class);
    }
}
