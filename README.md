# BackOffice - Sistema de Gestión de Usuarios

Sistema de administración de usuarios con control de roles y permisos, desarrollado con Next.js y Tailwind CSS. Aplicación frontend moderna, responsiva e intuitiva.

## Características

- **Autenticación completa**: Login, registro y recuperación de contraseña
- **Sistema de roles flexible**: Tres niveles de acceso (Viewer, Admin, Super Admin)
- **Gestión de usuarios**: Crear, editar, eliminar y filtrar usuarios
- **Control de permisos**: Restricciones basadas en roles
- **Interfaz responsiva**: Compatible con móvil, tablet y escritorio
- **Almacenamiento local**: Datos persistentes en el navegador (localStorage)

## Roles y Permisos

| Rol | Ver | Editar | Eliminar | Crear | Asignar Roles |
|-----|-----|--------|----------|-------|---------------|
| Viewer | ✅ | ❌ | ❌ | ❌ | ❌ |
| Admin | ✅ | ✅ | ❌ | ✅ | ❌ |
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ |

**Notas de seguridad:**
- Los usuarios no pueden cambiar su propio rol
- Solo Super Admin puede asignar roles Admin o Super Admin
- El email es identificador único y no editable

## Usuarios de Prueba

Credenciales para probar la aplicación:

```
Super Admin
Email: superadmin@demo.com
Contraseña: password123

Admin
Email: admin@demo.com
Contraseña: password123

Viewer
Email: viewer@demo.com
Contraseña: password123
```

## Requisitos

- Node.js 16.x o superior
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd backoffice
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y ve a:
```
http://localhost:5000
```

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo en puerto 5000
- `npm run build` - Compila la aplicación para producción
- `npm run start` - Inicia la aplicación compilada
- `npm run lint` - Ejecuta el linter de ESLint

## Estructura del Proyecto

```
├── components/              # Componentes reutilizables
│   ├── Layout.tsx          # Layout principal con navegación
│   ├── Modal.tsx           # Componente modal genérico
│   └── ProtectedRoute.tsx  # Wrapper para rutas protegidas
├── context/
│   └── AuthContext.tsx     # Contexto de autenticación y usuarios
├── pages/
│   ├── _app.tsx            # Configuración global
│   ├── index.tsx           # Página de redirección
│   ├── login.tsx           # Inicio de sesión
│   ├── register.tsx        # Registro de usuarios
│   ├── forgot-password.tsx # Recuperación de contraseña
│   ├── dashboard.tsx       # Panel principal
│   └── users.tsx           # Gestión de usuarios
├── styles/
│   └── globals.css         # Estilos globales con Tailwind
├── types/
│   └── index.ts            # Definiciones de tipos
└── package.json            # Dependencias del proyecto
```

## Tecnologías

- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first
- **PostCSS** - Procesamiento de CSS

## Características de la UI

### Página de Login
- Formulario de autenticación con validación
- Links para registro y recuperación de contraseña
- Visualización de credenciales de prueba

### Panel de Control (Dashboard)
- Resumen general del sistema
- Información del usuario autenticado
- Acceso rápido a secciones

### Gestión de Usuarios
- **Búsqueda**: Filtra usuarios por nombre o email
- **Filtro por rol**: Visualiza usuarios según su rol
- **Acciones**: Ver, editar, eliminar (según permisos)
- **Formularios**: Crear y editar usuarios con validación
- **Responsivo**: Vista de tarjetas en móvil, tabla en escritorio

## Desarrollo

### Variables de Entorno

No se requieren variables de entorno adicionales. La aplicación usa localStorage para almacenamiento.

### Estado Global

El contexto `AuthContext` maneja:
- Autenticación de usuarios
- Gestión de usuarios
- Permisos y roles
- Estado de la sesión

### Persistencia de Datos

Los datos se almacenan en localStorage del navegador. Para limpiar:
```javascript
localStorage.clear()
```

## Deployment

### En Replit

1. Abre el proyecto en Replit
2. La aplicación está preconfigurada para ejecutarse en puerto 5000
3. Haz clic en "Publish" para publicar

### En otros servicios

```bash
npm run build
npm run start
```

La aplicación estará disponible en `http://localhost:5000` (o el puerto configurado).

## Notas

- La aplicación es frontend-only y usa localStorage para demostración
- Los datos no persisten entre navegadores ni dispositivos
- Para un sistema de producción, implementa un backend con base de datos

## Autor

Desarrollado como aplicación de demostración para administración de usuarios con Next.js.

## Licencia

MIT
