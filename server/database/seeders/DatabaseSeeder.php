<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::query()->create([
            'name' => 'Admin',
            'username' => 'admin1',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'date_of_birth' => '2007-03-18',
            'phone_number' => '08985245896',
            'pp_path' => null,
            'role' => 'admin'
        ]);
    }
}
