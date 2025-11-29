<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            ['name' => 'IA', 'description' => 'IA'],
            ['name' => 'IB', 'description' => 'IB'],
            ['name' => 'IIA', 'description' => 'IIA'],
            ['name' => 'IIB', 'description' => 'IIB'],
            ['name' => 'III', 'description' => 'III'],
            ['name' => 'IVA', 'description' => 'IVA'],
            ['name' => 'IVB', 'description' => 'IVB'],
            ['name' => 'V', 'description' => 'V'],
            ['name' => 'VI', 'description' => 'VI'],
            ['name' => 'VIAB', 'description' => 'VIAB'],
            ['name' => 'VII', 'description' => 'VII'],
            ['name' => 'VIII', 'description' => 'VIII'],
            ['name' => 'X', 'description' => 'X'],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
