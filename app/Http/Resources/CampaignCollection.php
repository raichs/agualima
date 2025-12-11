<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CampaignCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($campaign) {
            return [
                'id' => $campaign->id,
                'name' => $campaign->name,
                'start_date' => $campaign->start_date ? \Carbon\Carbon::parse($campaign->start_date)->format('d/m/Y') : null,
                'end_date' => $campaign->end_date ? \Carbon\Carbon::parse($campaign->end_date)->format('d/m/Y') : null,
                'actual_end_date' => $campaign->actual_end_date ? \Carbon\Carbon::parse($campaign->actual_end_date)->format('d/m/Y') : null,
                'pruning_period_start' => $campaign->pruning_period_start ? \Carbon\Carbon::parse($campaign->pruning_period_start)->format('d/m/Y') : null,
                'pruning_period_end' => $campaign->pruning_period_end ? \Carbon\Carbon::parse($campaign->pruning_period_end)->format('d/m/Y') : null,
                'status' => $campaign->status,
                'target_total_kg' => $campaign->target_total_kg,
                'actual_total_kg' => $campaign->actual_total_kg,
                'climate_notes' => $campaign->climate_notes,
                'agronomic_notes' => $campaign->agronomic_notes,
                'closing_notes' => $campaign->closing_notes,
                'is_active' => $campaign->is_active,
            ];
        })->toArray();
    }
}
