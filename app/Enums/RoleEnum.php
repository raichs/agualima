<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super_admin';
    case MANAGEMENT = 'management';
    case ADMINISTRATOR = 'administrator';
    case CROP_MANAGER = 'crop_manager';
    case VIEWER = 'viewer';

    /**
     * Get the translated label for the role
     */
    public function label(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Super Administrador',
            self::MANAGEMENT => 'Gerencia',
            self::ADMINISTRATOR => 'Administrador',
            self::CROP_MANAGER => 'Responsable de Cultivo',
            self::VIEWER => 'Visualizador',
        };
    }

    /**
     * Get the description for the role
     */
    public function description(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Acceso total al sistema, gestión de usuarios y configuración',
            self::MANAGEMENT => 'Acceso a reportes gerenciales y visualización de datos estratégicos',
            self::ADMINISTRATOR => 'Gestión administrativa y operativa del sistema',
            self::CROP_MANAGER => 'Gestión de cultivos, lotes y distribuciones',
            self::VIEWER => 'Solo visualización de información',
        };
    }

    /**
     * Get all roles as array with labels
     */
    public static function toSelectArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($role) => [$role->value => $role->label()])
            ->toArray();
    }

    /**
     * Check if role is super admin
     */
    public function isSuperAdmin(): bool
    {
        return $this === self::SUPER_ADMIN;
    }
}
