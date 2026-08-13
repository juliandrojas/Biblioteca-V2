# 📋 Guía de Despliegue - Biblioteca V2

## 🏠 Parte 1: Configuración LOCAL

### Requisitos previos

- Node.js v18+ instalado
- PostgreSQL (o usar Supabase)
- Git
- Cuenta en Vercel (para despliegue)

### 1. Clonar/Preparar el proyecto

```bash
# Si es un nuevo clone
git clone <tu-repo>
cd "Biblioteca V2"
```

### 2. Configurar variables de entorno

#### Crear `.env` en la raíz del servidor

```bash
# server/.env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/biblioteca_v2"
DIRECT_URL="postgresql://usuario:contraseña@localhost:5432/biblioteca_v2"
JWT_SECRET="tu_secret_jwt_aqui_cambiar_en_produccion"
RESEND_API_KEY="re_xxxxx"  # Para envío de emails
PORT=3000
NODE_ENV=development
```

#### Crear `.env` en el cliente (si es necesario)

```bash
# client/.env
VITE_API_URL=http://localhost:3000
```

### 3. Instalar dependencias

```bash
# Instalar dependencias del servidor
cd server
npm install
cd ..

# Instalar dependencias del cliente
cd client
npm install
cd ..
```

### 4. Configurar la base de datos

```bash
# Navegar a la carpeta del servidor
cd server

# Generar Prisma Client
npx prisma generate

# Crear/actualizar schema en la BD local
npx prisma migrate deploy

# (Opcional) Ejecutar seed si existe
npx prisma db seed

cd ..
```

### 5. Ejecutar en desarrollo

**Opción A: Ejecutar ambos en paralelo (recomendado)**

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
# El servidor correrá en http://localhost:3000
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
# El frontend correrá en http://localhost:5173
```

**Opción B: Usando concurrently (requiere configuración)**

```bash
# En la raíz del proyecto
npm install -D concurrently
```

Agregar a `package.json` en la raíz:

```json
{
  "scripts": {
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\""
  }
}
```

### 6. Verificar que funciona

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API: http://localhost:3000/users

---

## 🚀 Parte 2: Despliegue en VERCEL

### 1. Preparar el proyecto para Vercel

#### Actualizar `server/index.js` (ya está hecho, pero verificar)

```javascript
// El archivo ya tiene la lógica para no ejecutar listen en Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto:", PORT);
  });
}

export default app;
```

#### Crear `server/api/index.js` (Serverless Function de Vercel)

```bash
# Crear archivo si no existe
touch server/api/index.js
```

Contenido de `server/api/index.js`:

```javascript
import app from "../index.js";

export default app;
```

#### Crear/Actualizar `vercel.json` en la raíz

```json
{
  "buildCommand": "cd client && npm run build",
  "installCommand": "npm install && cd server && npm install && cd ../client && npm install",
  "env": {
    "DATABASE_URL": "@database_url",
    "DIRECT_URL": "@direct_url",
    "JWT_SECRET": "@jwt_secret",
    "RESEND_API_KEY": "@resend_api_key"
  },
  "functions": {
    "server/api/**/*.js": {
      "memory": 3008,
      "maxDuration": 30
    }
  }
}
```

#### Actualizar `package.json` en la raíz

```json
{
  "scripts": {
    "build": "cd client && npm run build && cd ../server && npx prisma generate",
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\""
  }
}
```

### 2. Configurar en Vercel UI

**Paso 1: Conectar el repositorio**

1. Ir a https://vercel.com
2. Iniciar sesión
3. Clickear "Add New..." → "Project"
4. Seleccionar tu repositorio GitHub

**Paso 2: Configurar variables de entorno**
En la sección "Environment Variables" del proyecto en Vercel, agregar:

| Variable         | Valor                                              |
| ---------------- | -------------------------------------------------- |
| `DATABASE_URL`   | `postgresql://usuario:pass@db.supabase.co:5432/db` |
| `DIRECT_URL`     | `postgresql://usuario:pass@db.supabase.co:5432/db` |
| `JWT_SECRET`     | `tu_secret_jwt_super_seguro_aqui`                  |
| `RESEND_API_KEY` | `re_xxxxx`                                         |
| `NODE_ENV`       | `production`                                       |

**Paso 3: Configurar build settings (si es necesario)**

- **Build Command**: `npm run build`
- **Output Directory**: `client/dist`

**Paso 4: Deploy**

- Vercel autodetecta cambios en `main` y autodeploy
- O clickear "Deploy" manualmente

### 3. Configurar base de datos en Producción

Si usas Supabase:

1. Crear proyecto en https://supabase.com
2. Copiar la connection string
3. Agregar en Vercel como `DATABASE_URL` y `DIRECT_URL`

Ejecutar migraciones en producción:

```bash
# Conectado a la BD de producción
npx prisma migrate deploy
```

---

## 📝 Checklist de Despliegue

- [ ] Variables de entorno configuradas en Vercel
- [ ] `vercel.json` actualizado
- [ ] `server/api/index.js` existe
- [ ] Migraciones de Prisma ejecutadas en producción
- [ ] BD en Supabase creada y conectada
- [ ] Build local funciona: `npm run build`
- [ ] URLs del backend en el frontend actualizadas
- [ ] JWT_SECRET es seguro y único
- [ ] Correos configurados con Resend

---

## 🔄 Flujo de Trabajo Diario

### Desarrollo Local

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### Cambios en schema de BD

```bash
# En server/
npx prisma migrate dev --name descripcion_del_cambio
```

### Deploy a Producción

```bash
# Hacer commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# Vercel autodeloy automáticamente
# Monitorear en https://vercel.com/dashboard
```

### Problemas comunes

**Error: DATABASE_URL not found**

- Verificar que las variables estén en Vercel UI
- Verificar que el proyecto esté asignado al Environment correcto

**Error: DIRECT_URL not found**

- Para conexiones directas a Supabase, agregar DIRECT_URL
- Es obligatorio para Prisma en serverless

**Port 3000 already in use**

```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📚 Recursos

- [Vercel + Express](https://vercel.com/guides/using-express-with-vercel)
- [Prisma + Vercel](https://www.prisma.io/docs/orm/deployment/edge/deploy-to-vercel)
- [Supabase Connection Strings](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
