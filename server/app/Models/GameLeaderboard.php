<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameLeaderboard extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $guarded = [];
    protected $appends = ['author'];
    protected $hidden = ['user_id'];

    public function User(){
        return $this->belongsTo(User::class);
    }

    public function getAuthorAttribute(){
        return $this->User()->first()->only(['name', 'username', 'email']);
    }
}
