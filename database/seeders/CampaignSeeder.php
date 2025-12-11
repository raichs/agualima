<?php

namespace Database\Seeders;

use App\Models\Campaign;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = now()->year; // 2025

        $campaigns = [
            [
                'name' => 'Campaña ' . $currentYear,
                'start_date' => Carbon::create($currentYear, 1, 1),
                'end_date' => Carbon::create($currentYear, 12, 31),
                'pruning_period_start' => Carbon::create($currentYear, 1, 1),
                'pruning_period_end' => Carbon::create($currentYear, 1, 14),
                'status' => Campaign::STATUS_EN_PROGRESO,
                'target_total_kg' => 12500,
                'actual_total_kg' => 12850,
                'climate_notes' => 'Temporada con buenas condiciones climáticas, lluvias moderadas.',
                'agronomic_notes' => 'Buen desarrollo vegetativo, aplicación de fertilizantes orgánicos.',
                'closing_notes' => '',
            ],
            [
                'name' => 'Campaña ' . ($currentYear + 1),
                'start_date' => Carbon::create($currentYear + 1, 1, 1),
                'end_date' => Carbon::create($currentYear + 1, 12, 31),
                'pruning_period_start' => Carbon::create($currentYear + 1, 1, 1),
                'pruning_period_end' => Carbon::create($currentYear + 1, 1, 14),
                'status' => Campaign::STATUS_PLANIFICADA,
                'target_total_kg' => 14500,
                'actual_total_kg' => null,
                'climate_notes' => null,
                'agronomic_notes' => 'Planificación inicial de variedades y distribución de lotes.',
                'closing_notes' => null,
            ],
        ];

        foreach ($campaigns as $campaign) {
            Campaign::updateOrCreate(
                ['name' => $campaign['name']],
                $campaign
            );
        }
    }
}