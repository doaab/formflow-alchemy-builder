<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wa_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('wa_service_provider_id')->constrained('wa_service_providers')->onDelete('cascade');
            $table->string('name_ar');
            $table->string('name_en');
            $table->tinyInteger('state')->default('1')->comment('1 = activated , 2 = disabled, 3 = deleted');
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
        Schema::dropIfExists('wa_subscriptions');
    }
}
