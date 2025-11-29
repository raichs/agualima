<?php

namespace App\Helpers;

use App\Enums\RoleEnum;
use App\Enums\PermissionEnum;

class RoleHelper
{
    /**
     * Get all roles for select dropdown
     */
    public static function getRolesForSelect(): array
    {
        return RoleEnum::toSelectArray();
    }

    /**
     * Get all permissions grouped by category
     */
    public static function getPermissionsGrouped(): array
    {
        $grouped = [];
        
        foreach (PermissionEnum::cases() as $permission) {
            $group = $permission->group();
            
            if (!isset($grouped[$group])) {
                $grouped[$group] = [];
            }
            
            $grouped[$group][] = [
                'value' => $permission->value,
                'label' => $permission->label(),
            ];
        }
        
        return $grouped;
    }

    /**
     * Get role label from value
     */
    public static function getRoleLabel(string $roleValue): string
    {
        try {
            return RoleEnum::from($roleValue)->label();
        } catch (\ValueError $e) {
            return $roleValue;
        }
    }

    /**
     * Get permission label from value
     */
    public static function getPermissionLabel(string $permissionValue): string
    {
        try {
            return PermissionEnum::from($permissionValue)->label();
        } catch (\ValueError $e) {
            return $permissionValue;
        }
    }
}
