import { MenuItemType } from '@/types/menu';

export const MENU_ITEMS: MenuItemType[] = [
    {
        key: 'home',
        label: 'Inicio',
        is_title: true,
    },
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'tabler:dashboard',
        url: '/admin/dashboard',
    },
    {
        key: 'security',
        label: 'Seguridad y Permisos',
        is_title: true,
    },
    {
        key: 'roles',
        label: 'Roles',
        icon: 'tabler:shield-check',
        url: '/admin/roles',
    },
    {
        key: 'users',
        label: 'Usuarios',
        icon: 'tabler:users',
        url: '/admin/users',
    },
    {
        key: 'Components',
        label: 'ADMINISTRACIÓN',
        is_title: true,
    },
    {
        key: 'nurseries',
        label: 'Viveros',
        icon: 'tabler:tree',
        url: '/admin/nurseries',
    },
    {
        key: 'projects',
        label: 'Proyectos',
        icon: 'tabler:folder-cog',
        url: '/admin/projects',
    },
    {
        key: 'varieties',
        label: 'Variedades',
        icon: 'tabler:leaf',
        url: '/admin/varieties',
    },
    {
        key: 'shifts',
        label: 'Turnos',
        icon: 'tabler:clock',
        url: '/admin/shifts',
    },
    {
        key: 'lots',
        label: 'Lotes',
        icon: 'tabler:grid-3x3',
        url: '/admin/lots',
    },
    {
        key: 'process',
        label: 'PROCESOS',
        is_title: true,
    },
    {
        key: 'distributions',
        label: 'Distribución de Lotes',
        icon: 'tabler:grid-dots',
        url: '/admin/distributions',
    },
    {
        key: 'harvest-matrices',
        label: 'Matrices de Cosecha',
        icon: 'tabler:calendar-event',
        url: '/admin/harvest-matrices',
    },
];

export const HORIZONTAL_MENU_ITEM: MenuItemType[] = [];
