<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'active', 'book_id', 'client_id','userStart_id','userFinish_id'];

    public function book(){
        return $this->belongsTo(Book::class);
    }

}
