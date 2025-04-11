<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormAnswer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'form_response_id',
        'form_element_id',
        'value',
    ];

    /**
     * Get the response that owns the answer.
     */
    public function response()
    {
        return $this->belongsTo(FormResponse::class, 'form_response_id');
    }

    /**
     * Get the form element that this answer is for.
     */
    public function formElement()
    {
        return $this->belongsTo(FormElement::class);
    }
}
