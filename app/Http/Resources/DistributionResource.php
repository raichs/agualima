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
            'project_id' => $this->project_id,
            'project_name' => $this->project->name ?? '',
            'variety_id' => $this->variety_id,
            'variety_name' => $this->variety->name ?? '',
            'shift_id' => $this->shift_id,
            'shift_name' => $this->shift->name ?? '',
            'lot_id' => $this->lot_id,
            'lot_code' => $this->lot->code ?? '',
            'lot_name' => $this->lot->name ?? '',
        ];
    }
}
