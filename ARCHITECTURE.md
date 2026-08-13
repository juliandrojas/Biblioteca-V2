---
# 3. `ARCHITECTURE.md`

Este será el documento que yo considero **más importante para que no vuelvas a perder el hilo**.

```md
# 🏗️ Biblioteca V2 — Arquitectura
---

# 1. Visión general

Biblioteca V2 utiliza una arquitectura cliente-servidor.

```text
┌─────────────────────────┐
│                         │
│      React + Vite       │
│        Frontend         │
│                         │
└────────────┬────────────┘
             │
             │ HTTP / Axios
             │ REST API
             ▼
┌─────────────────────────┐
│                         │
│    Node.js + Express    │
│         Backend         │
│                         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      Controllers        │
│                         │
│  Reciben las peticiones │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Services         │
│                         │
│    Lógica de negocio    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│         Prisma          │
│                         │
│       ORM / DB          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│       PostgreSQL        │
│                         │
│        Database         │
└─────────────────────────┘
```
