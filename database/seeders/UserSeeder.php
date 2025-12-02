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
                'name' => 'Admin Sistema',
                'first_name' => 'Admin',
                'last_name' => 'Sistema',
                'dni' => '12345678',
                'password' => Hash::make('12345678'),
            ]
        );
        $superAdmin->assignRole(RoleEnum::SUPER_ADMIN->value);

        // Create other users
        $users = [
            [
                'first_name' => 'Xiomara',
                'last_name' => 'Torres',
                'email' => 'xiomara.torres@agualima.com',
                'dni' => '87654321',
                'role' => RoleEnum::MANAGEMENT->value,
            ],
            [
                'first_name' => 'Fernando',
                'last_name' => 'Cabrera',
                'email' => 'fernando.cabrera@agualima.com',
                'dni' => '76543210',
                'role' => RoleEnum::ADMINISTRATOR->value,
            ],
            [
                'first_name' => 'Clever',
                'last_name' => 'Oruna',
                'email' => 'clever.oruna@agualima.com',
                'dni' => '65432109',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Pedro',
                'last_name' => 'Gómez',
                'email' => 'pedro.gomez@agualima.com',
                'dni' => '54321098',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Liliana',
                'last_name' => 'Guzmán',
                'email' => 'liliana.guzman@agualima.com',
                'dni' => '43210987',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Susan',
                'last_name' => 'Yovera',
                'email' => 'susan.yovera@agualima.com',
                'dni' => '32109876',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Diana',
                'last_name' => 'Gonzáles',
                'email' => 'diana.gonzales@agualima.com',
                'dni' => '21098765',
                'role' => RoleEnum::VIEWER->value,
            ],
            [
                'first_name' => 'Valeria',
                'last_name' => 'Agüero',
                'email' => 'valeria.aguero@agualima.com',
                'dni' => '10987654',
                'role' => RoleEnum::VIEWER->value,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['first_name'] . ' ' . $userData['last_name'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'dni' => $userData['dni'],
                    'password' => Hash::make($userData['dni']),
                ]
            );

            $user->assignRole($userData['role']);
        }
    }
}
