<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LotCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($lot) {
            return [
                'id' => $lot->id,
                'code' => $lot->code,
                'name' => $lot->name ?? null,
                'description' => $lot->description ?? null,
            ];
        })->toArray();
    }
}
