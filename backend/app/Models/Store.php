<?php

namespace App\Models;

//use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Contracts\Auth\Authenticatable; //implements
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use EloquentFilter\Filterable;
use App\ModelFilters\Store\StoresFilter;
use Spatie\Permission\Traits\HasRoles;

class Store extends Model
{
    use HasFactory, Filterable, HasRoles;
    // TODO: use points instead of string in coordinate column.
    // use SpatialTrait;
    use HasApiTokens;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    // protected $appends = ['branches_ids'];

    /**
     * The attributes of location in map
     *
     * @var array
     */
    protected $spatialFields = [
        'coordinate',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'email' => 'required|email',
        'password' => 'required|min:8',
    ];

    public function modelFilter()
    {
        return $this->provideFilter(StoresFilter::class);
    }


    public function service_provider()
    {
        return $this->belongsTo(WaServiceProvider::class);
    }


    public function branches()
    {
        return $this->hasMany(Branch::class);
    }



    public function messages()
    {
        return $this->hasMany(Message::class);
    }




    /**
     * Get all of the Media for the Store
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function medias()
    {
        return $this->hasOne(Media::class);
    }

    /**
     * Get all the storesSection for the Store
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function storesSection()
    {
        return $this->hasMany(StoresSection::class);
    }

    /**
     * Get all of the QuestionsReviews for the Store
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function questions_reviews()
    {
        return $this->hasMany(Questions_Reviews::class);
    }

    public function reviews_campaigns()
    {
        return $this->hasMany(Reviews_Campaigns::class);
    }

    public function alerts()
    {
        return $this->hasMany(AlertUsersReview::class);
    }

    public function StorePointInfo()
    {
        return $this->hasOne(StorePointInfo::class);
    }

    public function StorePoint()
    {
        return $this->hasMany(StorePoint::class);
    }

    public function stores_sections_review()
    {
        return $this->hasMany(StoresSectionsReview::class);
    }


    public function payments()
    {
        return $this->hasMany(Payment::class);
    }


    public function alerts_store()
    {
        return $this->hasMany(AlertStore::class);
    }
}
