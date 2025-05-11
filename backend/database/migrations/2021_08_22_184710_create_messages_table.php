<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->nullable()->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('super_admin_id')->nullable()->unsigned();
            $table->foreign('super_admin_id')->references('id')->on('super_admins')->onDelete('cascade');
            $table->text('message')->nullable();
            $table->string('file')->nullable();
            $table->string('sender');
            $table->tinyInteger('is_read')->default('1')->comment('1 = false , 2 = true');
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
        Schema::dropIfExists('messages');
    }
}
