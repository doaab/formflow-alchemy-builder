
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFormRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('forms', 'slug')->ignore($this->route('form')),
            ],
            'theme' => 'nullable|string|max:50',
            'status' => 'sometimes|string|in:draft,published,paused',
            'collect_email' => 'boolean',
            'one_response_per_user' => 'boolean',
            'show_progress_bar' => 'boolean',
            'shuffle_questions' => 'boolean',
            'is_published' => 'boolean',
        ];
    }
}
