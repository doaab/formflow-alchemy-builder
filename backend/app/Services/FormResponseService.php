
<?php

namespace App\Services;

use App\Models\Form;
use App\Models\FormResponse;
use App\Models\FormAnswer;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FormResponseService
{
    /**
     * Get all responses for a form.
     */
    public function getResponsesByForm(Form $form)
    {
        return $form->responses()
            ->orderBy('created_at', 'desc')
            ->paginate(20);
    }

    /**
     * Create a new form response.
     */
    public function createResponse(Form $form, array $data, $completionTime = null)
    {
        DB::beginTransaction();

        try {
            $response = $form->responses()->create([
                'user_id' => $data['user_id'] ?? null,
                'ip_address' => $data['ip_address'] ?? null,
                'user_agent' => $data['user_agent'] ?? null,
                'respondent_email' => $data['respondent_email'] ?? null,
                'completion_time' => $completionTime,
            ]);

            // Create answers
            foreach ($data['answers'] as $answer) {
                // Get the form element by element_id
                $element = $form->elements()->where('element_id', $answer['element_id'])->first();

                if ($element) {
                    // Store the answer, handling arrays properly with JSON encoding
                    $response->answers()->create([
                        'form_element_id' => $element->id,
                        'value' => $answer['value'], // The model will automatically handle JSON encoding/decoding
                    ]);
                }
            }

            // Update analytics
            $this->updateResponseAnalytics($form, $data['answers']);

            DB::commit();
            return $response;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Get a response with all its answers.
     */
    public function getResponseWithAnswers(FormResponse $response)
    {
        return $response->load([
            'answers.formElement',
            'user'
        ]);
    }

    /**
     * Export form responses as CSV.
     */
    public function exportResponses(Form $form)
    {
        // Get all form elements ordered by their order
        $elements = $form->elements()
            ->orderBy('order')
            ->get();

        // Get all responses with their answers
        $responses = $form->responses()
            ->with('answers')
            ->orderBy('created_at', 'desc')
            ->get();

        $filename = 'form_responses_' . $form->id . '_' . date('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function() use ($responses, $elements) {
            $file = fopen('php://output', 'w');

            // Create headers row
            $headers = ['Response ID', 'Submitted At', 'Email', 'IP Address'];

            foreach ($elements as $element) {
                // Skip section and break elements
                if (!in_array($element->type, ['section', 'break'])) {
                    $headers[] = $element->label;
                }
            }

            fputcsv($file, $headers);

            // Add data rows
            foreach ($responses as $response) {
                $row = [
                    $response->id,
                    $response->created_at->format('Y-m-d H:i:s'),
                    $response->respondent_email,
                    $response->ip_address,
                ];

                $answersByElementId = [];
                foreach ($response->answers as $answer) {
                    $answersByElementId[$answer->form_element_id] = $answer->value;
                }

                foreach ($elements as $element) {
                    // Skip section and break elements
                    if (!in_array($element->type, ['section', 'break'])) {
                        $row[] = $answersByElementId[$element->id] ?? '';
                    }
                }

                fputcsv($file, $row);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }

    /**
     * Get response statistics.
     */
    public function getResponseStatistics(Form $form)
    {
        $totalResponses = $form->responses()->count();

        $responsesByDay = $form->responses()
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $avgCompletionTime = $form->responses()
            ->whereNotNull('completion_time')
            ->avg('completion_time');

        return [
            'total_responses' => $totalResponses,
            'responses_by_day' => $responsesByDay,
            'avg_completion_time' => round($avgCompletionTime),
        ];
    }

    /**
     * Update response analytics.
     */
    private function updateResponseAnalytics(Form $form, array $answers)
    {
        // Implementation for analytics update
        // This can be moved to a background job for better performance
        foreach ($answers as $answer) {
            // Skip empty answers
            if (empty($answer['value'])) {
                continue;
            }

            $element = $form->elements()->where('element_id', $answer['element_id'])->first();

            if ($element) {
                // Handle both array and scalar values for analytics
                if (is_array($answer['value'])) {
                    // For array values (like checkboxes), create an entry for each selected option
                    foreach ($answer['value'] as $selectedValue) {
                        $this->incrementAnswerCount($form->id, $answer['element_id'], $selectedValue);
                    }
                } else {
                    // For scalar values
                    $this->incrementAnswerCount($form->id, $answer['element_id'], $answer['value']);
                }
            }
        }
    }

    /**
     * Increment answer count in analytics
     */
    private function incrementAnswerCount($formId, $elementId, $value)
    {
        DB::table('form_response_analytics')
            ->updateOrInsert(
                [
                    'form_id' => $formId,
                    'element_id' => $elementId,
                    'answer_value' => (string) $value
                ],
                [
                    'count' => DB::raw('count + 1'),
                    'updated_at' => now()
                ]
            );
    }
}
