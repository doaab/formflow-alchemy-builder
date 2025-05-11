<?php

namespace App\ModelFilters\Store;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PointsFilter extends ModelFilter
{


    protected $drop_id = true;

    protected $camel_cased_methods = false;

    protected $blacklist = [];


    public function month($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn(DB::raw('MONTH(created_at)'), explode(',',$value));
        }
    }

}
