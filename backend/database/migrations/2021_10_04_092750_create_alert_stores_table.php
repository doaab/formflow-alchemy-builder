<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlertStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alert_stores', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('super_admin_id')->unsigned();
            $table->foreign('super_admin_id')->references('id')->on('super_admins')->onDelete('cascade');
            $table->string('title');
            $table->text('message');
            $table->double('count_points')->nullable();
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
        Schema::dropIfExists('alert_stores');
    }
}
