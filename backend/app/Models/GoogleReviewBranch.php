<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoogleReviewBranch extends Model
{
    use HasFactory;

    
    protected $guarded = [];


    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'branches' => ['required'],
        'branches.*' => ['required'],
        // '*.name' => ['required'],
        // '*.address' => ['required'],
        // '*.lat' => ['required'],
        // '*.lng' => ['required'],
        // '*.place_id' => ['required'],
        // '*.image_license' => ['required'],
    ];
}
