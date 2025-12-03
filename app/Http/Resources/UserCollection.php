<?php

namespace App\Http\Resources;

use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($user) {
            return [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'name' => $user->name,
                'dni' => $user->dni,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'roles' => $user->roles->pluck('display_name'),
                'role_id' => $user->roles->first()?->id,
                'role_name' => $user->roles->first()?->display_name,
            ];
        })->toArray();
    }
}
