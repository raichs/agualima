<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Enums\PermissionEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create all permissions
        foreach (PermissionEnum::cases() as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission->value],
                ['guard_name' => 'web']
            );
        }

        // Create roles with specific permissions
        $this->createAdministratorRole();
        $this->createManagementRole();
        $this->createCropManagerRole();
        $this->createViewerRole();
    }

    /**
     * Create Administrator role with all permissions
     */
    private function createAdministratorRole(): void
    {
        $role = Role::updateOrCreate([
            'name' => RoleEnum::ADMINISTRATOR->value,
            'guard_name' => 'web'
        ], [
            'display_name' => 'Administrador',
            'description' => 'Usuario con acceso completo a todas las funciones del sistema. Puede gestionar usuarios, roles, permisos y todos los módulos.',
        ]);

        // Administrator has ALL permissions
        $role->syncPermissions(Permission::all());
    }

    /**
     * Create Management role (Gerencia)
     */
    private function createManagementRole(): void
    {
        $role = Role::updateOrCreate([
            'name' => RoleEnum::MANAGEMENT->value,
            'guard_name' => 'web'
        ], [
            'display_name' => 'Gerencia',
            'description' => 'Usuario con permisos de visualización general. Puede ver todos los módulos pero no modificar datos.',
        ]);

        $role->syncPermissions([
            // View all
            PermissionEnum::VIEW_USERS->value,
            PermissionEnum::VIEW_PROJECTS->value,
            PermissionEnum::VIEW_VARIETIES->value,
            PermissionEnum::VIEW_SHIFTS->value,
            PermissionEnum::VIEW_LOTS->value,
            PermissionEnum::VIEW_DISTRIBUTIONS->value,
            // Reports
            PermissionEnum::VIEW_REPORTS->value,
            PermissionEnum::EXPORT_REPORTS->value,
        ]);
    }

    /**
     * Create Crop Manager role (Responsable de Cultivo)
     */
    private function createCropManagerRole(): void
    {
        $role = Role::updateOrCreate([
            'name' => RoleEnum::CROP_MANAGER->value,
            'guard_name' => 'web'
        ], [
            'display_name' => 'Responsable de Cultivo',
            'description' => 'Usuario responsable de la gestión operativa de cultivos. Puede gestionar lotes y distribuciones, con permisos limitados en otras áreas.',
        ]);

        $role->syncPermissions([
            // View projects, varieties, shifts (read-only)
            PermissionEnum::VIEW_PROJECTS->value,
            PermissionEnum::VIEW_VARIETIES->value,
            PermissionEnum::VIEW_SHIFTS->value,
            // Full access to lots
            PermissionEnum::VIEW_LOTS->value,
            PermissionEnum::CREATE_LOTS->value,
            PermissionEnum::EDIT_LOTS->value,
            // Full access to distributions
            PermissionEnum::VIEW_DISTRIBUTIONS->value,
            PermissionEnum::CREATE_DISTRIBUTIONS->value,
            PermissionEnum::EDIT_DISTRIBUTIONS->value,
            // View reports
            PermissionEnum::VIEW_REPORTS->value,
        ]);
    }

    /**
     * Create Viewer role (Visualizador)
     */
    private function createViewerRole(): void
    {
        $role = Role::updateOrCreate([
            'name' => RoleEnum::VIEWER->value,
            'guard_name' => 'web'
        ], [
            'display_name' => 'Visualizador',
            'description' => 'Usuario con permisos de solo lectura. Puede ver toda la información del sistema pero no puede modificar nada.',
        ]);

        $role->syncPermissions([
            // Only view permissions
            PermissionEnum::VIEW_PROJECTS->value,
            PermissionEnum::VIEW_VARIETIES->value,
            PermissionEnum::VIEW_SHIFTS->value,
            PermissionEnum::VIEW_LOTS->value,
            PermissionEnum::VIEW_DISTRIBUTIONS->value,
            PermissionEnum::VIEW_REPORTS->value,
        ]);
    }
}
