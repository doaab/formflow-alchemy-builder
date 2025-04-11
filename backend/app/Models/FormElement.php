<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormElement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'form_id',
        'element_id',
        'type',
        'label',
        'placeholder',
        'default_value',
        'required',
        'order',
        'confirm_email',
        'max_stars',
        'address_expanded',
        'address_street1',
        'address_street2',
        'address_city',
        'address_state',
        'address_zipcode',
        'address_country',
        'default_country',
        'allowed_countries',
        'description',
        'conditional_logic_enabled',
        'conditional_action',
        'conditional_logic_gate',
        'properties',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'required' => 'boolean',
        'confirm_email' => 'boolean',
        'address_expanded' => 'boolean',
        'address_street1' => 'boolean',
        'address_street2' => 'boolean',
        'address_city' => 'boolean',
        'address_state' => 'boolean',
        'address_zipcode' => 'boolean',
        'address_country' => 'boolean',
        'allowed_countries' => 'json',
        'conditional_logic_enabled' => 'boolean',
        'properties' => 'json',
    ];

    /**
     * Get the form that owns the element.
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get the question type associated with this element.
     */
    public function questionType()
    {
        return $this->belongsTo(QuestionType::class, 'type', 'slug');
    }

    /**
     * Get the options for this element.
     */
    public function options()
    {
        return $this->hasMany(FormElementOption::class);
    }

    /**
     * Get the conditional rules for this element.
     */
    public function conditionalRules()
    {
        return $this->hasMany(ConditionalRule::class);
    }

    /**
     * Get the answers for this element.
     */
    public function answers()
    {
        return $this->hasMany(FormAnswer::class);
    }
}
