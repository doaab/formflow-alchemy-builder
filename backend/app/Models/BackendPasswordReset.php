<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BackendPasswordReset extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'email';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['token', 'email'];

    /**
     * Execute a query to create a single record by Email.
     *
     * @param  int|string  $email
     * @param  array  $columns
     * @return mixed|static
     */
    public static function generate($email)
    {
        $token = Str::random(64);
        self::create(['token' => $token, 'email' => $email, 'created_at' => carbon()->now()]);

        return $token;
    }

    /**
     * Execute a query to find a single record by Token.
     *
     * @param  int|string  $token
     * @param  array  $columns
     * @return mixed|static
     */
    public static function look($token, $columns = ['*'])
    {
        return self::where('token', '=', $token)->first($columns);
    }

    /**
     * Execute a query to remove a single record by Token.
     *
     * @param  int|string  $token
     * @return mixed|static
     */
    public static function remove($token)
    {
        return self::where('token', '=', $token)->delete();
    }
}
