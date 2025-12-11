<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignResource extends JsonResource
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
            'name' => $this->name,
            'start_date' => $this->start_date ? \Carbon\Carbon::parse($this->start_date)->format('Y-m-d') : null,
            'end_date' => $this->end_date ? \Carbon\Carbon::parse($this->end_date)->format('Y-m-d') : null,
            'actual_end_date' => $this->actual_end_date ? \Carbon\Carbon::parse($this->actual_end_date)->format('Y-m-d') : null,
            'pruning_period_start' => $this->pruning_period_start ? \Carbon\Carbon::parse($this->pruning_period_start)->format('Y-m-d') : null,
            'pruning_period_end' => $this->pruning_period_end ? \Carbon\Carbon::parse($this->pruning_period_end)->format('Y-m-d') : null,
            'status' => $this->status,
            'target_total_kg' => $this->target_total_kg,
            'actual_total_kg' => $this->actual_total_kg,
            'climate_notes' => $this->climate_notes,
            'agronomic_notes' => $this->agronomic_notes,
            'closing_notes' => $this->closing_notes,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
