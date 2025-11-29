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
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: string[];
    role_id?: number;
    role_value?: string;   // Valor en inglés (super_admin)
    role_name?: string;    // Valor traducido (Super Administrador)
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
  id: number;
  name: string;          // Valor en inglés (super_admin, management, etc.)
  label?: string;        // Valor traducido (Super Administrador, Gerencia, etc.)
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}

export interface Variety {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Shift {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Lot {
  id: number;
  code: string;
  name: string;
  description?: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface HarvestMatrix {
  id: number;
  name: string;
  week_number: number;
  year: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  status_label: string;
  status_color: string;
  kg_target: number | null;
  kg_executed: number;
  completion_percentage: number;
  total_staff: number | null;
  notes?: string;
  has_active_alerts: boolean;
  creator?: {
    id: number;
    name: string;
  };
  programming_count?: number;
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