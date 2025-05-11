<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [];


    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}
