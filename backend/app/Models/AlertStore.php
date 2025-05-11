<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlertStore extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }


    public function super_admin()
    {
        return $this->belongsTo(SuperAdmin::class);
    }
}
