<?php

namespace App\Services;

use App\Models\Form;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FormService
{
    protected $formElementService;

    public function __construct(FormElementService $formElementService)
    {
        $this->formElementService = $formElementService;
    }

    /**
     * Create a new form.
     */
    public function createForm(array $data)
    {
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(8);
        }

        return Form::create($data);
    }

    /**
     * Update an existing form.
     */
    public function updateForm(Form $form, array $data)
    {
        $form->update($data);
        return $form;
    }

    /**
     * Delete a form.
     */
    public function deleteForm(Form $form)
    {
        return $form->delete();
    }

    /**
     * Get a form with all its elements.
     */
    public function getFormWithElements(Form $form)
    {
        $form->load([
            'elements' => function ($query) {
                $query->orderBy('order');
            },
            'elements.options' => function ($query) {
                $query->orderBy('order');
            },
            'elements.conditionalRules',
        ]);

        return $form;
    }

    /**
     * Get a form with all its elements for public display.
     */
    public function getFormWithElementsPublic(Form $form)
    {
        // Only include published forms
        if (!$form->is_published) {
            return null;
        }

        $form->load([
            'elements' => function ($query) {
                $query->orderBy('order');
            },
            'elements.options' => function ($query) {
                $query->orderBy('order');
            },
            'elements.conditionalRules',
        ]);

        // Remove any sensitive data
        unset($form->user_id);
        // Add other fields to unset if needed

        return $form;
    }

    /**
     * Get form analytics.
     */
    public function getFormAnalytics(Form $form)
    {
        $responseCount = $form->responses()->count();

        $completionTimeAvg = $form->responses()
            ->whereNotNull('completion_time')
            ->avg('completion_time');

        $completionTimeAvg = round($completionTimeAvg);

        $responsesByDate = DB::table('form_responses')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('form_id', $form->id)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Get most common answers for each question
        $elementAnswers = [];

        foreach ($form->elements as $element) {
            // Skip layout elements
            if (in_array($element->type, ['section', 'break'])) {
                continue;
            }

            $topAnswers = DB::table('form_answers')
                ->join('form_responses', 'form_answers.form_response_id', '=', 'form_responses.id')
                ->where('form_responses.form_id', $form->id)
                ->where('form_answers.form_element_id', $element->id)
                ->select('form_answers.value', DB::raw('count(*) as count'))
                ->groupBy('form_answers.value')
                ->orderByDesc('count')
                ->limit(5)
                ->get();

            $elementAnswers[$element->element_id] = [
                'question' => $element->label,
                'type' => $element->type,
                'top_answers' => $topAnswers
            ];
        }

        return [
            'total_responses' => $responseCount,
            'avg_completion_time' => $completionTimeAvg,
            'responses_by_date' => $responsesByDate,
            'element_answers' => $elementAnswers,
        ];
    }
}
