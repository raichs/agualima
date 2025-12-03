<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShiftCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($shift) {
            return [
                'id' => $shift->id,
                'name' => $shift->name,
                'is_active' => $shift->is_active,
            ];
        })->toArray();
    }
}
