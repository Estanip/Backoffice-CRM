import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, Role, ROLE_PERMISSIONS } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'backoffice_users';
const AUTH_STORAGE_KEY = 'backoffice_auth';

const getStoredUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    const defaultUsers: User[] = [
      {
        id: '1',
        email: 'superadmin@demo.com',
        name: 'Super Admin',
        role: 'superadmin',
        createdAt: new Date().toISOString(),
        isActive: true,
      },
      {
        id: '2',
        email: 'admin@demo.com',
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        isActive: true,
      },
      {
        id: '3',
        email: 'viewer@demo.com',
        name: 'Viewer User',
        role: 'viewer',
        createdAt: new Date().toISOString(),
        isActive: true,
      },
    ];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    const passwords: Record<string, string> = {
      'superadmin@demo.com': 'password123',
      'admin@demo.com': 'password123',
      'viewer@demo.com': 'password123',
    };
    localStorage.setItem('backoffice_passwords', JSON.stringify(passwords));
    return defaultUsers;
  }
  return JSON.parse(stored);
};

const getStoredPasswords = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('backoffice_passwords');
  return stored ? JSON.parse(stored) : {};
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    getStoredUsers();
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      const user = JSON.parse(storedAuth);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const passwords = getStoredPasswords();
    
    const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    if (!user.isActive) {
      return { success: false, error: 'Usuario desactivado' };
    }

    if (passwords[user.email] !== credentials.password) {
      return { success: false, error: 'Contraseña incorrecta' };
    }

    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

    setAuthState({
      user: updatedUser,
      isAuthenticated: true,
      isLoading: false,
    });

    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const passwords = getStoredPasswords();

    const existingUser = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Ya existe un usuario con este email' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email.toLowerCase(),
      name: data.name,
      role: 'viewer',
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    users.push(newUser);
    passwords[newUser.email] = data.password;

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem('backoffice_passwords', JSON.stringify(passwords));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'No existe un usuario con este email' };
    }

    const passwords = getStoredPasswords();
    const newPassword = 'reset123';
    passwords[user.email] = newPassword;
    localStorage.setItem('backoffice_passwords', JSON.stringify(passwords));

    return { success: true };
  };

  const permissions = authState.user 
    ? ROLE_PERMISSIONS[authState.user.role] 
    : { canView: false, canEdit: false, canDelete: false };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      resetPassword,
      ...permissions,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const refreshUsers = () => {
    const storedUsers = getStoredUsers();
    setUsers(storedUsers);
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const updateUser = (id: string, updates: Partial<Omit<User, 'id' | 'email'>>) => {
    const storedUsers = getStoredUsers();
    const updatedUsers = storedUsers.map(u => 
      u.id === id ? { ...u, ...updates } : u
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const deleteUser = (id: string) => {
    const storedUsers = getStoredUsers();
    const updatedUsers = storedUsers.filter(u => u.id !== id);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const createUser = (data: { email: string; name: string; role: Role; password: string }) => {
    const storedUsers = getStoredUsers();
    const passwords = getStoredPasswords();

    const existingUser = storedUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Ya existe un usuario con este email' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email.toLowerCase(),
      name: data.name,
      role: data.role,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    storedUsers.push(newUser);
    passwords[newUser.email] = data.password;

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));
    localStorage.setItem('backoffice_passwords', JSON.stringify(passwords));
    setUsers(storedUsers);

    return { success: true };
  };

  return { users, refreshUsers, updateUser, deleteUser, createUser };
}
