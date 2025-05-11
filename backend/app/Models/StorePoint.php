<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use EloquentFilter\Filterable;
use App\ModelFilters\Store\PointsFilter;

class StorePoint extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];


    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'operation_type' => ['required'],
        'value' => ['required'],
        'total_amount' => ['nullable']
    ];

    public function modelFilter()
    {
        return $this->provideFilter(PointsFilter::class);
    }
    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
