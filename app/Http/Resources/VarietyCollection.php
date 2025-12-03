<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VarietyCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($variety) {
            return [
                'id' => $variety->id,
                'name' => $variety->name,
                'description' => $variety->description,
                'nursery_name' => $variety->nursery?->name,
                'is_active' => $variety->is_active,
            ];
        })->toArray();
    }
}
