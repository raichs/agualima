<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // Dashboard
    case VIEW_DASHBOARD = 'view_dashboard';

    // User Management
    case VIEW_USERS = 'view_users';
    case CREATE_USERS = 'create_users';
    case EDIT_USERS = 'edit_users';
    case DELETE_USERS = 'delete_users';

    // Project Management
    case VIEW_PROJECTS = 'view_projects';
    case CREATE_PROJECTS = 'create_projects';
    case EDIT_PROJECTS = 'edit_projects';
    case DELETE_PROJECTS = 'delete_projects';

    // Variety Management
    case VIEW_VARIETIES = 'view_varieties';
    case CREATE_VARIETIES = 'create_varieties';
    case EDIT_VARIETIES = 'edit_varieties';
    case DELETE_VARIETIES = 'delete_varieties';

    // Shift Management
    case VIEW_SHIFTS = 'view_shifts';
    case CREATE_SHIFTS = 'create_shifts';
    case EDIT_SHIFTS = 'edit_shifts';
    case DELETE_SHIFTS = 'delete_shifts';

    // Lot Management
    case VIEW_LOTS = 'view_lots';
    case CREATE_LOTS = 'create_lots';
    case EDIT_LOTS = 'edit_lots';
    case DELETE_LOTS = 'delete_lots';

    // Distribution Management
    case VIEW_DISTRIBUTIONS = 'view_distributions';
    case CREATE_DISTRIBUTIONS = 'create_distributions';
    case EDIT_DISTRIBUTIONS = 'edit_distributions';
    case DELETE_DISTRIBUTIONS = 'delete_distributions';

    // Harvest Matrix Management
    case VIEW_HARVEST_MATRICES = 'view_harvest_matrices';

    // Reports
    case VIEW_REPORTS = 'view_reports';
    case EXPORT_REPORTS = 'export_reports';

    /**
     * Get the translated label for the permission
     */
    public function label(): string
    {
        return match($this) {
            // Users
            self::VIEW_USERS => 'Ver Usuarios',
            self::CREATE_USERS => 'Crear Usuarios',
            self::EDIT_USERS => 'Editar Usuarios',
            self::DELETE_USERS => 'Eliminar Usuarios',

            // Projects
            self::VIEW_PROJECTS => 'Ver Proyectos',
            self::CREATE_PROJECTS => 'Crear Proyectos',
            self::EDIT_PROJECTS => 'Editar Proyectos',
            self::DELETE_PROJECTS => 'Eliminar Proyectos',

            // Varieties
            self::VIEW_VARIETIES => 'Ver Variedades',
            self::CREATE_VARIETIES => 'Crear Variedades',
            self::EDIT_VARIETIES => 'Editar Variedades',
            self::DELETE_VARIETIES => 'Eliminar Variedades',

            // Shifts
            self::VIEW_SHIFTS => 'Ver Turnos',
            self::CREATE_SHIFTS => 'Crear Turnos',
            self::EDIT_SHIFTS => 'Editar Turnos',
            self::DELETE_SHIFTS => 'Eliminar Turnos',

            // Lots
            self::VIEW_LOTS => 'Ver Lotes',
            self::CREATE_LOTS => 'Crear Lotes',
            self::EDIT_LOTS => 'Editar Lotes',
            self::DELETE_LOTS => 'Eliminar Lotes',

            // Distributions
            self::VIEW_DISTRIBUTIONS => 'Ver Distribuciones',
            self::CREATE_DISTRIBUTIONS => 'Crear Distribuciones',
            self::EDIT_DISTRIBUTIONS => 'Editar Distribuciones',
            self::DELETE_DISTRIBUTIONS => 'Eliminar Distribuciones',

            // Reports
            self::VIEW_REPORTS => 'Ver Reportes',
            self::EXPORT_REPORTS => 'Exportar Reportes',
        };
    }

    /**
     * Get permission group
     */
    public function group(): string
    {
        return match($this) {
            self::VIEW_USERS, self::CREATE_USERS, self::EDIT_USERS, self::DELETE_USERS 
                => 'Usuarios',
            self::VIEW_PROJECTS, self::CREATE_PROJECTS, self::EDIT_PROJECTS, self::DELETE_PROJECTS 
                => 'Proyectos',
            self::VIEW_VARIETIES, self::CREATE_VARIETIES, self::EDIT_VARIETIES, self::DELETE_VARIETIES 
                => 'Variedades',
            self::VIEW_SHIFTS, self::CREATE_SHIFTS, self::EDIT_SHIFTS, self::DELETE_SHIFTS 
                => 'Turnos',
            self::VIEW_LOTS, self::CREATE_LOTS, self::EDIT_LOTS, self::DELETE_LOTS 
                => 'Lotes',
            self::VIEW_DISTRIBUTIONS, self::CREATE_DISTRIBUTIONS, self::EDIT_DISTRIBUTIONS, self::DELETE_DISTRIBUTIONS 
                => 'Distribuciones',
            self::VIEW_REPORTS, self::EXPORT_REPORTS 
                => 'Reportes',
        };
    }
}
