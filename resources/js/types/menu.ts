import { HTMLAttributeAnchorTarget } from 'react';

export type MenuItemType = {
    key: string;
    label: string;
    is_title?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text?: string;
    };
    badge_icon?: string;
    parent_key?: string;
    target?: HTMLAttributeAnchorTarget;
    is_disabled?: boolean;
    children?: MenuItemType[];
};

export type SubMenus = {
    item: MenuItemType;
    tag?: string;
    linkClassName?: string;
    subMenuClassName?: string;
    activeMenuItems?: Array<string>;
    toggleMenu?: (item: MenuItemType, status: boolean) => void;
    className?: string;
    level: number;
};
