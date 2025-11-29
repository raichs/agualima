<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin user first
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@agualima.com'],
            [
                'name' => 'Super Administrador',
                'password' => Hash::make('admin123'),
            ]
        );
        $superAdmin->assignRole(RoleEnum::SUPER_ADMIN->value);

        // Create other users
        $users = [
            [
                'name' => 'Xiomara Torres',
                'email' => 'xiomara.torres@agualima.com',
                'role' => RoleEnum::MANAGEMENT->value,
            ],
            [
                'name' => 'Fernando Cabrera',
                'email' => 'fernando.cabrera@agualima.com',
                'role' => RoleEnum::ADMINISTRATOR->value,
            ],
            [
                'name' => 'Clever Oruna',
                'email' => 'clever.oruna@agualima.com',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'name' => 'Pedro Gómez',
                'email' => 'pedro.gomez@agualima.com',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'name' => 'Liliana Guzmán',
                'email' => 'liliana.guzman@agualima.com',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'name' => 'Susan Yovera',
                'email' => 'susan.yovera@agualima.com',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'name' => 'Diana Gonzáles',
                'email' => 'diana.gonzales@agualima.com',
                'role' => RoleEnum::VIEWER->value,
            ],
            [
                'name' => 'Valeria Agüero',
                'email' => 'valeria.aguero@agualima.com',
                'role' => RoleEnum::VIEWER->value,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password'),
                ]
            );

            $user->assignRole($userData['role']);
        }
    }
}
