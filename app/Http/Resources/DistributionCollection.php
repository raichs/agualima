<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DistributionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($distribution) {
            return [
                'id' => $distribution->id,
                'project_id' => $distribution->project_id,
                'project_name' => $distribution->project->name ?? '',
                'variety_id' => $distribution->variety_id,
                'variety_name' => $distribution->variety->name ?? '',
                'shift_id' => $distribution->shift_id,
                'shift_name' => $distribution->shift->name ?? '',
                'lot_id' => $distribution->lot_id,
                'lot_code' => $distribution->lot->code ?? '',
                'lot_name' => $distribution->lot->name ?? '',
            ];
        })->toArray();
    }
}
