<?php

namespace Database\Seeders;

use App\Models\Variety;
use App\Models\Nursery;
use Illuminate\Database\Seeder;

class VarietySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener viveros por nombre
        $nurseries = Nursery::pluck('id', 'name')->toArray();

        $varieties = [
            // Planasa
            ['name' => 'Madeira', 'nursery_name' => 'Planasa'],
            ['name' => 'Biloxi', 'nursery_name' => 'Variedades Agualima'],
            ['name' => 'Raymi', 'nursery_name' => 'Driscolls'],
            ['name' => 'Malibu', 'nursery_name' => 'Planasa'],
            ['name' => 'Rosita', 'nursery_name' => 'Driscolls'],
            ['name' => 'Ventura', 'nursery_name' => 'Variedades Agualima'],
            ['name' => 'Kirra', 'nursery_name' => 'Driscolls'],
            ['name' => 'Terrapin', 'nursery_name' => 'Driscolls'],
            ['name' => 'Manila', 'nursery_name' => 'Planasa'],
            ['name' => 'Sekoya', 'nursery_name' => 'Fall Creek'],
            ['name' => 'IB5', 'nursery_name' => null],
            ['name' => 'SIN CULTIVO', 'nursery_name' => null],
        ];

        foreach ($varieties as $varietyData) {
            $nurseryId = $nurseries[$varietyData['nursery_name']] ?? null;

            Variety::firstOrCreate(
                ['name' => $varietyData['name']],
                [
                    'nursery_id' => $nurseryId,
                    'description' => $varietyData['name']
                ]
            );
        }
    }
}
