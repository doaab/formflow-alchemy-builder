<?php

namespace App\ModelFilters\Store;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StoresFilter extends ModelFilter
{


    protected $drop_id = true;

    protected $camel_cased_methods = false;

    protected $blacklist = [];

    public function state($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn('state', explode(',', $value));
        }
    }


    public function type($value)
    {
        if ($value == "all") {
            return $this;
        } else {
            return $this->whereIn('subscription_type', explode(',', $value));
        }
    }

}
