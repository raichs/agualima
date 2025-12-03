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
                'total_area' => $distribution->total_area,
                'campaign_number' => $distribution->campaign_number,
                'density' => $distribution->density,
                'planting_date' => $distribution->planting_date ? \Carbon\Carbon::parse($distribution->planting_date)->format('d/m/Y') : null,
                'pruning_date' => $distribution->pruning_date ? \Carbon\Carbon::parse($distribution->pruning_date)->format('d/m/Y') : null,
                'is_active' => $distribution->is_active,
            ];
        })->toArray();
    }
}
