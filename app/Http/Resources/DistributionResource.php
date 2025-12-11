<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DistributionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'campaign_id' => $this->campaign_id,
            'campaign_name' => $this->campaign->name ?? '',
            'project_id' => $this->project_id,
            'project_name' => $this->project->name ?? '',
            'variety_id' => $this->variety_id,
            'variety_name' => $this->variety->name ?? '',
            'shift_id' => $this->shift_id,
            'shift_name' => $this->shift->name ?? '',
            'lot_id' => $this->lot_id,
            'lot_code' => $this->lot->code ?? '',
            'lot_name' => $this->lot->name ?? '',
            'total_area' => $this->total_area,
            'campaign_number' => $this->campaign_number,
            'density' => $this->density,
            'planting_date' => $this->planting_date ? \Carbon\Carbon::parse($this->planting_date)->format('Y-m-d') : null,
            'pruning_date' => $this->pruning_date ? \Carbon\Carbon::parse($this->pruning_date)->format('Y-m-d') : null,
            'is_active' => $this->is_active,
        ];
    }
}
