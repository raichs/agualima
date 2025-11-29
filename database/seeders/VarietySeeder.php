<?php

namespace Database\Seeders;

use App\Models\Variety;
use Illuminate\Database\Seeder;

class VarietySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $varieties = [
            'Madeira',
            'Biloxi',
            'Raymi',
            'Malibu',
            'Rosita',
            'Ventura',
            'Kirra',
            'Terrapin',
            'Manila',
            'Sekoya',
            // 'IB5',
            // 'SIN CULTIVO',
        ];

        foreach ($varieties as $variety) {
            Variety::firstOrCreate(['name' => $variety, 'description' => $variety]);
        }
    }
}
