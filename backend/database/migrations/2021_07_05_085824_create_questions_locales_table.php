<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsLocalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions_locales', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('questions__reviews_id')->unsigned();
            $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->bigInteger('locale_id')->unsigned();
            $table->foreign('locale_id')->references('id')->on('locales')->onDelete('cascade');
            $table->text('title');
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
        Schema::dropIfExists('questions_locales');
    }
}
