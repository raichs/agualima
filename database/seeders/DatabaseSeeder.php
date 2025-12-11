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
            MenuSeeder::class,
            RoleSeeder::class,
            UserSeeder::class, // Creates super admin and other users
            CountrySeeder::class,
            NurserySeeder::class,
            CampaignSeeder::class,
            ProjectSeeder::class,
            VarietySeeder::class,
            ShiftSeeder::class,
            LotSeeder::class,
            DistributionSeeder::class,
            HarvestMatrixSeeder::class,
            HarvestMatrixWeek40Seeder::class,
        ]);
    }
}
