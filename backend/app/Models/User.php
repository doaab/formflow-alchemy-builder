<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'phone' => 'required|regex:/(00966)[0-9]{9}/|unique:users',
        'name' => 'required',
        'email' => 'nullable|email',
        'image' => 'nullable|image',
    ];

    /**
     * Get notified if this is the first time of login
     *
     * @return bool
     */
    public function getIsFirstLoginAttribute()
    {
        return false;
    }

    /**
     * Get all of the storesReview for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function storesReview()
    {
        return $this->hasMany(StoresReview::class);
    }

    /**
     * Get all the storesSectionsReview for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function storesSectionsReview()
    {
        return $this->hasMany(StoresSectionsReview::class);
    }

    public function alerts()
    {
        return $this->hasMany(AlertUsersReview::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }


    public function points_transfer_request()
    {
        return $this->hasMany(PointsTransferRequest::class);
    }
    /**
     * Get the forms created by this user.
     */
    public function forms()
    {
        return $this->hasMany(Form::class);
    }
}
