<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Nursery;
use Illuminate\Database\Seeder;

class NurserySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $peru = Country::where('code', 'PE')->first();

        if (!$peru) {
            throw new \Exception('Country Peru (PE) not found in database.');
        }

        $nurseries = [
            ['name' => 'Planasa', 'description' => 'Vivero Planasa', 'country_id' => $peru->id],
            ['name' => 'Driscolls', 'description' => 'Vivero Driscolls', 'country_id' => $peru->id],
            ['name' => 'Fall Creek', 'description' => 'Vivero Fall Creek', 'country_id' => $peru->id],
            ['name' => 'Variedades Agualima', 'description' => 'Vivero Variedades Agualima', 'country_id' => $peru->id],
        ];

        foreach ($nurseries as $nursery) {
            Nursery::create($nursery);
        }
    }
}
