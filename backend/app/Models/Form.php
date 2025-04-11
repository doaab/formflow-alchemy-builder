<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Form extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'is_published',
        'slug',
        'theme',
        'collect_email',
        'one_response_per_user',
        'show_progress_bar',
        'shuffle_questions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_published' => 'boolean',
        'collect_email' => 'boolean',
        'one_response_per_user' => 'boolean',
        'show_progress_bar' => 'boolean',
        'shuffle_questions' => 'boolean',
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the user that created the form.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the elements for the form.
     */
    public function elements()
    {
        return $this->hasMany(FormElement::class);
    }

    /**
     * Get the responses for the form.
     */
    public function responses()
    {
        return $this->hasMany(FormResponse::class);
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Generate slug before creating
        static::creating(function ($form) {
            if (empty($form->slug)) {
                $form->slug = \Str::slug($form->title) . '-' . \Str::random(8);
            }
        });
    }
}
