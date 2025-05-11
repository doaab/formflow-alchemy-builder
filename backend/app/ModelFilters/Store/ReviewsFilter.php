<?php

namespace App\ModelFilters\Store;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReviewsFilter extends ModelFilter
{


    protected $drop_id = true;

    protected $camel_cased_methods = false;

    protected $blacklist = [];

    public function user($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->with('user')->whereHas('user', function ($query) use ($value) {
                $query->whereIn('id', explode(',', $value));
            });
        }
    }
    public function branch($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn('branch_id', explode(',', $value));
        }
    }


    public function section($value)
    {
        if ($value == "all") {
            return $this->whereNotNull('stores_section_id');
        } elseif ($value == "same") {
            return $this->whereNull('stores_section_id');
        } else {
            return $this->with('storesSection')->whereHas('storesSection', function ($query) use ($value) {
                $query->whereIn('id', explode(',', $value));
            });
        }
    }



    public function month($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn(DB::raw('MONTH(created_at)'), explode(',', $value));
        }
    }


    public function star($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn('stars', explode(',', $value));
        }
    }


    public function question($value)
    {
        if ($value == "all") {
            return $this;
        } elseif ($value == "question_type") {
            return $this->where('review_type', 2);
        } else {
            return $this->whereIn('questions__reviews_id', explode(',', $value));
        }
    }


    public function type($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn('campaign_type', explode(',', $value));
        }
    }

    public function campaign($value)
    {
        return $this->where('reviews__campaign_id', $value);
    }
}
