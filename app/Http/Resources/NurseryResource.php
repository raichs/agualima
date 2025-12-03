<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NurseryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'country_id' => $this->country_id,
            'country_name' => $this->country ? $this->country->name : null,
            'country' => $this->country ? new CountryResource($this->country) : null,
            'is_active' => $this->is_active,
        ];
    }
}
