export type Role = 'viewer' | 'admin' | 'superadmin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface PasswordResetRequest {
  email: string;
}

export const ROLE_PERMISSIONS = {
  viewer: {
    canView: true,
    canEdit: false,
    canDelete: false,
  },
  admin: {
    canView: true,
    canEdit: true,
    canDelete: false,
  },
  superadmin: {
    canView: true,
    canEdit: true,
    canDelete: true,
  },
} as const;

export const ROLE_LABELS: Record<Role, string> = {
  viewer: 'Viewer',
  admin: 'Admin',
  superadmin: 'Super Admin',
};
