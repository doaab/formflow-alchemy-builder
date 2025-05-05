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
        'status',
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
     * Default attribute values.
     *
     * @var array
     */
    protected $attributes = [
        'user_id' => 1, // Set default user ID to 1 for anonymous forms
        'is_published' => false,
        'status' => 'draft',
        'theme' => 'default',
        'collect_email' => false,
        'one_response_per_user' => false,
        'show_progress_bar' => true,
        'shuffle_questions' => false,
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['responses_count'];

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
     * Get the response count as an accessor.
     */
    public function getResponsesCountAttribute()
    {
        return $this->responses()->count();
    }

    /**
     * Check if the form is published.
     */
    public function isPublished()
    {
        return $this->status === 'published';
    }

    /**
     * Check if the form is paused.
     */
    public function isPaused()
    {
        return $this->status === 'paused';
    }

    /**
     * Check if the form is draft.
     */
    public function isDraft()
    {
        return $this->status === 'draft';
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
                $form->slug = \Str::slug($form->title ?? 'untitled') . '-' . \Str::random(8);
            }

            // Set default user_id if not provided
            if (empty($form->user_id)) {
                // Use a default system user ID (typically 1) for anonymous forms
                $form->user_id = 1;
            }

            // Set default status if empty
            if (empty($form->status)) {
                $form->status = 'draft';
            }
        });
    }
}
