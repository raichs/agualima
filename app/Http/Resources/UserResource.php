<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'name' => $this->name,
            'dni' => $this->dni,
            'email' => $this->email,
            'roles' => $this->roles->pluck('display_name'),
            'role_id' => $this->roles->first()?->id,
            'role_name' => $this->roles->first()?->display_name,
            'is_active' => $this->is_active,
        ];
    }
}
