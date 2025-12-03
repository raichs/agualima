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
        // Create Administrator user first
        $administrator = User::firstOrCreate(
            ['email' => 'fernando.cabrera@agualima.com'],
            [
                'name' => 'Fernando Cabrera',
                'first_name' => 'Fernando',
                'last_name' => 'Cabrera',
                'dni' => '71883521',
                'password' => Hash::make('71883521'),
            ]
        );
        $administrator->assignRole(RoleEnum::ADMINISTRATOR->value);

        // Create other users
        $users = [
            [
                'first_name' => 'Xiomara',
                'last_name' => 'Torres',
                'email' => 'xiomara.torres@agualima.com',
                'dni' => '12345678',
                'role' => RoleEnum::MANAGEMENT->value,
            ],
            [
                'first_name' => 'Clever Ronaldo',
                'last_name' => 'Salvador Oruna',
                'email' => 'clever.oruna@agualima.com',
                'dni' => '47259536',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Pedro Luis',
                'last_name' => 'Gomez Mejia',
                'email' => 'pedro.gomez@agualima.com',
                'dni' => '45679160',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Edith Liliana',
                'last_name' => 'Guzman Alvarado',
                'email' => 'liliana.guzman@agualima.com',
                'dni' => '46169846',
                'role' => RoleEnum::CROP_MANAGER->value,
            ],
            [
                'first_name' => 'Susan Dallan',
                'last_name' => 'Yovera Yllatopa',
                'email' => 'susan.yovera@agualima.com',
                'dni' => '70031164',
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
