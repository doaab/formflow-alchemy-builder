<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlertUsersReview extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function storesSectionsReview()
    {
        return $this->belongsTo(StoresSectionsReview::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
