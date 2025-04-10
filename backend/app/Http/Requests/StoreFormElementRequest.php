
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\ValidQuestionType;

class StoreFormElementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'element_id' => 'required|string|unique:form_elements,element_id',
            'type' => ['required', 'string', new ValidQuestionType],
            'label' => 'required|string|max:255',
            'placeholder' => 'nullable|string',
            'default_value' => 'nullable|string',
            'required' => 'boolean',
            'order' => 'integer|min:0',
            
            // Type-specific properties
            'confirm_email' => 'boolean|nullable',
            'max_stars' => 'integer|min:1|max:10|nullable',
            
            // Address properties
            'address_expanded' => 'boolean|nullable',
            'address_street1' => 'boolean|nullable',
            'address_street2' => 'boolean|nullable',
            'address_city' => 'boolean|nullable',
            'address_state' => 'boolean|nullable',
            'address_zipcode' => 'boolean|nullable',
            'address_country' => 'boolean|nullable',
            
            // Phone properties
            'default_country' => 'nullable|string|size:2',
            'allowed_countries' => 'nullable|array',
            'allowed_countries.*' => 'string|size:2',
            
            // Section properties
            'description' => 'nullable|string',
            
            // Conditional logic
            'conditional_logic_enabled' => 'boolean',
            'conditional_action' => 'nullable|in:show,hide',
            'conditional_logic_gate' => 'nullable|in:all,any',
            
            // Options for choice fields
            'options' => 'nullable|array',
            'options.*.option_id' => 'required|string',
            'options.*.label' => 'required|string',
            'options.*.value' => 'required|string',
            'options.*.order' => 'integer|min:0',
            
            // Conditional rules
            'conditional_rules' => 'nullable|array',
            'conditional_rules.*.question_id' => 'required|string|exists:form_elements,element_id',
            'conditional_rules.*.operator' => 'required|in:equals,not_equals,contains,not_contains,greater_than,less_than',
            'conditional_rules.*.value' => 'required|string',
            
            // Additional properties
            'properties' => 'nullable|json',
        ];
    }
}
