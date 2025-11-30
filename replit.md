# BackOffice - Sistema de Gestión de Usuarios

## Descripción
Aplicación de backoffice para administración de usuarios con sistema de roles y permisos. Desarrollada con Next.js y Tailwind CSS.

## Estructura del Proyecto

```
/
├── components/          # Componentes reutilizables
│   ├── Layout.tsx       # Layout principal con navegación
│   ├── Modal.tsx        # Componente modal genérico
│   └── ProtectedRoute.tsx # Wrapper para rutas protegidas
├── context/
│   └── AuthContext.tsx  # Contexto de autenticación y gestión de usuarios
├── pages/
│   ├── _app.tsx         # Configuración global de la app
│   ├── index.tsx        # Página de redirección inicial
│   ├── login.tsx        # Página de inicio de sesión
│   ├── register.tsx     # Página de registro
│   ├── forgot-password.tsx # Recuperación de contraseña
│   ├── dashboard.tsx    # Panel principal
│   └── users.tsx        # Gestión de usuarios
├── styles/
│   └── globals.css      # Estilos globales con Tailwind
└── types/
    └── index.ts         # Tipos TypeScript
```

## Sistema de Roles

| Rol | Ver | Editar | Eliminar |
|-----|-----|--------|----------|
| Viewer | ✅ | ❌ | ❌ |
| Admin | ✅ | ✅ | ❌ |
| Super Admin | ✅ | ✅ | ✅ |

## Usuarios de Prueba

- **Super Admin**: superadmin@demo.com / password123
- **Admin**: admin@demo.com / password123
- **Viewer**: viewer@demo.com / password123

## Características

- Autenticación completa (login, registro, recuperación de contraseña)
- Gestión de usuarios según permisos de rol
- Email como identificador único (no editable)
- Interfaz moderna y responsiva
- Almacenamiento local (localStorage) para demostración

## Ejecución

```bash
npm run dev
```

La aplicación corre en el puerto 5000.

## Última Actualización
- Fecha: 2025-11-30
- Versión inicial del backoffice
