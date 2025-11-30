<?php

namespace App\Http\Resources;

use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Traducir el nombre del rol si es un enum válido
        $label = $this->name;
        try {
            $roleEnum = RoleEnum::from($this->name);
            $label = $roleEnum->label();
        } catch (\ValueError $e) {
            $label = $this->name;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,      // Valor en inglés (super_admin)
            'label' => $label,          // Valor traducido (Super Administrador)
            'guard_name' => $this->guard_name,
        ];
    }
}
