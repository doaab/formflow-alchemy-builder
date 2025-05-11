<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaServiceProvider extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function stores()
    {
        return $this->hasMany(Store::class);
    }


    public function subscriptions()
    {
        return $this->hasMany(WaSubscriptions::class);
    }


}
