<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_category_id')->constrained();
            $table->bigInteger('store_id')->nullable()->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('stores_section_id')->nullable()->unsigned();
            $table->foreign('stores_section_id')->references('id')->on('stores_sections')->onDelete('cascade');
            $table->bigInteger('branch_id')->nullable()->unsigned();
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
            // name of file in storage so we generate path from this name
            $table->tinyText('name');
            // at least the name of uploaded media so we display the description for it.
            $table->string('description', 255)->nullable();
            $table->tinyInteger('state')->nullable()->default('1')->comment('1 = activated , 2 = stopped, 3 = deleted');
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
        Schema::dropIfExists('medias');
    }
}
