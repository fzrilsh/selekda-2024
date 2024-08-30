<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Blog;
use App\Models\BlogTag;
use App\Models\Portfolio;
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
        User::query()->create([
            'name' => 'Admin',
            'username' => 'admin1',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'date_of_birth' => '2007-03-18',
            'phone_number' => '0812345678',
            'profile_picture' => "profile_picture/Ly1VG77ZCGKCA9OKrGGnbbLtm0D75mR6Th4LmJyZ.png",
            'role' => 'admin'
        ]);
        
        User::query()->create([
            'name' => 'John Doe',
            'username' => 'john.doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '2007-03-18',
            'phone_number' => '0812345678',
            'profile_picture' => "profile_picture/Ly1VG77ZCGKCA9OKrGGnbbLtm0D75mR6Th4LmJyZ.png",
            'role' => 'user'
        ]);

        for ($i=0; $i < 3; $i++) { 
            Blog::query()->create([
                'image' => 'profile_picture/Ly1VG77ZCGKCA9OKrGGnbbLtm0D75mR6Th4LmJyZ.png',
                'title' => 'Web Developer',
                'description' => 'Web developer adalah seorang profesional yang bertugas untuk membuat, mengembangkan, dan memelihara situs web atau aplikasi web. Web developer menggunakan berbagai teknologi, bahasa pemrograman, dan tools untuk melakukan tugasnya.',
                'author_id' => '1',
                'views' => '100'
            ]);
        }
        for ($i=0; $i < 3; $i++) { 
            Banner::query()->create([
                'image' => 'profile_picture/Ly1VG77ZCGKCA9OKrGGnbbLtm0D75mR6Th4LmJyZ.png',
                'title' => 'Web Developer',
                'description' => 'Web developer adalah seorang profesional yang bertugas untuk membuat, mengembangkan, dan memelihara situs web atau aplikasi web. Web developer menggunakan berbagai teknologi, bahasa pemrograman, dan tools untuk melakukan tugasnya.',
                'status' => 'active',
            ]);
        }
        for ($i=0; $i < 3; $i++) { 
            Portfolio::query()->create([
                'image' => 'profile_picture/Ly1VG77ZCGKCA9OKrGGnbbLtm0D75mR6Th4LmJyZ.png',
                'title' => 'Web Developer',
                'description' => 'Web developer adalah seorang profesional yang bertugas untuk membuat, mengembangkan, dan memelihara situs web atau aplikasi web. Web developer menggunakan berbagai teknologi, bahasa pemrograman, dan tools untuk melakukan tugasnya.',
                'author_id' => '1',
                'views' => '100'
            ]);
        }

        BlogTag::query()->create([
            'blog_id' => '1',
            'name' => 'romance'
        ]);
        BlogTag::query()->create([
            'blog_id' => '1',
            'name' => 'modern'
        ]);
        BlogTag::query()->create([
            'blog_id' => '1',
            'name' => 'rawr'
        ]);
    }
}
