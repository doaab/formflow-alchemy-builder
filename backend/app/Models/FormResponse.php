
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormResponse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'form_id',
        'user_id',
        'ip_address',
        'user_agent',
        'respondent_email',
        'completion_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completion_time' => 'integer',
    ];

    /**
     * Get the form that owns the response.
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get the user that submitted the response.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the answers for the response.
     */
    public function answers()
    {
        return $this->hasMany(FormAnswer::class);
    }
}
