<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->string('payment_id');
            $table->decimal('amount');
            $table->decimal('added_tax', 8, 2)->nullable();
            $table->decimal('total_amount');
            $table->tinyInteger('type')->comment('1 = Renew an account , 2 = Buy points');
            $table->integer('description_package')->nullable()->comment('2 = upgrade, 3 = renewal');
            $table->integer('subscription_type')->nullable()->comment('1 = Free , 2 = Medium, 3 = Professional');
            $table->integer('subscription_period')->nullable()->comment('2 = Month, 3 = Year');

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
        Schema::dropIfExists('payments');
    }
}
