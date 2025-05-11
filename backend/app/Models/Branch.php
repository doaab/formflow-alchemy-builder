<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => ['required', 'string'],
        'city' => ['nullable', 'string'],
        'phone' => ['nullable', 'min:6', 'max:15'],
        'email' => ['nullable'],
        'use_company_logo' => ['required'],
        'use_company_email' => ['required'],
        'use_company_phone' => ['required'],
        'randomly_generate_link' => ['required'],
        'photo' => ['required_unless:use_company_logo,1'],
        'custom_url' => ['required_unless:randomly_generate_link,1'],
    ];


    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function surveys()
    {
        return $this->hasMany(Survey::class);
    }

    public function medias()
    {
        return $this->hasOne(Media::class);
    }

    public function sections()
    {
        return $this->belongsToMany(StoresSection::class, 'branch_sections', 'branche_id', 'stores_section_id');
    }

    public function reviewsCampaigns()
    {
        return $this->hasMany(Reviews_Campaigns::class);
    }
}
