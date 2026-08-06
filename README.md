# 📚 Biblioteca V2

Sistema de gestión de biblioteca desarrollado como una aplicación Full Stack utilizando React, Express, Prisma y PostgreSQL. Permite administrar libros, categorías y usuarios mediante una interfaz moderna y una API REST.

## 🚀 Demo

### Frontend

🔗 https://biblioteca-v2-seven.vercel.app

### Backend (API)

🔗 https://biblioteca-v2-lovat.vercel.app

---

## ✨ Características

- 📖 Gestión de libros
- 🗂️ Gestión de categorías
- 👤 Gestión de usuarios
- 🔐 Autenticación mediante JWT
- 📊 Dashboard administrativo
- 🌐 API REST
- ☁️ Despliegue en Vercel
- 🗄️ Base de datos PostgreSQL (Supabase)
- ⚡ ORM Prisma

---

## 🛠️ Tecnologías utilizadas

### Frontend

- React
- React Router
- Vite
- Axios
- Bootstrap 5

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL (Supabase)
- JSON Web Token (JWT)
- bcryptjs
- Morgan
- CORS

---

## 📁 Estructura del proyecto

```text
Biblioteca-V2/
│
├── client/                 # Frontend React
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Backend Express
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/Biblioteca-V2.git
cd Biblioteca-V2
```

---

### 2. Instalar dependencias

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

## 🔑 Variables de entorno

### Frontend (`client/.env.local`)

```env
VITE_API_URL=http://localhost:3000
```

---

### Backend (`server/.env`)

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

---

## ▶️ Ejecutar el proyecto

### Backend

```bash
cd server
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

### Frontend

```bash
cd client
npm run dev
```

Aplicación disponible en:

```
http://localhost:5173
```

---

## 📡 Endpoints principales

| Método | Endpoint           | Descripción               |
| ------ | ------------------ | ------------------------- |
| GET    | `/books`           | Obtener libros            |
| POST   | `/books`           | Crear libro               |
| GET    | `/categories`      | Obtener categorías        |
| POST   | `/categories`      | Crear categoría           |
| POST   | `/users`           | Iniciar sesión            |
| POST   | `/users/create`    | Registrar usuario         |
| GET    | `/admin/dashboard` | Información del dashboard |

---

## 🚀 Despliegue

El proyecto utiliza un **monorepo** con dos aplicaciones desplegadas en **Vercel**.

- Frontend → React + Vite
- Backend → Express + Prisma

La base de datos está alojada en **Supabase**.

---

## 👨‍💻 Autor

**Julián David Rojas Archila**

- GitHub: https://github.com/juliandrojas
- Website: https://juliandrojas.vercel.app

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos y de aprendizaje.
