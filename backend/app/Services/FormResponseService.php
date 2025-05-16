<?php

namespace App\Services;

use App\Models\Form;
use App\Models\FormResponse;
use App\Models\FormAnswer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FormResponseService
{
    /**
     * Get all responses for a form with pagination
     */
    public function getResponsesByForm(Form $form, int $perPage = 10)
    {
        return $form->responses()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
    
    /**
     * Create a new form response
     */
    public function createResponse(Form $form, array $data, ?int $completionTime = null)
    {
        // Create the response
        $response = new FormResponse();
        $response->form_id = $form->id;
        $response->user_id = Auth::check() ? Auth::id() : null;
        $response->ip_address = request()->ip();
        $response->user_agent = request()->userAgent();
        $response->completion_time = $completionTime;
        $response->respondent_email = $data['email'] ?? null;
        $response->save();
        
        // Process the answers
        if (isset($data['answers']) && is_array($data['answers'])) {
            foreach ($data['answers'] as $elementId => $value) {
                try {
                    // Convert array values to JSON strings to prevent SQL errors
                    if (is_array($value)) {
                        $value = json_encode($value);
                    }
                    
                    // Create the answer
                    $answer = new FormAnswer();
                    $answer->form_response_id = $response->id;
                    $answer->form_element_id = $elementId;
                    $answer->value = $value;
                    $answer->save();
                } catch (\Exception $e) {
                    Log::error('Error saving form answer: ' . $e->getMessage() . ' for value: ' . json_encode($value));
                    // Continue saving other answers even if one fails
                }
            }
        }
        
        return $response;
    }
    
    /**
     * Get a response with its answers
     */
    public function getResponseWithAnswers(FormResponse $response)
    {
        try {
            $response->load(['answers.formElement']);
            
            // Add question text from the form element to each answer for easier frontend display
            foreach ($response->answers as $answer) {
                if ($answer->formElement) {
                    $answer->question = $answer->formElement->question;
                }
                
                // Process any JSON values for display
                if ($answer->value && $this->isJson($answer->value)) {
                    try {
                        $answer->value = json_decode($answer->value);
                    } catch (\Exception $e) {
                        // Keep as string if it can't be decoded
                        Log::error('Error decoding JSON value: ' . $e->getMessage());
                    }
                }
                
                // Make sure answer field is set for frontend compatibility
                if (!isset($answer->answer) && isset($answer->value)) {
                    $answer->answer = $answer->value;
                }
            }
            
            return $response;
        } catch (\Exception $e) {
            Log::error('Error in getResponseWithAnswers: ' . $e->getMessage());
            throw $e;
        }
    }
    
    /**
     * Export responses as CSV
     */
    public function exportResponses(Form $form)
    {
        $fileName = 'form_' . $form->id . '_responses_' . date('YmdHis') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ];
        
        $responses = $form->responses()->with('answers.formElement')->get();
        
        $callback = function() use ($responses) {
            $file = fopen('php://output', 'w');
            
            // Add CSV header row
            $header = ['Response ID', 'Submitted At', 'IP Address', 'User Agent', 'Completion Time', 'Email'];
            $formElements = [];
            
            // Collect all unique form element labels
            foreach ($responses as $response) {
                foreach ($response->answers as $answer) {
                    $label = $answer->formElement->label;
                    if (!in_array($label, $formElements)) {
                        $formElements[] = $label;
                        $header[] = $label;
                    }
                }
            }
            
            fputcsv($file, $header);
            
            // Add CSV data rows
            foreach ($responses as $response) {
                $row = [
                    $response->id,
                    $response->created_at,
                    $response->ip_address,
                    $response->user_agent,
                    $response->completion_time,
                    $response->respondent_email,
                ];
                
                // Collect answers for each form element
                $answers = [];
                foreach ($formElements as $label) {
                    $answerValue = '';
                    foreach ($response->answers as $answer) {
                        if ($answer->formElement->label === $label) {
                            $answerValue = $answer->value;
                            break;
                        }
                    }
                    $answers[] = $answerValue;
                }
                
                $row = array_merge($row, $answers);
                
                fputcsv($file, $row);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }
    
    /**
     * Get statistics about responses
     */
    public function getResponseStatistics(Form $form)
    {
        $totalResponses = $form->responses()->count();
        
        // Calculate average completion time
        $totalCompletionTime = $form->responses()->sum('completion_time');
        $averageCompletionTime = $totalResponses > 0 ? $totalCompletionTime / $totalResponses : 0;
        
        // Calculate completion rate (example, you might need to adjust based on your specific needs)
        $totalStarts = $totalResponses; // Assuming each response is a completion
        $completionRate = $totalStarts > 0 ? ($totalResponses / $totalStarts) * 100 : 0;
        
        return [
            'total_responses' => $totalResponses,
            'average_completion_time' => $averageCompletionTime,
            'completion_rate' => $completionRate,
        ];
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
