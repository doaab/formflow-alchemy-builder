<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StoresSection;
use EloquentFilter\Filterable;

class Reviews_Campaigns extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'campaign_type' => ['required'],
        'campaign_points' => ['nullable'],
        'points_person' => 'nullable|lt:campaign_points',
        'campaign_start_date' => ['required', 'date'],
        'campaign_end_date' => ['required', 'date'],
        'branch_id' => ['required'],
        'sections_reviewed' => ['required'],
        'title' => ['required', 'string'],
        'description' => ['required', 'string'],
        'allowing_person_review_more' => ['integer'],
        'coupon_id' => 'nullable',
    ];


    public function store()
    {
        return $this->belongsTo(Store::class);
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
    public function sections()
    {
        return $this->belongsToMany(storesSection::class, 'store_section_reviews__campaigns', 'reviews__campaign_id', 'stores_section_id');
    }


    public function reviews()
    {
        return $this->hasMany(StoresSectionsReview::class, 'reviews__campaign_id');
    }
}
