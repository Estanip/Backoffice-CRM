# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-01

### Agregado

#### Sistema de Autenticación
- Login con validación de credenciales
- Registro de nuevos usuarios
- Recuperación de contraseña
- Sesión persistente en localStorage
- Contexto global de autenticación

#### Sistema de Roles y Permisos
- Tres niveles de roles: Viewer, Admin, Super Admin
- Control granular de permisos por rol
- Restricción de escalado de privilegios (usuarios no pueden cambiar su propio rol)
- Asignación de roles limitada por nivel de acceso

#### Gestión de Usuarios
- Crear nuevos usuarios
- Editar información de usuarios (nombre)
- Eliminar usuarios (solo Super Admin)
- Buscar usuarios por nombre o email
- Filtrar usuarios por rol
- Email como identificador único (no editable)

#### Interfaz de Usuario
- Página de login con credenciales de prueba
- Página de registro con validación
- Página de recuperación de contraseña
- Dashboard principal con resumen de información
- Página de gestión de usuarios
- Layout responsivo con navegación
- Componentes modales para edición

#### Diseño y Estilos
- Tailwind CSS v4 integrado
- PostCSS configurado
- Interfaz responsiva (móvil, tablet, escritorio)
- Tema de colores moderno con gradientes
- Tarjetas adaptables para móvil
- Tablas optimizadas para escritorio

#### Usuarios de Prueba
- Super Admin: superadmin@demo.com / password123
- Admin: admin@demo.com / password123
- Viewer: viewer@demo.com / password123

### Características de Seguridad

- Prevención de escalado de privilegios
- Validación de permisos en todas las acciones
- Email único no editable
- Restricciones de rol en creación y asignación

## Notas de Desarrollo

### v1.0.0 - Lanzamiento Inicial

Este es el lanzamiento inicial de BackOffice. Incluye un sistema completo de autenticación y gestión de usuarios con control de roles.

#### Limitaciones Conocidas

- La aplicación es frontend-only (sin backend)
- Los datos se almacenan en localStorage del navegador
- Los datos no persisten entre navegadores diferentes
- Los datos se pierden si se limpia el caché del navegador

#### Próximas Mejoras Sugeridas

- [ ] Integración con backend (Node.js, Python, etc.)
- [ ] Base de datos real (PostgreSQL, MongoDB, etc.)
- [ ] Autenticación con JWT tokens
- [ ] Encriptación de contraseñas
- [ ] Auditoría de acciones de usuarios
- [ ] Exportación de datos a CSV/PDF
- [ ] Paginación en la lista de usuarios
- [ ] Notificaciones en tiempo real
- [ ] Temas oscuro/claro
- [ ] Internacionalización (i18n)
- [ ] Pruebas unitarias y de integración
- [ ] Documentación de API

---

## [Sin Liberar]

### Planeado para Futuras Versiones

- Sistema de permisos más granular (permisos específicos por operación)
- Roles personalizables
- Historial de cambios de usuarios
- Backup y restauración de datos
- API REST para integración
- Autenticación con proveedores terceros (Google, GitHub, etc.)
- Dashboard con gráficos y estadísticas
- Sistema de notificaciones
- Integración con correo electrónico para notificaciones
