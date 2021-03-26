<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fines', function (Blueprint $table) {
            $table->id();
            $table->string('detail');
            $table->float('price');
            $table->string('state');
            $table->string('attributes');

            $table->bigInteger("loan_id")->unsigned()->nullable();
            $table->foreign('loan_id')->references('id')->on('loans')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');
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
        Schema::dropIfExists('fines');
    }
}
