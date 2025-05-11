<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaServiceSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wa_service_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('wa_service_provider_id')->constrained('wa_service_providers')->onDelete('cascade');
            $table->integer('wa_subscription_id')->constrained('wa_subscriptions')->onDelete('cascade');
            $table->string('period')->default('1')->comment('1 = Open, 2 = Month, 3 = Year');
            $table->decimal('old_price');
            $table->decimal('price');
            $table->decimal('discount')->default('0');
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
        Schema::dropIfExists('wa_service_subscriptions');
    }
}
