<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreSectionReviewsCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_section_reviews__campaigns', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('stores_section_id')->unsigned();
            $table->foreign('stores_section_id')->references('id')->on('stores_sections')->onDelete('cascade');
            $table->bigInteger('reviews__campaign_id')->unsigned();
            $table->foreign('reviews__campaign_id')->references('id')->on('reviews__campaigns')->onDelete('cascade');
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
        Schema::dropIfExists('store_section_reviews__campaigns');
    }
}
