import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900">BackOffice</span>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <button
                  onClick={() => router.push('/dashboard')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 cursor-pointer ${
                    router.pathname === '/dashboard'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => router.push('/users')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 cursor-pointer ${
                    router.pathname === '/users'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Usuarios
                </button>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role && ROLE_LABELS[user.role]}</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => { router.push('/dashboard'); setMobileMenuOpen(false); }}
                className={`block w-full text-left pl-3 pr-4 py-2 text-base font-medium cursor-pointer ${
                  router.pathname === '/dashboard'
                    ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => { router.push('/users'); setMobileMenuOpen(false); }}
                className={`block w-full text-left pl-3 pr-4 py-2 text-base font-medium cursor-pointer ${
                  router.pathname === '/users'
                    ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Usuarios
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.role && ROLE_LABELS[user.role]}</p>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
