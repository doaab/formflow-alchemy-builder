<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow all requests to store forms - we'll handle user association in the controller
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'nullable|string|max:255|unique:forms,slug',
            'theme' => 'nullable|string|max:50',
            'collect_email' => 'boolean',
            'one_response_per_user' => 'boolean',
            'show_progress_bar' => 'boolean',
            'shuffle_questions' => 'boolean',
            'user_id' => 'nullable|integer',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // If user is authenticated, use their ID
        if (auth()->check()) {
            $this->merge([
                'user_id' => auth()->id(),
            ]);
        }
        // Otherwise, we'll use the user_id from the request (which is validated above)
    }
}
