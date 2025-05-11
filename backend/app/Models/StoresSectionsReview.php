<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use EloquentFilter\Filterable;
use App\ModelFilters\Store\ReviewsFilter;
class StoresSectionsReview extends Model
{
    use HasFactory, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];



    public function modelFilter()
    {
        return $this->provideFilter(ReviewsFilter::class);
    }
    /**
     * Get user for Current StoresSectionsReview
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get StoresSection for Current StoresSectionsReview
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function storesSection()
    {
        return $this->belongsTo(StoresSection::class);
    }

    public function alerts()
    {
        return $this->hasMany(AlertUsersReview::class);
    }


    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Reviews_Campaigns::class, 'reviews__campaign_id');
    }

    public function questions()
    {
        return $this->belongsToMany(Questions_Reviews::class, 'reviews_questions', 'stores_sections_reviews_id', 'questions__reviews_id');
    }
}
