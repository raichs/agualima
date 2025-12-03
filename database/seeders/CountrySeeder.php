<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('data/countries.csv');

        if (!file_exists($csvFile)) {
            throw new \Exception("CSV file not found: $csvFile");
        }

        $handle = fopen($csvFile, 'r');

        if ($handle === false) {
            throw new \Exception("Unable to open CSV file: $csvFile");
        }

        // Skip header row
        fgetcsv($handle);

        while (($row = fgetcsv($handle)) !== false) {
            if (count($row) < 5) {
                continue; // Skip rows with insufficient columns
            }

            $name = trim($row[0]); // First column
            $code = trim($row[4]); // Fifth column (iso2)

            if (!empty($name) && !empty($code)) {
                Country::firstOrCreate(
                    ['code' => $code],
                    ['name' => $name]
                );
            }
        }

        fclose($handle);
    }
}
