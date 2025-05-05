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
            $data['slug'] = Str::slug($data['title'] ?? 'untitled') . '-' . Str::random(8);
        }

        // Always ensure there's a user_id
        if (empty($data['user_id'])) {
            // Use the authenticated user's ID if available
            if (auth()->check()) {
                $data['user_id'] = auth()->id();
            } else {
                // Default to system user (ID 1) for anonymous forms
                $data['user_id'] = 1;
            }
        }

        // Set default status if not provided
        if (empty($data['status'])) {
            $data['status'] = 'draft';
        }

        // Keep is_published in sync with status
        $data['is_published'] = ($data['status'] === 'published');

        $form = Form::create($data);

        \Log::info("Form created with ID: " . $form->id);

        // Create elements if provided
        if (isset($data['elements']) && is_array($data['elements'])) {
            \Log::info("Creating " . count($data['elements']) . " elements for form " . $form->id);
            foreach ($data['elements'] as $index => $elementData) {
                $elementData['order'] = $index;
                $this->formElementService->createElement($form, $elementData);
            }
        }

        return $form->fresh();
    }

    /**
     * Update an existing form.
     */
    public function updateForm(Form $form, array $data)
    {
        DB::beginTransaction();

        try {
            // Ensure user_id is preserved
            if (!isset($data['user_id'])) {
                $data['user_id'] = $form->user_id;
            }
            
            // Set status if provided and keep is_published in sync
            if (isset($data['status'])) {
                $data['is_published'] = ($data['status'] === 'published');
            } elseif (isset($data['is_published'])) {
                $data['status'] = $data['is_published'] ? 'published' : 'draft';
            }

            // Update basic form data
            $form->update([
                'title' => $data['title'] ?? $form->title,
                'description' => $data['description'] ?? $form->description,
                'user_id' => $data['user_id'],
                'theme' => $data['theme'] ?? $form->theme,
                'status' => $data['status'] ?? $form->status,
                'is_published' => $data['is_published'] ?? $form->is_published,
                'collect_email' => $data['collect_email'] ?? $form->collect_email,
                'one_response_per_user' => $data['one_response_per_user'] ?? $form->one_response_per_user,
                'show_progress_bar' => $data['show_progress_bar'] ?? $form->show_progress_bar,
                'shuffle_questions' => $data['shuffle_questions'] ?? $form->shuffle_questions,
            ]);

            // Handle elements update if provided
            if (isset($data['elements']) && is_array($data['elements'])) {
                \Log::info("Updating elements for form " . $form->id . " with " . count($data['elements']) . " elements");
                
                // Delete all existing elements if we're doing a complete replacement
                $form->elements()->delete();

                // Create new elements
                foreach ($data['elements'] as $index => $elementData) {
                    $elementData['order'] = $index;
                    try {
                        $this->formElementService->createElement($form, $elementData);
                    } catch (\Exception $e) {
                        \Log::error("Error creating element: " . $e->getMessage());
                        \Log::error("Element data: " . json_encode($elementData));
                    }
                }
            }

            DB::commit();
            return $this->getFormWithElements($form->fresh());
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error("Error updating form: " . $e->getMessage());
            \Log::error("Form data: " . json_encode($data));
            throw $e;
        }
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
        $form = $form->load([
            'elements' => function ($query) {
                $query->orderBy('order');
            },
            'elements.options' => function ($query) {
                $query->orderBy('order');
            },
            'elements.conditionalRules',
        ]);
        
        \Log::info("Loaded form with " . $form->elements->count() . " elements");
        
        return $form;
    }

    /**
     * Get a form with all its elements for public display.
     */
    public function getFormWithElementsPublic(Form $form)
    {
        // Only include published forms
        if (!$form->is_published && !auth()->check()) {
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
        if (!auth()->check()) {
            unset($form->user_id);
        }

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
