<?php

namespace Database\Seeders;

use App\Models\Shift;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shifts = [
            ['name' => '6A', 'description' => '6A'],
            ['name' => '6B', 'description' => '6B'],
            ['name' => '7A', 'description' => '7A'],
            ['name' => '7B', 'description' => '7B'],
            ['name' => '8', 'description' => '8'],
            ['name' => '10', 'description' => '10'],
            ['name' => '11', 'description' => '11'],
            ['name' => '12', 'description' => '12'],
            ['name' => '13', 'description' => '13'],
            ['name' => '14', 'description' => '14'],
            ['name' => '15', 'description' => '15'],
            ['name' => '16', 'description' => '16'],
            ['name' => '17', 'description' => '17'],
            ['name' => '18', 'description' => '18'],
            ['name' => '19', 'description' => '19'],
            ['name' => '20', 'description' => '20'],
            ['name' => '21', 'description' => '21'],
            ['name' => '22', 'description' => '22'],
            ['name' => '23', 'description' => '23'],
            ['name' => '24', 'description' => '24'],
            ['name' => '25', 'description' => '25'],
            ['name' => '26', 'description' => '26'],
            ['name' => '27', 'description' => '27'],
            ['name' => '28', 'description' => '28'],
            ['name' => '29', 'description' => '29'],
            ['name' => '30', 'description' => '30'],
            ['name' => '31', 'description' => '31'],
            ['name' => '32', 'description' => '32'],
            ['name' => '33', 'description' => '33'],
            ['name' => '34', 'description' => '34'],
            ['name' => '35', 'description' => '35'],
            ['name' => '36', 'description' => '36'],
            ['name' => '37', 'description' => '37'],
            ['name' => '38', 'description' => '38'],
            ['name' => '39', 'description' => '39'],
            ['name' => '40', 'description' => '40'],
            ['name' => '41', 'description' => '41'],
            ['name' => '42AB', 'description' => '42AB'],
            ['name' => '42C', 'description' => '42C'],
            ['name' => '43', 'description' => '43'],
            ['name' => '44', 'description' => '44'],
        ];

        foreach ($shifts as $shift) {
            Shift::firstOrCreate($shift);
        }
    }
}
