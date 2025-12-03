<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HarvestMatrixCollection extends ResourceCollection
{
    /**
     * The resource that this resource collects.
     *
     * @var string
     */
    public $collects = HarvestMatrixResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($harvestMatrix) {
            return [
                'id' => $harvestMatrix->id,
                'week_number' => $harvestMatrix->week_number,
                'year' => $harvestMatrix->year,
                'created_at' => $harvestMatrix->created_at ? \Carbon\Carbon::parse($harvestMatrix->created_at)->format('d/m/Y H:i') : null,
                'user' => $harvestMatrix->user,
                'is_active' => $harvestMatrix->is_active,
            ];
        })->toArray();
    }
}
