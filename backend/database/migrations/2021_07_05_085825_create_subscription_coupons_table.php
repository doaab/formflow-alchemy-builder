<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscription_coupons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->string ('type_reduction')
            ->comment('2-2 = Monthly Medium Package , 2-3 = Annual Medium Package, 3-2 = Monthly Professional Package , 3-3 = Annual Professional Package');
            $table->string('stores') ;
            $table->integer('available_quantity');
            $table->integer('type_discount')->comment('1 = Fixed amount , 2 = Rate');
            $table->double('reduction');
            $table->date('start_date') ;
            $table->date('end_date') ;
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
        Schema::dropIfExists('subscription_coupons');
    }
}
