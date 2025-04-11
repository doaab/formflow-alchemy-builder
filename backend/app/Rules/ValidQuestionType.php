<?php

namespace App\Rules;

use App\Models\QuestionType;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidQuestionType implements ValidationRule
{
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = QuestionType::where('slug', $value)
            ->where('is_active', true)
            ->exists();

        if (!$exists) {
            $fail('The selected question type is invalid or inactive.');
        }
    }
}
