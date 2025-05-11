<?php

namespace App\ModelFilters\Store;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CouponsFilter extends ModelFilter
{


    protected $drop_id = true;

    protected $camel_cased_methods = false;

    protected $blacklist = [];


    public function type($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->where('coupon_type', $value);
        }
    }


    public function state($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->where('state', $value);
        }
    }


}
