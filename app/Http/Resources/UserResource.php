<?php

namespace App\Http\Resources;

use App\Enums\RoleEnum;
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
        $role = $this->roles->first();
        $roleValue = $role?->name;

        // Traducir el rol si es un enum válido
        $roleLabel = $roleValue;
        if ($roleValue) {
            try {
                $roleEnum = RoleEnum::from($roleValue);
                $roleLabel = $roleEnum->label();
            } catch (\ValueError $e) {
                $roleLabel = $roleValue;
            }
        }

        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'name' => $this->name,
            'dni' => $this->dni,
            'email' => $this->email,
            'roles' => $this->roles->pluck('name'),
            'role_id' => $role?->id,
            'role_value' => $roleValue,
            'role_name' => $roleLabel,
        ];
    }
}
