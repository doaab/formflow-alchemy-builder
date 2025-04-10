
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormElement;
use App\Http\Requests\StoreFormElementRequest;
use App\Http\Requests\UpdateFormElementRequest;
use App\Services\FormElementService;
use Illuminate\Http\Request;

class FormElementController extends Controller
{
    protected $formElementService;

    public function __construct(FormElementService $formElementService)
    {
        $this->formElementService = $formElementService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Form $form)
    {
        $this->authorize('view', $form);
        
        $elements = $this->formElementService->getElementsByForm($form);
        
        return response()->json($elements);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormElementRequest $request, Form $form)
    {
        $this->authorize('update', $form);
        
        $element = $this->formElementService->createElement($form, $request->validated());
        
        return response()->json($element, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form, FormElement $element)
    {
        $this->authorize('view', $form);
        
        if ($element->form_id !== $form->id) {
            return response()->json(['message' => 'Element does not belong to this form'], 404);
        }
        
        $element = $this->formElementService->getElementWithDetails($element);
        
        return response()->json($element);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormElementRequest $request, Form $form, FormElement $element)
    {
        $this->authorize('update', $form);
        
        if ($element->form_id !== $form->id) {
            return response()->json(['message' => 'Element does not belong to this form'], 404);
        }
        
        $element = $this->formElementService->updateElement($element, $request->validated());
        
        return response()->json($element);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form, FormElement $element)
    {
        $this->authorize('update', $form);
        
        if ($element->form_id !== $form->id) {
            return response()->json(['message' => 'Element does not belong to this form'], 404);
        }
        
        $this->formElementService->deleteElement($element);
        
        return response()->json(null, 204);
    }

    /**
     * Reorder elements.
     */
    public function reorder(Request $request, Form $form)
    {
        $this->authorize('update', $form);
        
        $request->validate([
            'elements' => 'required|array',
            'elements.*.id' => 'required|exists:form_elements,id',
            'elements.*.order' => 'required|integer|min:0',
        ]);
        
        $this->formElementService->reorderElements($request->elements);
        
        return response()->json(['message' => 'Elements reordered successfully']);
    }
}
