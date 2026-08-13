---

# 2. `PROJECT_STATUS.md`

Este va a ser **tu brújula diaria**.

```md
# 📋 Biblioteca V2 — Estado del proyecto

Última actualización: 2026-08-12

---

# 📊 Resumen

| Módulo                | Estado |
| --------------------- | ------ |
| Configuración inicial | ✅     |
| Frontend              | 🟢     |
| Backend               | 🟢     |
| Base de datos         | 🟢     |
| Autenticación         | 🟡     |
| Usuarios              | 🟢     |
| Libros                | 🟡     |
| Categorías            | 🟢     |
| Préstamos             | 🔴     |
| Dashboard             | 🟡     |
| Correos               | 🟡     |
| Imágenes              | 🔴     |
| Despliegue            | 🟢     |

### Estados

- 🟢 Terminado
- 🟡 En desarrollo
- 🔴 Pendiente
- ⚠️ Requiere revisión

---

# 🔐 Autenticación

## Completado

- [x] Login
- [x] JWT
- [x] Protección de rutas
- [x] Manejo del token
- [x] Roles de usuario
- [x] Login frontend
- [x] Login backend

## En desarrollo

- [ ] Registro de usuarios

## Pendiente

- [ ] Recuperación de contraseña
- [ ] Cambio de contraseña
- [ ] Verificación de correo
- [ ] Flujo de recuperación mediante correo

---

# 👤 Usuarios

## Completado

- [x] Obtener usuarios
- [x] Crear usuario
- [x] Editar usuario
- [x] Búsqueda de usuarios
- [x] Modal reutilizable
- [x] Generación automática de username
- [x] Asignación de roles

## Pendiente

- [ ] Eliminar usuario
- [ ] Confirmación de eliminación
- [ ] Validaciones frontend
- [ ] Validaciones backend

---

# 📚 Libros

## Completado

- [x] Obtener libros
- [x] Crear libro
- [x] Modal para crear libro
- [x] Selección de categoría
- [x] Mostrar disponibilidad
- [x] Búsqueda de libros

## En desarrollo

- [ ] Mostrar imágenes de libros

## Pendiente

- [ ] Editar libro
- [ ] Eliminar libro
- [ ] Subir imágenes
- [ ] Validar ISBN
- [ ] Mejorar gestión de copias
- [ ] Manejo de imágenes inexistentes

---

# 🏷️ Categorías

## Completado

- [x] Obtener categorías
- [x] Crear categoría
- [x] Editar categoría
- [x] Eliminar categoría
- [x] Buscar categorías
- [x] Modal reutilizable
- [x] Validar categorías duplicadas

## Pendiente

- [ ] Mostrar cantidad de libros por categoría

---

# 📖 Préstamos

## Pendiente

- [ ] Crear préstamo
- [ ] Validar disponibilidad
- [ ] Reducir copias disponibles
- [ ] Registrar fecha de préstamo
- [ ] Registrar fecha de devolución
- [ ] Registrar devolución
- [ ] Aumentar copias disponibles
- [ ] Historial de préstamos
- [ ] Estado del préstamo
- [ ] Evitar préstamos inválidos

---

# 📊 Dashboard

## Completado

- [x] Dashboard administrativo
- [x] Estadísticas generales

## Pendiente

- [ ] Estadísticas de préstamos
- [ ] Libros más prestados
- [ ] Usuarios activos
- [ ] Gráficas
- [ ] Actividad reciente

---

# 📧 Correos

## Completado

- [x] Configuración de Resend
- [x] Servicio de correo
- [x] Prueba de envío

## Pendiente

- [ ] Correo de bienvenida
- [ ] Recuperación de contraseña
- [ ] Confirmación de préstamo
- [ ] Confirmación de devolución

---

# 🖼️ Imágenes

## Pendiente

- [ ] Mostrar portada
- [ ] Validar URLs
- [ ] Imagen por defecto
- [ ] Subida de imágenes
- [ ] Almacenamiento de imágenes

---

# 🗄️ Base de datos

## Completado

- [x] PostgreSQL
- [x] Prisma
- [x] Modelos principales
- [x] Relaciones
- [x] Migraciones
- [x] Conexión con Supabase

---

# 🚀 Despliegue

## Completado

- [x] Frontend desplegado
- [x] Backend desplegado
- [x] Variables de entorno
- [x] CORS
- [x] Conexión frontend → backend
- [x] Conexión backend → PostgreSQL

---

# 🐛 Problemas conocidos

## Imágenes externas

Las URLs que apuntan a páginas web y no directamente a archivos de imagen no pueden utilizarse directamente en `<img>`.

Ejemplo incorrecto:

```text
https://sitio.com/pelicula?id=123
```
