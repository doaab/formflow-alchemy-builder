<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDynamicLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dynamic_links', function (Blueprint $table) {
            $table->id();
            $table->string('custom_url');
            $table->string('firebase_url')->nullable();
            $table->bigInteger('store_id')->nullable()->unsigned();
            $table->foreign('store_id')->nullable()->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('branch_id')->nullable()->unsigned();
            $table->foreign('branch_id')->nullable()->references('id')->on('branches')->onDelete('cascade');
            $table->bigInteger('survey_id')->nullable()->unsigned();
            $table->foreign('survey_id')->nullable()->references('id')->on('surveys')->onDelete('cascade');
            $table->integer('temporary_link')->default(0)->comment('0 = False ,1 = True');;
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
        Schema::dropIfExists('dynamic_links');
    }
}
