<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_leaderboards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(table: 'users');
            $table->string('username');
            $table->string('country');
            $table->text('score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_leaderboards');
    }
};
