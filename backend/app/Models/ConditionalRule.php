<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConditionalRule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'form_element_id',
        'question_id',
        'operator',
        'value',
    ];

    /**
     * Get the form element that owns the rule.
     */
    public function formElement()
    {
        return $this->belongsTo(FormElement::class);
    }
}
