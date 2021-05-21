<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'last_name', 'mother_last_name', 'register', 'phone'];

    public function loans(){
        return $this->hasMany(Loan::class);
    }
}
