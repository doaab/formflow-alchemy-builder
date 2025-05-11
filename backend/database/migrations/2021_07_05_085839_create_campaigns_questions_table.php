<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampaignsQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaigns_questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('reviews__campaign_id')->unsigned();
            $table->foreign('reviews__campaign_id')->references('id')->on('reviews__campaigns')->onDelete('cascade');
            $table->bigInteger('questions__reviews_id')->nullable()->unsigned();
            $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
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
        Schema::dropIfExists('campaigns_questions');
    }
}
