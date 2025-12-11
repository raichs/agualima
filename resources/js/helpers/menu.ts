import { HORIZONTAL_MENU_ITEM, MENU_ITEMS } from '@/data/menu-items';
import { MenuItemType } from '@/types/menu';
import { usePage } from '@inertiajs/react';

export const useMenuItems = (): MenuItemType[] => {
    const { menus } = usePage().props as any;
    return menus || MENU_ITEMS; // fallback a MENU_ITEMS si no hay menus dinámicos
};

export const getMenuItems = (): MenuItemType[] => {
    // Deprecated, use useMenuItems hook instead
    return MENU_ITEMS;
};
export const getHorizontalMenuItems = (): MenuItemType[] => {
    return HORIZONTAL_MENU_ITEM;
};

export const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
    let parents: string[] = [];
    const parent = findMenuItem(menuItems, menuItem.parent_key);
    if (parent) {
        parents.push(parent.key);
        if (parent.parent_key) {
            parents = [...parents, ...findAllParent(menuItems, parent)];
        }
    }
    return parents;
};

export const getMenuItemFromURL = (items: MenuItemType | MenuItemType[], url: string): MenuItemType | undefined => {
    if (items instanceof Array) {
        for (const item of items) {
            const foundItem = getMenuItemFromURL(item, url);
            if (foundItem) {
                return foundItem;
            }
        }
    } else {
        // Skip items without URL or title items
        if (!items.url || items.is_title) {
            if (items.children != null) {
                for (const item of items.children) {
                    const childMatch = getMenuItemFromURL(item, url);
                    if (childMatch) return childMatch;
                }
            }
            return undefined;
        }

        // Exact match
        if (items.url === url) return items;

        // Partial match for nested routes (e.g., /admin/projects matches /admin/projects/create)
        if (url.startsWith(items.url + '/') || url.startsWith(items.url + '?')) {
            return items;
        }

        // Check children
        if (items.children != null) {
            for (const item of items.children) {
                const childMatch = getMenuItemFromURL(item, url);
                if (childMatch) return childMatch;
            }
        }
    }
    return undefined;
};

export const findMenuItem = (menuItems: MenuItemType[] | undefined, menuItemKey: MenuItemType['key'] | undefined): MenuItemType | null => {
    if (menuItems && menuItemKey) {
        for (const item of menuItems) {
            if (item.key === menuItemKey) {
                return item;
            }
            const found = findMenuItem(item.children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};
