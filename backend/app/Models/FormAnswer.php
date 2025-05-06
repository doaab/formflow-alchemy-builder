
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
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'value' => 'string', // We'll handle JSON conversion in accessors and mutators
    ];

    /**
     * Get the form response that this answer belongs to.
     */
    public function formResponse()
    {
        return $this->belongsTo(FormResponse::class);
    }

    /**
     * Get the form element that this answer is for.
     */
    public function formElement()
    {
        return $this->belongsTo(FormElement::class);
    }
    
    /**
     * Getter for value that handles JSON values
     */
    public function getValueAttribute($value)
    {
        if (is_string($value) && $this->isJson($value)) {
            return json_decode($value);
        }
        return $value;
    }
    
    /**
     * Setter for value that handles arrays
     */
    public function setValueAttribute($value)
    {
        if (is_array($value) || is_object($value)) {
            $this->attributes['value'] = json_encode($value);
        } else {
            $this->attributes['value'] = $value;
        }
    }
    
    /**
     * Check if a string is valid JSON
     */
    private function isJson($string) 
    {
        if (!is_string($string)) {
            return false;
        }
        
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
