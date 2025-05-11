<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use EloquentFilter\Filterable;
use App\ModelFilters\Store\QuestionsFilter;

class Questions_Reviews extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];


    public function modelFilter()
    {
        return $this->provideFilter(QuestionsFilter::class);
    }
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'question_type' => ['required'],
    ];


    public function sections()
    {
        return $this->belongsToMany(StoresSection::class, 'sections_questions', 'questions__reviews_id', 'stores_sections_id');
    }

    /**
     * Get Store for Current store
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Get all of the Answers for the Questions
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function answers()
    {
        return $this->hasMany(Questions_Answers::class);
    }

    public function reviews()
    {
        return $this->belongsToMany(StoresSectionsReview::class, 'reviews_questions', 'questions__reviews_id', 'stores_sections_reviews_id');
    }
}
