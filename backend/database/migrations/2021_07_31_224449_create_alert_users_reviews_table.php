<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlertUsersReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alert_users_reviews', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->nullable()->unsigned();
            $table->foreign('store_id')->nullable()->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('stores_sections_review_id')->nullable()->unsigned();
            $table->foreign('stores_sections_review_id')->nullable()->references('id')->on('stores_sections_reviews')->onDelete('cascade');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('title');
            $table->text('message');
            $table->tinyInteger('is_read')->nullable()->default('1')->comment('1 = false , 2 = true');
            $table->tinyInteger('state')->nullable()->default('1')->comment('1 = activated , 2 = disabled, 3 = deleted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alert_users_reviews');
    }
}
