# 🎯 RESUMEN: Setup Local + Deploy Vercel

## Lo que hemos preparado

Tu proyecto ya tiene todo configurado para:

1. ✅ Ejecutar localmente en desarrollo
2. ✅ Desplegar automáticamente a Vercel

---

## 📂 Archivos creados/actualizados

| Archivo               | Propósito                            |
| --------------------- | ------------------------------------ |
| `DEPLOYMENT_GUIDE.md` | 📖 Guía completa con todos los pasos |
| `QUICK_START.md`      | ⚡ Quick start de 5 minutos          |
| `.env.example`        | 📝 Plantilla de variables de entorno |
| `.gitignore`          | 🔒 Protege archivos sensibles        |
| `vercel.json`         | ☁️ Configuración para Vercel         |
| `package.json`        | 📦 Scripts en raíz del proyecto      |
| `server/api/index.js` | 🔗 Serverless function para Vercel   |

---

## 🏃 INICIO RÁPIDO (LOCAL)

### 1️⃣ Crear archivos de configuración

```bash
# En la raíz del proyecto
cp .env.example .env
cp .env.example server/.env
cp .env.example client/.env
```

### 2️⃣ Configurar variables de entorno

Editar `server/.env`:

```env
DATABASE_URL="postgresql://usuario:pass@localhost:5432/biblioteca_v2"
DIRECT_URL="postgresql://usuario:pass@localhost:5432/biblioteca_v2"
JWT_SECRET="generaUnaStringAleatorioBienSegura"
RESEND_API_KEY="re_xxxxx"
PORT=3000
NODE_ENV=development
```

Editar `client/.env`:

```env
VITE_API_URL="http://localhost:3000"
```

### 3️⃣ Instalar dependencias

```bash
npm run install-all
```

### 4️⃣ Preparar base de datos

```bash
cd server
npx prisma generate
npx prisma migrate deploy
cd ..
```

### 5️⃣ Ejecutar en desarrollo

```bash
npm run dev

# ✅ Frontend: http://localhost:5173
# ✅ Backend: http://localhost:3000
```

---

## 🚀 DEPLOY A VERCEL

### Fase 1: Preparar repositorio Git

```bash
git add .
git commit -m "Setup: configuración inicial para Vercel"
git push origin main
```

### Fase 2: En vercel.com

1. Ir a https://vercel.com/dashboard
2. Clickear **"Add New"** → **"Project"**
3. Seleccionar tu repositorio GitHub
4. Configurar:
   - **Framework**: Auto-detect
   - **Build Command**: `npm run build`
   - **Install Command**: dejar default

### Fase 3: Variables de entorno en Vercel UI

En **Settings** → **Environment Variables**, agregar:

| Variable         | Valor                            |
| ---------------- | -------------------------------- |
| `DATABASE_URL`   | Tu connection string de Supabase |
| `DIRECT_URL`     | Tu DIRECT_URL de Supabase        |
| `JWT_SECRET`     | String aleatorio super seguro    |
| `RESEND_API_KEY` | Tu API key de Resend             |
| `NODE_ENV`       | `production`                     |

### Fase 4: Deploy

- Clickear **"Deploy"**
- Esperar a que termine (2-5 min)
- Vercel asignará 2 dominios:
  - Frontend: `https://biblioteca-v2-frontend.vercel.app`
  - Backend: `https://biblioteca-v2-api.vercel.app` (automático)

### Fase 5: Actualizar frontend para producción

En `client/.env.production`:

```env
VITE_API_URL="https://biblioteca-v2-api.vercel.app"
```

---

## 🔄 Flujo de trabajo diario

### Desarrollo local

```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend (en otra terminal)
cd client && npm run dev
```

### Cambios en base de datos

```bash
cd server
npx prisma migrate dev --name nombre_del_cambio
```

### Subir a producción

```bash
# Hacer cambios localmente
git add .
git commit -m "Descripción del cambio"
git push origin main

# ✅ Vercel autodeploy automáticamente
# Monitorear en dashboard de Vercel
```

---

## 🆘 Troubleshooting

### Error: "Cannot find DATABASE_URL"

```bash
# Verificar que server/.env existe y tiene DATABASE_URL
ls server/.env
cat server/.env | grep DATABASE_URL
```

### Error: "Module not found @prisma/client"

```bash
cd server
npx prisma generate
```

### Frontend no se conecta al backend

```bash
# Verificar:
# 1. Backend está corriendo: http://localhost:3000/users
# 2. VITE_API_URL en client/.env = "http://localhost:3000"
# 3. Ver errores en DevTools (F12) → Console
```

### Puerto 3000 o 5173 en uso

```bash
# Liberar puerto
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_AQUI> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

---

## 📋 Checklist antes de subir a Vercel

- [ ] `npm run dev` funciona localmente
- [ ] Frontend accesible en http://localhost:5173
- [ ] Backend accesible en http://localhost:3000
- [ ] `npm run build` ejecuta sin errores
- [ ] Variables de entorno configuradas en Vercel
- [ ] BD en Supabase creada y conectada
- [ ] `vercel.json` existe en raíz
- [ ] `server/api/index.js` existe
- [ ] `.env` está en `.gitignore`
- [ ] Commit inicial hecho y pusheado a main

---

## 📚 Documentación de referencia

| Documento                                    | Contenido                    |
| -------------------------------------------- | ---------------------------- |
| [QUICK_START.md](./QUICK_START.md)           | Inicio rápido (5 min)        |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Guía completa y detallada    |
| [README.md](./README.md)                     | Características del proyecto |
| [ARCHITECTURE.md](./ARCHITECTURE.md)         | Arquitectura del sistema     |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md)     | Estado actual del proyecto   |

---

## 🎓 Stack & Recursos

**Frontend:**

- React 19 + Vite
- React Router v7
- Bootstrap 5
- Axios

**Backend:**

- Express 5
- Prisma 6
- PostgreSQL
- JWT Auth

**Deploy:**

- Vercel (Frontend + Serverless Backend)
- Supabase (PostgreSQL)
- Resend (Email)

**Recursos útiles:**

- [Vercel Docs](https://vercel.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Express Docs](https://expressjs.com)
- [Supabase Docs](https://supabase.com/docs)

---

## ✅ Estado actual

- ✅ Backend configurado para Vercel (serverless)
- ✅ Frontend configurado para Vercel
- ✅ Variables de entorno preparadas
- ✅ Estructura de carpetas lista
- ✅ Gitignore configurado

**Próximos pasos:**

1. Crear `.env` con tus credenciales
2. Ejecutar `npm run dev` localmente
3. Pushear a GitHub
4. Conectar en Vercel UI
5. ¡Listo! 🎉

---

**Última actualización:** 2026-08-12
**Versión:** 1.0
