<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogComment extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $guarded = [];
    protected $appends = ['user_image'];

    public function User(){
        return $this->belongsTo(User::class, 'email', 'email');
    }

    public function getUserImageAttribute(){
        return $this->User()->first()->profile_picture;
    }
}
