import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    const result = await resetPassword(email);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Error al recuperar contraseña');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 bg-indigo-600 rounded-xl mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recuperar contraseña</h2>
            <p className="mt-2 text-sm text-gray-600">Ingresa tu email para recuperar el acceso</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm fade-in">
              {error}
            </div>
          )}

          {success ? (
            <div className="fade-in">
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700 font-medium">Contraseña restablecida</p>
                </div>
                <p className="mt-2 text-sm text-green-600">
                  Tu nueva contraseña temporal es: <strong>reset123</strong>
                </p>
                <p className="mt-1 text-xs text-green-500">
                  Recuerda cambiarla después de iniciar sesión.
                </p>
              </div>
              <Link href="/login" className="block w-full btn-primary py-3 text-center cursor-pointer">
                Ir a iniciar sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Recuperar contraseña'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
