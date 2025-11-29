<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Enums\PermissionEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

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
        $this->createSuperAdminRole();
        $this->createManagementRole();
        $this->createAdministratorRole();
        $this->createCropManagerRole();
        $this->createViewerRole();
    }

    /**
     * Create Super Admin role with all permissions
     */
    private function createSuperAdminRole(): void
    {
        $role = Role::firstOrCreate([
            'name' => RoleEnum::SUPER_ADMIN->value,
            'guard_name' => 'web'
        ]);

        // Super admin has ALL permissions
        $role->syncPermissions(Permission::all());
    }

    /**
     * Create Management role (Gerencia)
     */
    private function createManagementRole(): void
    {
        $role = Role::firstOrCreate([
            'name' => RoleEnum::MANAGEMENT->value,
            'guard_name' => 'web'
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
     * Create Administrator role
     */
    private function createAdministratorRole(): void
    {
        $role = Role::firstOrCreate([
            'name' => RoleEnum::ADMINISTRATOR->value,
            'guard_name' => 'web'
        ]);

        $role->syncPermissions([
            // Projects
            PermissionEnum::VIEW_PROJECTS->value,
            PermissionEnum::CREATE_PROJECTS->value,
            PermissionEnum::EDIT_PROJECTS->value,
            PermissionEnum::DELETE_PROJECTS->value,
            // Varieties
            PermissionEnum::VIEW_VARIETIES->value,
            PermissionEnum::CREATE_VARIETIES->value,
            PermissionEnum::EDIT_VARIETIES->value,
            PermissionEnum::DELETE_VARIETIES->value,
            // Shifts
            PermissionEnum::VIEW_SHIFTS->value,
            PermissionEnum::CREATE_SHIFTS->value,
            PermissionEnum::EDIT_SHIFTS->value,
            PermissionEnum::DELETE_SHIFTS->value,
            // Lots
            PermissionEnum::VIEW_LOTS->value,
            PermissionEnum::CREATE_LOTS->value,
            PermissionEnum::EDIT_LOTS->value,
            PermissionEnum::DELETE_LOTS->value,
            // Distributions
            PermissionEnum::VIEW_DISTRIBUTIONS->value,
            PermissionEnum::CREATE_DISTRIBUTIONS->value,
            PermissionEnum::EDIT_DISTRIBUTIONS->value,
            PermissionEnum::DELETE_DISTRIBUTIONS->value,
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
        $role = Role::firstOrCreate([
            'name' => RoleEnum::CROP_MANAGER->value,
            'guard_name' => 'web'
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
        $role = Role::firstOrCreate([
            'name' => RoleEnum::VIEWER->value,
            'guard_name' => 'web'
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
