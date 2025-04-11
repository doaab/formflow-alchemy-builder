<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Http\Requests\StoreFormRequest;
use App\Http\Requests\UpdateFormRequest;
use App\Services\FormService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    protected $formService;

    public function __construct(FormService $formService)
    {
        $this->formService = $formService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $forms = $user->forms()
            ->when($request->has('search'), function ($query) use ($request) {
                return $query->where('title', 'like', '%' . $request->search . '%');
            })
            ->when($request->has('sort'), function ($query) use ($request) {
                return $query->orderBy($request->sort, $request->order ?? 'asc');
            })
            ->paginate($request->per_page ?? 10);

        return response()->json($forms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormRequest $request)
    {
        $form = $this->formService->createForm($request->validated());

        return response()->json($form, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        $this->authorize('view', $form);

        return response()->json(
            $this->formService->getFormWithElements($form)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormRequest $request, Form $form)
    {
        $this->authorize('update', $form);

        $form = $this->formService->updateForm($form, $request->validated());

        return response()->json($form);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        $this->authorize('delete', $form);

        $this->formService->deleteForm($form);

        return response()->json(null, 204);
    }

    /**
     * Get form by public slug.
     */
    public function getBySlug($slug)
    {
        $form = Form::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json(
            $this->formService->getFormWithElementsPublic($form)
        );
    }

    /**
     * Publish or unpublish a form.
     */
    public function togglePublish(Form $form)
    {
        $this->authorize('update', $form);

        $form->is_published = !$form->is_published;
        $form->save();

        return response()->json(['is_published' => $form->is_published]);
    }

    /**
     * Get form analytics.
     */
    public function analytics(Form $form)
    {
        $this->authorize('view', $form);

        $analytics = $this->formService->getFormAnalytics($form);

        return response()->json($analytics);
    }
}
