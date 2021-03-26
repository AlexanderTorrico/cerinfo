<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookEditorialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_editorial', function (Blueprint $table) {
            $table->id();
            $table->string("edition",3);
            $table->string("printing_place");
            $table->string("printer_name");
            $table->string("printer_year",4);
            $table->string("publication_year",4);

            $table->bigInteger("book_id")->unsigned();
            $table->bigInteger("editorial_id")->unsigned();

            $table->foreign('book_id')->references('id')->on('books')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');
            $table->foreign('editorial_id')->references('id')->on('editorials')
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
        Schema::dropIfExists('book_editorial');
    }
}
