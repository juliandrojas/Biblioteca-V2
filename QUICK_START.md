# ⚡ Quick Start - Biblioteca V2

## 🚀 Comenzar en 5 minutos

### Paso 1: Preparar el ambiente

```bash
# 1. Copiar variables de entorno
cp .env.example .env
cp .env.example server/.env
cp .env.example client/.env

# 2. Editar server/.env con tus datos reales:
#    - DATABASE_URL (tu PostgreSQL o Supabase)
#    - DIRECT_URL (igual a DATABASE_URL)
#    - JWT_SECRET (genera uno aleatorio)

# 3. Instalar dependencias
npm run install-all
```

### Paso 2: Preparar la base de datos

```bash
cd server

# Generar Prisma Client
npx prisma generate

# Crear/actualizar tablas en la BD
npx prisma migrate deploy

# (Opcional) Llenar con datos de prueba
npx prisma db seed

cd ..
```

### Paso 3: Ejecutar en desarrollo

```bash
# Esto abre ambos servidores simultáneamente
npm run dev

# ✅ Frontend: http://localhost:5173
# ✅ Backend: http://localhost:3000
```

---

## 🔧 Comandos útiles

### Desarrollo

```bash
npm run dev          # Ejecutar frontend + backend
cd server && npm run dev    # Solo backend
cd client && npm run dev    # Solo frontend
```

### Base de datos

```bash
npm run prisma:migrate    # Crear nueva migración
npm run prisma:generate   # Regenerar Prisma Client
npm run prisma:push       # Sincronizar cambios a BD
npm run prisma:seed       # Ejecutar seed.js
```

### Deploy a Vercel

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
# Vercel detecta y autodeploy automáticamente
```

---

## ⚠️ Problemas comunes

### "Cannot find module '@prisma/client'"

```bash
cd server && npx prisma generate
```

### "Database connection failed"

- Verificar `DATABASE_URL` en `.env`
- Verificar que PostgreSQL está corriendo (si es local)
- Supabase: verificar credenciales en la consola

### "Port 3000 already in use"

```bash
# Buscar proceso en puerto 3000 y matarlo
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### "Frontend no se conecta al API"

- Verificar `VITE_API_URL` en `client/.env`
- Debe ser `http://localhost:3000` en desarrollo
- Revisar console.log de errores en DevTools

---

## 📚 Documentación completa

Ver [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) para guía completa de:

- Configuración en Vercel
- Variables de entorno en producción
- Troubleshooting avanzado
- Flujo de deployment

---

## 🎯 Checklist de primer run

- [ ] Clone/descargue el proyecto
- [ ] Copió `.env.example` a `.env`
- [ ] Configuró `DATABASE_URL` en `.env`
- [ ] Corrió `npm run install-all`
- [ ] Corrió `npx prisma migrate deploy` en `server/`
- [ ] Ejecutó `npm run dev`
- [ ] Accedió a http://localhost:5173
- [ ] Vio que el frontend carga correctamente

¡Listo! 🎉
