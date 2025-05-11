<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained();
            $table->boolean('is_global')->default(0);
            $table->string('city');
            $table->string('phone')->nullable();
            $table->string('photo')->nullable();
            $table->string('email')->nullable();
            $table->tinyInteger('use_company_logo')->default(1)->comment('0 = false , 1 = true');
            $table->tinyInteger('use_company_email')->default(1)->comment('0 = false , 1 = true');
            $table->tinyInteger('use_company_phone')->default(1)->comment('0 = false , 1 = true');
            $table->tinyInteger('randomly_generate_link')->default(1)->comment('0 = false , 1 = true');
            $table->string('qr_code_path')->nullable();
            $table->tinyInteger('is_show')->default(1)->comment('1 = visible , 2 = hidden');
            $table->boolean('can_review_by_qr')->default(false);
            $table->tinyInteger('advanced_setting')->default(0)->comment('0 = false , 1 = true');
            $table->tinyInteger('state')->default(1)->comment('1 = activated , 2 = stopped, 3 = deleted');
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
        Schema::dropIfExists('branches');
    }
}
