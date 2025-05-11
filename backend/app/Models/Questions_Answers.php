<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questions_Answers extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'questions__reviews_id' => 'integer',
        'answer' => 'string',
        'state' => 'string',
    ];

    public function question()
    {
        return $this->belongsTo(Questions_Reviews::class);
    }
}
