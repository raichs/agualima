<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'key' => 'home',
                'label' => 'Inicio',
                'is_title' => true,
                'order' => 1,
            ],
            [
                'key' => 'dashboard',
                'label' => 'Dashboard',
                'icon' => 'tabler:dashboard',
                'url' => '/admin/dashboard',
                'permission' => 'view_dashboard',
                'order' => 2,
            ],
            [
                'key' => 'security',
                'label' => 'Seguridad y Permisos',
                'is_title' => true,
                'order' => 3,
            ],
            [
                'key' => 'roles',
                'label' => 'Roles',
                'icon' => 'tabler:shield-check',
                'url' => '/admin/roles',
                'permission' => 'view_roles',
                'order' => 4,
            ],
            [
                'key' => 'users',
                'label' => 'Usuarios',
                'icon' => 'tabler:users',
                'url' => '/admin/users',
                'permission' => 'view_users',
                'order' => 5,
            ],
            [
                'key' => 'Components',
                'label' => 'Administración',
                'is_title' => true,
                'order' => 6,
            ],
            [
                'key' => 'campaigns',
                'label' => 'Campañas',
                'icon' => 'tabler:calendar-event',
                'url' => '/admin/campaigns',
                'permission' => 'view_campaigns',
                'order' => 7,
            ],
            [
                'key' => 'nurseries',
                'label' => 'Viveros',
                'icon' => 'tabler:tree',
                'url' => '/admin/nurseries',
                'permission' => 'view_nurseries',
                'order' => 8,
            ],
            [
                'key' => 'projects',
                'label' => 'Proyectos',
                'icon' => 'tabler:folder-cog',
                'url' => '/admin/projects',
                'permission' => 'view_projects',
                'order' => 9,
            ],
            [
                'key' => 'varieties',
                'label' => 'Variedades',
                'icon' => 'tabler:leaf',
                'url' => '/admin/varieties',
                'permission' => 'view_varieties',
                'order' => 10,
            ],
            [
                'key' => 'shifts',
                'label' => 'Turnos',
                'icon' => 'tabler:clock',
                'url' => '/admin/shifts',
                'permission' => 'view_shifts',
                'order' => 11,
            ],
            [
                'key' => 'lots',
                'label' => 'Lotes',
                'icon' => 'tabler:grid-3x3',
                'url' => '/admin/lots',
                'permission' => 'view_lots',
                'order' => 12,
            ],
            [
                'key' => 'process',
                'label' => 'Procesos',
                'is_title' => true,
                'order' => 13,
            ],
            [
                'key' => 'distributions',
                'label' => 'Distribución de Lotes',
                'icon' => 'tabler:grid-dots',
                'url' => '/admin/distributions',
                'permission' => 'view_distributions',
                'order' => 14,
            ],
            [
                'key' => 'harvest-matrices',
                'label' => 'Matrices de Cosecha',
                'icon' => 'tabler:calendar-event',
                'url' => '/admin/harvest-matrices',
                'permission' => 'view_harvest_matrices',
                'order' => 15,
            ],
        ];

        foreach ($menus as $menu) {
            $createdMenu = Menu::updateOrCreate(
                ['key' => $menu['key']],
                $menu
            );

            // Create permission if it exists
            if (!empty($menu['permission'])) {
                Permission::firstOrCreate([
                    'name' => $menu['permission'],
                    'guard_name' => 'web'
                ]);
            }
        }
    }
}
