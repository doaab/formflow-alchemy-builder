<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->double('points')->default('0');
            $table->string('password');
            $table->string('role')->default('user'); // 'user', 'admin', etc.
            $table->string('avatar')->nullable();
            $table->string('image')->nullable();
            $table->string('timezone')->default('UTC');
            $table->json('preferences')->nullable(); // User preferences for the form builder
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->tinyInteger('state')->nullable()->default('1')->comment('1 = activated , 2 = stopped, 3 = deleted');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
