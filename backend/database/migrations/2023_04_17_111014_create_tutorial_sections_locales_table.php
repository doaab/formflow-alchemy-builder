<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatetuTorialSectionsLocalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutorial_sections_locales', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tutorial_sections_id')->unsigned();
            $table->foreign('tutorial_sections_id')->references('id')->on('tutorial_sections')->onDelete('cascade');
            $table->bigInteger('locale_id')->unsigned();
            $table->foreign('locale_id')->references('id')->on('locales')->onDelete('cascade');
            $table->string('title');
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
        Schema::dropIfExists('tutorial_sections_locales');
    }
}
