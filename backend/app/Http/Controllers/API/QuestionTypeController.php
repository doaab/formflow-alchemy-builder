
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\QuestionType;
use Illuminate\Http\Request;

class QuestionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $types = QuestionType::where('is_active', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get();
            
        return response()->json($types);
    }

    /**
     * Get question types by category.
     */
    public function getByCategory()
    {
        $types = QuestionType::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->groupBy('category');
            
        return response()->json($types);
    }
}
