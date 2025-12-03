import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    first_name?: string;
    last_name?: string;
    dni?: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: string[];
    role_id?: number;
    role_value?: string;   // Valor en inglés (super_admin)
    role_name?: string;    // Valor traducido (Super Administrador)
    is_active?: boolean;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
  id: number;
  name: string;          // Valor en inglés con guiones bajos (super_admin, crop_manager)
  display_name: string;  // Nombre para mostrar en español
  label?: string;        // Para compatibilidad (igual a display_name)
  description?: string | null;
  is_active?: boolean;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Nursery {
  id: number;
  name: string;
  description?: string | null;
  country_id: number;
  country_name?: string;
  country?: Country;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  is_active?: boolean;
}

export interface Variety {
  id: number;
  name: string;
  nursery_id?: number;
  nursery?: {
    id: number;
    name: string;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Shift {
  id: number;
  name: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Lot {
  id: number;
  code: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Distribution {
  id: number;
  project_id: number;
  project_name: string;
  variety_id: number;
  variety_name: string;
  shift_id: number;
  shift_name: string;
  lot_id: number;
  lot_code: string;
  lot_name: string;
  total_area?: number | null;
  campaign_number?: number | null;
  density?: number | null;
  planting_date?: string | null;
  pruning_date?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HarvestMatrix {
  id: number;
  week_number: number;
  year: number;
  user?: {
    id: number;
    name: string;
  };
  dates?: Array<{
    day_of_week: number;
    date: string;
    day_name: string;
  }>;
  rows?: Array<{
    id?: number;
    variety_id?: string;
    shift_id?: string;
    variety?: {
      id: number;
      name: string;
    };
    shift?: {
      id: number;
      name: string;
    };
    lots?: Array<{
      lot_id?: string;
      lot?: {
        id: number;
        code: string;
        name: string;
      };
      lines: number;
      total_kilos?: number;
      kg_per_shift_avg?: number;
      total_shifts?: number;
      daily_data?: Array<{
        day_of_week: number;
        date: string;
        frequency: number;
        kg_per_day: number;
        shifts: number;
      }>;
    }>;
    total_kilos: number;
    kg_per_shift_avg: number;
    total_shifts: number;
    daily_data?: Array<{
      day_of_week: number;
      date: string;
      frequency: number;
      kg_per_day: number;
      shifts: number;
    }>;
    total_kilos: number;
    kg_per_shift_avg: number;
    total_shifts: number;
    daily_data?: Array<{
      day_of_week: number;
      date: string;
      frequency: number;
      kg_per_day: number;
      shifts: number;
    }>;
  }>;
  created_at: string;
  updated_at: string;
}

export interface HarvestProgramming {
  id: number;
  harvest_matrix_id: number;
  distribution_id: number;
  date: string;
  kg_projected: number;
  staff_projected: number;
  ratio_kg_per_jornal: number | null;
  kg_executed: number;
  staff_executed: number;
  real_ratio_kg_per_jornal: number | null;
  frequency_days: number | null;
  last_harvest_date: string | null;
  next_harvest_date: string | null;
  deviation_percentage: number;
  has_alert: boolean;
  notes?: string;
  distribution?: Distribution;
  created_at: string;
  updated_at: string;
}

export type PaginatedData<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  flash: {
    success: string | null;
    error: string | null;
  };
  ziggy: Config & { location: string };
};