
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow all requests for now, we'll implement proper authorization later
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status' => 'sometimes|in:draft,published,paused',
            'is_published' => 'sometimes|boolean',
            'theme' => 'sometimes|string|max:50',
            'collect_email' => 'sometimes|boolean',
            'one_response_per_user' => 'sometimes|boolean',
            'show_progress_bar' => 'sometimes|boolean',
            'shuffle_questions' => 'sometimes|boolean',
            'elements' => 'sometimes|array',
            'elements.*.type' => 'sometimes|string',
            'elements.*.label' => 'sometimes|string',
            'elements.*.required' => 'sometimes|boolean',
            'elements.*.options' => 'sometimes|array',
        ];
    }
}
