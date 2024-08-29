<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;
    protected $guarded = [];

    public function Author(){
        return $this->belongsTo(User::class, 'author_id');
    }

    public function comments(){
        return $this->hasMany(BlogComment::class);
    }

    public function Tags(){
        return $this->hasMany(BlogTag::class);
    }

    public function getTagsAttribute(){
        return $this->Tags()->get();
    }

    public function getAuthorAttribute(){
        return $this->Author()->first();
    }

    public function getCommentsAttribute(){
        return $this->comments()->get();
    }

    public function getCommentsCountAttribute(){
        return $this->comments()->get()->count();
    }
}
