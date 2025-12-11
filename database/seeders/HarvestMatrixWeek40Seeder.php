<?php

namespace Database\Seeders;

use App\Models\HarvestMatrix;
use App\Models\HarvestMatrixRow;
use App\Models\HarvestMatrixRowLot;
use App\Models\HarvestMatrixDailyData;
use App\Models\Variety;
use App\Models\Shift;
use App\Models\Lot;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class HarvestMatrixWeek40Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = now()->year; // 2025

        // Find the harvest matrix for week 40 and Liliana Guzman
        $user = User::where('email', 'liliana.guzman@agualima.com')->first();
        $matrix = HarvestMatrix::where('week_number', 40)
                              ->where('year', $currentYear)
                              ->where('user_id', $user->id)
                              ->first();

        if (!$matrix) {
            $this->command->error("Harvest matrix for week 40, year {$currentYear} not found for Liliana Guzman.");
            return;
        }

        $this->command->info("Populating harvest matrix for week 40 - Liliana Guzman");

        // Data structure: variety_name => shift_number => lots_data
        $harvestData = [
            'RAYMI' => [
                15 => [
                    ['lot_code' => 'D-20', 'lines' => 65, 'total_kilos' => 1089.23, 'kg_per_shift_avg' => 32, 'total_shifts' => 35],
                    ['lot_code' => 'D-19', 'lines' => 65, 'total_kilos' => 1089.23, 'kg_per_shift_avg' => 32, 'total_shifts' => 35],
                    ['lot_code' => 'E-20', 'lines' => 66, 'total_kilos' => 1105.99, 'kg_per_shift_avg' => 32, 'total_shifts' => 35],
                    ['lot_code' => 'E-19', 'lines' => 66, 'total_kilos' => 1105.99, 'kg_per_shift_avg' => 32, 'total_shifts' => 35],
                    ['lot_code' => 'F-20', 'lines' => 51, 'total_kilos' => 854.63, 'kg_per_shift_avg' => 32, 'total_shifts' => 27],
                    ['lot_code' => 'F-19', 'lines' => 51, 'total_kilos' => 854.63, 'kg_per_shift_avg' => 32, 'total_shifts' => 27],
                ],
                17 => [
                    ['lot_code' => 'D-18', 'lines' => 59, 'total_kilos' => 780.89, 'kg_per_shift_avg' => 32, 'total_shifts' => 25],
                    ['lot_code' => 'D-17', 'lines' => 59, 'total_kilos' => 780.89, 'kg_per_shift_avg' => 32, 'total_shifts' => 25],
                    ['lot_code' => 'E-18', 'lines' => 59, 'total_kilos' => 780.89, 'kg_per_shift_avg' => 32, 'total_shifts' => 25],
                    ['lot_code' => 'E-17', 'lines' => 59, 'total_kilos' => 780.89, 'kg_per_shift_avg' => 32, 'total_shifts' => 25],
                    ['lot_code' => 'F-18', 'lines' => 64, 'total_kilos' => 847.07, 'kg_per_shift_avg' => 32, 'total_shifts' => 27],
                    ['lot_code' => 'F-17', 'lines' => 64, 'total_kilos' => 847.07, 'kg_per_shift_avg' => 32, 'total_shifts' => 27],
                ],
            ],
            'ROSITA' => [
                19 => [
                    ['lot_code' => 'D-16', 'lines' => 66, 'total_kilos' => 182.12, 'kg_per_shift_avg' => 20, 'total_shifts' => 10],
                    ['lot_code' => 'D-15', 'lines' => 66, 'total_kilos' => 182.12, 'kg_per_shift_avg' => 20, 'total_shifts' => 10],
                    ['lot_code' => 'E-16', 'lines' => 52, 'total_kilos' => 143.49, 'kg_per_shift_avg' => 20, 'total_shifts' => 8],
                    ['lot_code' => 'E-15', 'lines' => 52, 'total_kilos' => 143.49, 'kg_per_shift_avg' => 20, 'total_shifts' => 8],
                    ['lot_code' => 'F-16', 'lines' => 64, 'total_kilos' => 176.60, 'kg_per_shift_avg' => 20, 'total_shifts' => 9],
                    ['lot_code' => 'F-15', 'lines' => 64, 'total_kilos' => 176.60, 'kg_per_shift_avg' => 20, 'total_shifts' => 9],
                ],
                21 => [
                    ['lot_code' => 'D-13', 'lines' => 36, 'total_kilos' => 112.90, 'kg_per_shift_avg' => 20, 'total_shifts' => 6],
                    ['lot_code' => 'D-14', 'lines' => 59, 'total_kilos' => 185.03, 'kg_per_shift_avg' => 20, 'total_shifts' => 10],
                    ['lot_code' => 'E-13', 'lines' => 59, 'total_kilos' => 185.03, 'kg_per_shift_avg' => 20, 'total_shifts' => 10],
                    ['lot_code' => 'E-14', 'lines' => 59, 'total_kilos' => 185.03, 'kg_per_shift_avg' => 20, 'total_shifts' => 10],
                    ['lot_code' => 'F-13', 'lines' => 64, 'total_kilos' => 200.71, 'kg_per_shift_avg' => 20, 'total_shifts' => 11],
                    ['lot_code' => 'F-14', 'lines' => 64, 'total_kilos' => 200.71, 'kg_per_shift_avg' => 20, 'total_shifts' => 11],
                ],
                23 => [
                    ['lot_code' => 'D-11', 'lines' => 59, 'total_kilos' => 235.90, 'kg_per_shift_avg' => 20, 'total_shifts' => 12],
                    ['lot_code' => 'D-12', 'lines' => 38, 'total_kilos' => 151.93, 'kg_per_shift_avg' => 20, 'total_shifts' => 8],
                    ['lot_code' => 'E-11', 'lines' => 59, 'total_kilos' => 235.90, 'kg_per_shift_avg' => 20, 'total_shifts' => 12],
                    ['lot_code' => 'E-12', 'lines' => 59, 'total_kilos' => 235.90, 'kg_per_shift_avg' => 20, 'total_shifts' => 12],
                    ['lot_code' => 'F-11', 'lines' => 64, 'total_kilos' => 255.89, 'kg_per_shift_avg' => 20, 'total_shifts' => 13],
                    ['lot_code' => 'F-12', 'lines' => 64, 'total_kilos' => 255.89, 'kg_per_shift_avg' => 20, 'total_shifts' => 13],
                ],
                26 => [
                    ['lot_code' => 'D-8', 'lines' => 59, 'total_kilos' => 178, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'D-7', 'lines' => 59, 'total_kilos' => 178, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'E-8', 'lines' => 60, 'total_kilos' => 181, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'E-7', 'lines' => 60, 'total_kilos' => 181, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'F-8', 'lines' => 63, 'total_kilos' => 190, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'F-7', 'lines' => 63, 'total_kilos' => 190, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                ],
                27 => [
                    ['lot_code' => 'D-6', 'lines' => 60, 'total_kilos' => 181.32, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'D-5', 'lines' => 60, 'total_kilos' => 181.32, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'E-6', 'lines' => 60, 'total_kilos' => 181.32, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'E-5', 'lines' => 60, 'total_kilos' => 181.32, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'F-6', 'lines' => 62, 'total_kilos' => 187.36, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                    ['lot_code' => 'F-5', 'lines' => 62, 'total_kilos' => 187.36, 'kg_per_shift_avg' => 25, 'total_shifts' => 8],
                ],
            ],
            'KIRRA' => [
                25 => [
                    ['lot_code' => 'D-10', 'lines' => 58, 'total_kilos' => 3425, 'kg_per_shift_avg' => 30, 'total_shifts' => 115],
                    ['lot_code' => 'D-9', 'lines' => 58, 'total_kilos' => 3425, 'kg_per_shift_avg' => 30, 'total_shifts' => 115],
                    ['lot_code' => 'E-10', 'lines' => 61, 'total_kilos' => 3603, 'kg_per_shift_avg' => 30, 'total_shifts' => 121],
                    ['lot_code' => 'E-9', 'lines' => 61, 'total_kilos' => 3603, 'kg_per_shift_avg' => 30, 'total_shifts' => 121],
                    ['lot_code' => 'F-10', 'lines' => 63, 'total_kilos' => 3721, 'kg_per_shift_avg' => 30, 'total_shifts' => 125],
                    ['lot_code' => 'F-9', 'lines' => 63, 'total_kilos' => 3721, 'kg_per_shift_avg' => 30, 'total_shifts' => 125],
                ],
            ],
            'TERRAPIN' => [
                28 => [
                    ['lot_code' => 'D-4', 'lines' => 60, 'total_kilos' => 850.28, 'kg_per_shift_avg' => 28, 'total_shifts' => 31],
                    ['lot_code' => 'D-3', 'lines' => 60, 'total_kilos' => 850.28, 'kg_per_shift_avg' => 28, 'total_shifts' => 31],
                    ['lot_code' => 'E-4', 'lines' => 61, 'total_kilos' => 864.45, 'kg_per_shift_avg' => 28, 'total_shifts' => 31],
                    ['lot_code' => 'E-3', 'lines' => 61, 'total_kilos' => 864.45, 'kg_per_shift_avg' => 28, 'total_shifts' => 31],
                    ['lot_code' => 'F-4', 'lines' => 62, 'total_kilos' => 878.62, 'kg_per_shift_avg' => 28, 'total_shifts' => 32],
                    ['lot_code' => 'F-3', 'lines' => 62, 'total_kilos' => 878.62, 'kg_per_shift_avg' => 28, 'total_shifts' => 32],
                ],
                29 => [
                    ['lot_code' => 'D-2', 'lines' => 60, 'total_kilos' => 1093.99, 'kg_per_shift_avg' => 28, 'total_shifts' => 40],
                    ['lot_code' => 'D-1', 'lines' => 60, 'total_kilos' => 1093.99, 'kg_per_shift_avg' => 28, 'total_shifts' => 40],
                    ['lot_code' => 'E-2', 'lines' => 60, 'total_kilos' => 1093.99, 'kg_per_shift_avg' => 28, 'total_shifts' => 40],
                    ['lot_code' => 'E-1', 'lines' => 60, 'total_kilos' => 1093.99, 'kg_per_shift_avg' => 28, 'total_shifts' => 40],
                    ['lot_code' => 'F-2', 'lines' => 62, 'total_kilos' => 1130.46, 'kg_per_shift_avg' => 28, 'total_shifts' => 41],
                    ['lot_code' => 'F-1', 'lines' => 62, 'total_kilos' => 1130.46, 'kg_per_shift_avg' => 28, 'total_shifts' => 41],
                ],
            ],
        ];

        foreach ($harvestData as $varietyName => $shifts) {
            $variety = Variety::where('name', $varietyName)->first();
            if (!$variety) {
                $this->command->warn("Variety '{$varietyName}' not found, skipping...");
                continue;
            }

            foreach ($shifts as $shiftNumber => $lots) {
                $shift = Shift::where('name', $shiftNumber)->first();
                if (!$shift) {
                    $this->command->warn("Shift '{$shiftNumber}' not found, skipping...");
                    continue;
                }

                // Create or update the matrix row
                $row = HarvestMatrixRow::updateOrCreate(
                    [
                        'harvest_matrix_id' => $matrix->id,
                        'variety_id' => $variety->id,
                        'shift_id' => $shift->id,
                    ],
                    [
                        'total_kilos' => collect($lots)->sum('total_kilos'),
                        'kg_per_shift_avg' => collect($lots)->avg('kg_per_shift_avg'),
                        'total_shifts' => collect($lots)->sum('total_shifts'),
                    ]
                );

                // Create lots for this row
                foreach ($lots as $lotData) {
                    $lot = Lot::where('code', $lotData['lot_code'])->first();
                    if (!$lot) {
                        $this->command->warn("Lot '{$lotData['lot_code']}' not found, skipping...");
                        continue;
                    }

                    $rowLot = HarvestMatrixRowLot::updateOrCreate(
                        [
                            'harvest_matrix_row_id' => $row->id,
                            'lot_id' => $lot->id,
                        ],
                        [
                            'lines' => $lotData['lines'],
                            'total_kilos' => $lotData['total_kilos'],
                            'kg_per_shift_avg' => $lotData['kg_per_shift_avg'],
                            'total_shifts' => $lotData['total_shifts'],
                        ]
                    );

                    // Create daily data for week 40 (September 29 - October 4, 2025)
                    $week40Start = Carbon::create(2025, 9, 29); // Monday

                    // Specific daily data for all lots in week 40
                    $lotSpecificData = [
                        // RAYMI - Turno 15
                        'D-20' => [
                            4 => ['frequency' => 8, 'kg_per_day' => 2100, 'shifts' => 49],  // Thursday
                            5 => ['frequency' => 9, 'kg_per_day' => 500, 'shifts' => 5],    // Friday
                        ],
                        'D-19' => [
                            4 => ['frequency' => 8, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-20' => [
                            3 => ['frequency' => 6, 'kg_per_day' => 1000, 'shifts' => 25],  // Wednesday
                        ],
                        'E-19' => [
                            5 => ['frequency' => 10, 'kg_per_day' => 2000, 'shifts' => 80], // Friday (5,6 -> 6)
                            6 => ['frequency' => 10, 'kg_per_day' => 500, 'shifts' => 15],  // Saturday
                        ],
                        'F-20' => [
                            5 => ['frequency' => 9, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                            6 => ['frequency' => 10, 'kg_per_day' => 0, 'shifts' => 0],     // Saturday
                        ],
                        'F-19' => [
                            5 => ['frequency' => 10, 'kg_per_day' => 0, 'shifts' => 0],     // Friday (9,10 -> 10)
                        ],
                        
                        // RAYMI - Turno 17
                        'D-18' => [
                            1 => ['frequency' => 11, 'kg_per_day' => 2000, 'shifts' => 47], // Monday
                        ],
                        'D-17' => [
                            1 => ['frequency' => 11, 'kg_per_day' => 0, 'shifts' => 0],     // Monday
                        ],
                        'E-18' => [
                            6 => ['frequency' => 10, 'kg_per_day' => 1910, 'shifts' => 86], // Saturday
                        ],
                        'E-17' => [
                            6 => ['frequency' => 10, 'kg_per_day' => 0, 'shifts' => 0],     // Saturday (9,10 -> 10)
                        ],
                        'F-18' => [
                            5 => ['frequency' => 10, 'kg_per_day' => 0, 'shifts' => 0],     // Friday (9,10 -> 10)
                            6 => ['frequency' => 10, 'kg_per_day' => 95, 'shifts' => 8],    // Saturday
                        ],
                        'F-17' => [
                            1 => ['frequency' => 11, 'kg_per_day' => 813, 'shifts' => 27],  // Monday
                        ],
                        
                        // ROSITA - Turno 19
                        'D-16' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 1004, 'shifts' => 70],  // Thursday
                        ],
                        'D-15' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-16' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-15' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'F-16' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'F-15' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday (6,7 -> 7)
                        ],
                        
                        // ROSITA - Turno 21
                        'D-13' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 1069, 'shifts' => 40],  // Thursday
                        ],
                        'D-14' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-13' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-14' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'F-13' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'F-14' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        
                        // ROSITA - Turno 23
                        'D-11' => [
                            4 => ['frequency' => 5, 'kg_per_day' => 428, 'shifts' => 28],   // Thursday (4,5 -> 5)
                        ],
                        'D-12' => [
                            4 => ['frequency' => 5, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-11' => [
                            4 => ['frequency' => 5, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        'E-12' => [
                            5 => ['frequency' => 6, 'kg_per_day' => 893, 'shifts' => 29],   // Friday (5,6 -> 6)
                        ],
                        'F-11' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 50, 'shifts' => 7],     // Thursday (5 -> 5, 6 -> 6, taking 6)
                        ],
                        'F-12' => [
                            4 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday
                        ],
                        
                        // KIRRA - Turno 25
                        'D-10' => [
                            4 => ['frequency' => 5, 'kg_per_day' => 4000, 'shifts' => 142], // Thursday
                        ],
                        'D-9' => [
                            5 => ['frequency' => 6, 'kg_per_day' => 4217, 'shifts' => 114], // Friday (5,6 -> 6)
                            6 => ['frequency' => 5, 'kg_per_day' => 4342, 'shifts' => 170], // Saturday
                        ],
                        'E-10' => [
                            4 => ['frequency' => 5, 'kg_per_day' => 4213, 'shifts' => 119], // Thursday (4, 5 -> 5)
                        ],
                        'E-9' => [
                            2 => ['frequency' => 4, 'kg_per_day' => 570, 'shifts' => 20],   // Tuesday (3,4 -> 4)
                            4 => ['frequency' => 6, 'kg_per_day' => 4308, 'shifts' => 116], // Thursday (4,5 -> 5, then 6)
                        ],
                        'F-10' => [
                            2 => ['frequency' => 4, 'kg_per_day' => 6231, 'shifts' => 195], // Tuesday (3,4 -> 4)
                            5 => ['frequency' => 5, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        'F-9' => [
                            5 => ['frequency' => 5, 'kg_per_day' => 418, 'shifts' => 20],   // Friday (4,5 -> 5)
                        ],
                        
                        // ROSITA - Turno 26
                        'D-8' => [
                            2 => ['frequency' => 6, 'kg_per_day' => 1100, 'shifts' => 54],  // Tuesday
                        ],
                        'D-7' => [
                            2 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Tuesday
                        ],
                        'E-8' => [
                            2 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Tuesday
                        ],
                        'E-7' => [
                            2 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Tuesday
                        ],
                        'F-8' => [
                            2 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Tuesday
                        ],
                        'F-7' => [
                            2 => ['frequency' => 6, 'kg_per_day' => 0, 'shifts' => 0],      // Tuesday
                        ],
                        
                        // ROSITA - Turno 27
                        'D-6' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 1100, 'shifts' => 80],  // Friday
                        ],
                        'D-5' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        'E-6' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        'E-5' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        'F-6' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday (6,7 -> 7)
                        ],
                        'F-5' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        
                        // TERRAPIN - Turno 28
                        'D-4' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 2173, 'shifts' => 77],  // Friday
                        ],
                        'D-3' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        'E-4' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 3014, 'shifts' => 115], // Thursday (6, 7 -> 7)
                        ],
                        'E-3' => [
                            4 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Thursday (6,7 -> 7)
                        ],
                        'F-4' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        'F-3' => [
                            5 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                        
                        // TERRAPIN - Turno 29
                        'D-2' => [
                            1 => ['frequency' => 7, 'kg_per_day' => 3817, 'shifts' => 118], // Monday (6,7 -> 7)
                        ],
                        'D-1' => [
                            1 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Monday
                        ],
                        'E-2' => [
                            1 => ['frequency' => 7, 'kg_per_day' => 0, 'shifts' => 0],      // Monday
                        ],
                        'E-1' => [
                            4 => ['frequency' => 8, 'kg_per_day' => 2820, 'shifts' => 85],  // Thursday (7, 8 -> 8)
                        ],
                        'F-2' => [
                            5 => ['frequency' => 8, 'kg_per_day' => 0, 'shifts' => 0],      // Friday (7,8 -> 8)
                        ],
                        'F-1' => [
                            5 => ['frequency' => 8, 'kg_per_day' => 0, 'shifts' => 0],      // Friday
                        ],
                    ];

                    // Get the specific data for this lot, or default to zeros
                    $dailyData = $lotSpecificData[$lotData['lot_code']] ?? [];

                    for ($day = 0; $day < 6; $day++) { // Monday to Saturday
                        $date = $week40Start->copy()->addDays($day);
                        $dayOfWeek = $day + 1; // 1=Monday, 2=Tuesday, etc.
                        $dayData = $dailyData[$dayOfWeek] ?? ['frequency' => 0, 'kg_per_day' => 0, 'shifts' => 0];

                        HarvestMatrixDailyData::updateOrCreate(
                            [
                                'harvest_matrix_row_lot_id' => $rowLot->id,
                                'date' => $date,
                            ],
                            [
                                'day_of_week' => $dayOfWeek,
                                'frequency' => $dayData['frequency'],
                                'kg_per_day' => $dayData['kg_per_day'],
                                'shifts' => $dayData['shifts'],
                            ]
                        );
                    }
                }
            }
        }

        $this->command->info("Harvest matrix week 40 populated successfully for Liliana Guzman");
    }
}