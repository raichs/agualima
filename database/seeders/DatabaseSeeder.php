<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // First create roles and permissions
        $this->call([
            RoleSeeder::class,
            UserSeeder::class, // Creates super admin and other users
            ProjectSeeder::class,
            VarietySeeder::class,
            ShiftSeeder::class,
            LotSeeder::class,
            DistributionSeeder::class,
        ]);
    }
}
