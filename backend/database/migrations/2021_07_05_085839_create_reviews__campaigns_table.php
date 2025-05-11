<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews__campaigns', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->integer('campaign_type')->default('2')->comment('2 = points, 3 = coupons, 4 = coupons single use');
            $table->decimal('campaign_points', 8, 2)->nullable();
            $table->decimal('points_person', 8, 2)->nullable();
            $table->date('campaign_start_date');
            $table->date('campaign_end_date');
            $table->bigInteger('branch_id')->unsigned();
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            // $table->integer('review_type')->nullable();
            // $table->bigInteger('questions__reviews_id')->nullable()->unsigned();
            // $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->integer('allowing_person_review_more')->nullable()->default('1')->comment('1 = false , 2 = true');
            $table->integer('coupon_id')->nullable()->constrained('coupons')->onDelete('cascade');
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
        Schema::dropIfExists('reviews__campaigns');
    }
}
