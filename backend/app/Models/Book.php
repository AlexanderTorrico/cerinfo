<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'detail', 'sigTop', 'dewey','cuter','available','show','author_id','gender_id','language_id','material_id'];


}
