<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresSectionsReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores_sections_reviews', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->nullable()->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('store_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('branch_id')->unsigned();
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
            $table->bigInteger('stores_section_id')->nullable()->unsigned();
            // $table->foreign('stores_section_id')->references('id')->on('stores_sections')->onDelete('cascade');
            $table->bigInteger('reviews__campaign_id')->nullable()->unsigned();
            $table->foreign('reviews__campaign_id')->references('id')->on('reviews__campaigns')->onDelete('cascade');
            $table->integer('campaign_type')->default('1')->comment('1 = free , 2 = paid, 3 = coupon');
            $table->double('points')->nullable();
            $table->string('visitor_email')->nullable();
            $table->string('visitor_phone')->nullable();
            $table->tinyInteger('is_read')->default('1')->comment('1 = No Read, 2 = Read');
            $table->tinyInteger('user_is_hidden')->default('1')->comment('1 = false , 2 = true');
            $table->tinyInteger('google_review_branch_id')->nullable()->unsigned();
            $table->tinyInteger('is_go_to_google_reviews')->default(0)->nullable();
            $table->tinyInteger('advertisement_id')->nullable();
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
        Schema::dropIfExists('stores_sections_reviews');
    }
}
