<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reviews_Campaigns;
use Illuminate\Validation\Rule;

class StoresSection extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required', 'string',
        'description' => ['nullable', 'string', 'min:5'],
        'media' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
        'type' => ['required', 'integer'],
        'reward_type' => ['required', 'integer'],
        'coupon_id' => 'nullable',
        'qr_code_path' => 'nullable',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function branchs()
    {
        return $this->belongsToMany(Branch::class, 'branch_sections', 'stores_section_id', 'branche_id');
    }

    public function storesSectionsReview()
    {
        return $this->hasMany(StoresSectionsReview::class);
    }

    public function media()
    {
        return $this->hasOne(Media::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(Reviews_Campaigns::class, 'store_section_reviews__campaigns', 'stores_section_id', 'reviews__campaign_id');
    }

    public function questionReview()
    {
        return $this->hasMany(Questions_Reviews::class, 'sections_questions', 'stores_sections_id', 'questions__reviews_id');
    }
}
