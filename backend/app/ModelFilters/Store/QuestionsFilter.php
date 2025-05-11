<?php

namespace App\ModelFilters\Store;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Utilities\Constance;

class QuestionsFilter extends ModelFilter
{


    protected $drop_id = true;

    protected $camel_cased_methods = false;

    protected $blacklist = [];


    public function category($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereNull('store_id')->whereIn('stores_category_id', explode(',', $value));
        }
    }

    public function type($value)
    {
        if ($value == "all") {
            return $this->where('question_type', '!=', Constance::questionTypeInformation);
        } else {
            return $this->where('question_type', '!=', Constance::questionTypeInformation)->whereIn('question_type', explode(',', $value));
        }
    }
}
