<?php

namespace Database\Seeders;

use App\Models\HarvestMatrix;
use App\Models\User;
use Illuminate\Database\Seeder;

class HarvestMatrixSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = now()->year; // 2025

        // Find the user LILIANA GUZMAN (Edith Liliana Guzman Alvarado)
        $user = User::where('email', 'liliana.guzman@agualima.com')
                   ->orWhere('name', 'LIKE', '%LILIANA GUZMAN%')
                   ->orWhere('last_name', 'LIKE', '%Guzman%')
                   ->first();

        if (!$user) {
            $this->command->error("User 'LILIANA GUZMAN' not found. Please ensure the user exists.");
            return;
        }

        // Create harvest matrices for weeks 40 to 48
        for ($week = 40; $week <= 40; $week++) {
            HarvestMatrix::updateOrCreate(
                [
                    'week_number' => $week,
                    'year' => $currentYear,
                    'user_id' => $user->id,
                ],
                [
                    'week_number' => $week,
                    'year' => $currentYear,
                    'user_id' => $user->id,
                ]
            );
        }

        $this->command->info("Created harvest matrices for user LILIANA GUZMAN from week 40 to 48 for year {$currentYear}");
    }
}