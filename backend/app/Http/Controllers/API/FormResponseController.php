
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormResponse;
use App\Http\Requests\StoreFormResponseRequest;
use App\Services\FormResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormResponseController extends Controller
{
    protected $formResponseService;

    public function __construct(FormResponseService $formResponseService)
    {
        $this->formResponseService = $formResponseService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Form $form)
    {
        $this->authorize('view', $form);
        
        $responses = $this->formResponseService->getResponsesByForm($form);
        
        return response()->json($responses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormResponseRequest $request, $slug)
    {
        $form = Form::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
            
        // Check if one response per user is enabled and user has already submitted
        if ($form->one_response_per_user && Auth::check()) {
            $existingResponse = $form->responses()
                ->where('user_id', Auth::id())
                ->exists();
                
            if ($existingResponse) {
                return response()->json([
                    'message' => 'You have already submitted a response to this form'
                ], 422);
            }
        }
        
        $startTime = $request->input('start_time');
        $completionTime = null;
        
        if ($startTime) {
            $completionTime = time() - $startTime;
        }
        
        $response = $this->formResponseService->createResponse($form, $request->validated(), $completionTime);
        
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form, FormResponse $response)
    {
        $this->authorize('view', $form);
        
        if ($response->form_id !== $form->id) {
            return response()->json(['message' => 'Response does not belong to this form'], 404);
        }
        
        $response = $this->formResponseService->getResponseWithAnswers($response);
        
        return response()->json($response);
    }

    /**
     * Export responses as CSV.
     */
    public function export(Form $form)
    {
        $this->authorize('view', $form);
        
        return $this->formResponseService->exportResponses($form);
    }
    
    /**
     * Get statistics about form responses.
     */
    public function statistics(Form $form)
    {
        $this->authorize('view', $form);
        
        $stats = $this->formResponseService->getResponseStatistics($form);
        
        return response()->json($stats);
    }
}
