<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->boolean('active');

            $table->bigInteger("book_id")->unsigned()->nullable();
            $table->bigInteger("client_id")->unsigned();
            $table->bigInteger("userStart_id")->unsigned();
            $table->bigInteger("userFinish_id")->unsigned()->nullable();



            $table->foreign('client_id')->references('id')->on('clients')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');
            $table->foreign('book_id')->references('id')->on('books')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');
            $table->foreign('userStart_id')->references('id')->on('users')
                ->cascadeOnDelete('set null')
                ->cascadeOnUpdate('cascade');
            $table->foreign('userFinish_id')->references('id')->on('users')
                ->cascadeOnDelete('set null')
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
        Schema::dropIfExists('loans');
    }
}
