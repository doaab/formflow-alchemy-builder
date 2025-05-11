<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertisementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->string('banner');
            $table->string('advertisor');
            $table->string('title')->nullable();
            $table->string('sub_title')->nullable();
            $table->string('url')->nullable();
            $table->text('subscription_types');
            $table->text('cities');
            $table->text('stores');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_views');
            $table->integer('total_clicks')->default(0);
            $table->boolean('texts_visible')->default(1);
            $table->boolean('btn_visible')->default(1);
            $table->tinyInteger('state')->default(1)->comment('1 = activated , 2 = disabled, 3 = deleted');
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
        Schema::dropIfExists('advertisements');
    }
}
