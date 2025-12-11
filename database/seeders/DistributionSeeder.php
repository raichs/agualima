<?php

namespace Database\Seeders;

use App\Models\Distribution;
use App\Models\Project;
use App\Models\Variety;
use App\Models\Shift;
use App\Models\Lot;
use App\Models\Campaign;
use Illuminate\Database\Seeder;

class DistributionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('data/data_lotes_arandanos.csv');

        if (!file_exists($csvFile)) {
            $this->command->error("CSV file not found: {$csvFile}");
            return;
        }

        // Get the first campaign from 2025
        $campaign = Campaign::whereYear('start_date', 2025)->orderBy('start_date')->first();

        if (!$campaign) {
            $this->command->error("No campaign found for 2025. Please run CampaignSeeder first.");
            return;
        }

        $file = fopen($csvFile, 'r');

        // Skip header row
        fgetcsv($file);

        $count = 0;
        $errors = 0;

        while (($row = fgetcsv($file)) !== false) {
            // Skip empty rows
            if (empty($row[0])) {
                continue;
            }

            $projectName = trim($row[0]);
            $varietyName = trim($row[1]);
            $shiftName = trim($row[2]);
            $lotCode = trim($row[3]);
            $totalArea = !empty($row[4]) ? str_replace(',', '.', trim($row[4])) : null;
            $campaignNumber = !empty($row[5]) ? trim($row[5]) : null;
            $density = !empty($row[6]) ? trim($row[6]) : null;
            $plantingDate = !empty($row[7]) ? $this->parseDate($row[7]) : null;
            $pruningDate = !empty($row[8]) ? $this->parseDate($row[8]) : null;

            $project = Project::where('name', $projectName)->first();
            $variety = Variety::where('name', $varietyName)->first();
            $shift = Shift::where('name', $shiftName)->first();
            $lot = Lot::where('code', $lotCode)->first();

            if ($project && $variety && $shift && $lot) {
                Distribution::updateOrCreate(
                    [
                        'campaign_id' => $campaign->id,
                        'project_id' => $project->id,
                        'variety_id' => $variety->id,
                        'shift_id' => $shift->id,
                        'lot_id' => $lot->id,
                    ],
                    [
                        'total_area' => $totalArea,
                        'campaign_number' => $campaignNumber,
                        'density' => $density,
                        'planting_date' => $plantingDate,
                        'pruning_date' => $pruningDate,
                    ]
                );
                $count++;
            } else {
                $this->command->warn("Missing data for: Project={$projectName}, Variety={$varietyName}, Shift={$shiftName}, Lot={$lotCode}");
                $errors++;
            }
        }

        fclose($file);
    }

    /**
     * Parse date from DD/MM/YYYY format to YYYY-MM-DD
     */
    private function parseDate($date): ?string
    {
        if (empty($date)) {
            return null;
        }

        $date = trim($date);

        // Check if date is in DD/MM/YYYY format
        if (preg_match('/^(\d{2})\/(\d{2})\/(\d{4})$/', $date, $matches)) {
            return "{$matches[3]}-{$matches[2]}-{$matches[1]}";
        }

        return null;
    }
}
