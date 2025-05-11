<?php

namespace App\Models;

use App\Utilities\Constance;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'medias';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */



    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function storeSection()
    {
        return $this->belongsTo(StoresSection::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function mediaCategory()
    {
        return $this->belongsTo(MediaCategory::class);
    }
}
