# 📊 DIAGRAMA: MONOREPO EN RAILWAY

## 🏗️ ESTRUCTURA DEL REPOSITORIO

```
📁 Cudeca (GitHub Repository)
│
├── 📁 CudecaBE/                    ← Servicio 1 en Railway
│   ├── 📁 src/
│   │   ├── 📁 main/
│   │   │   ├── 📁 java/
│   │   │   └── 📁 resources/
│   │   └── 📁 test/
│   ├── 📄 pom.xml                  ← Railway detecta Maven aquí
│   ├── 📄 railway.toml (opcional)
│   └── 📁 target/
│
├── 📁 [TU-FRONTEND]/               ← Servicio 2 en Railway
│   ├── 📁 src/
│   ├── 📁 public/
│   ├── 📄 package.json             ← Railway detecta Node aquí
│   ├── 📄 vite.config.js
│   └── 📁 node_modules/
│
├── 📄 .gitignore                   ← En la raíz del monorepo
└── 📄 README.md
```

---

## 🚂 CONFIGURACIÓN EN RAILWAY

```
┌─────────────────────────────────────────────────────────┐
│  🎯 Proyecto Railway: "Cudeca"                          │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   PostgreSQL  │   │    Backend    │   │   Frontend    │
│   Database    │   │   (Service)   │   │   (Service)   │
├───────────────┤   ├───────────────┤   ├───────────────┤
│               │   │ Repo: Cudeca  │   │ Repo: Cudeca  │
│ DB: railway   │◄──│ Root: CudecaBE│   │ Root: [FE]    │
│ Port: 5432    │   │ Port: 8080    │◄──│ Port: 3000/   │
│               │   │               │   │       5173    │
│ Variables:    │   │ Variables:    │   │               │
│ - PGHOST      │   │ - DATABASE_URL│   │ Variables:    │
│ - PGPORT      │   │ - JWT_SECRET  │   │ - VITE_API_URL│
│ - PGUSER      │   │ - FRONTEND_URL│   │               │
│ - PGPASSWORD  │   │ - GOOGLE_...  │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
        │                   │                   │
        │                   │                   │
        ▼                   ▼                   ▼
    [Railway]          [Railway]           [Railway]
  Internal URL      Public Domain       Public Domain
                    backend-xxx.        frontend-xxx.
                    up.railway.app      up.railway.app
```

---

## 🔄 FLUJO DE DESPLIEGUE

```
1️⃣ DESARROLLAS LOCALMENTE
   │
   ├─ Backend en:  C:\Users\Dani\Documents\Cudeca\CudecaBE
   └─ Frontend en: C:\Users\Dani\Documents\Cudeca\[TU-FE]
   │
   ▼

2️⃣ HACES COMMIT Y PUSH
   │
   git add .
   git commit -m "Cambios"
   git push
   │
   ▼

3️⃣ GITHUB RECIBE EL CÓDIGO
   │
   Repositorio: github.com/TU-USUARIO/Cudeca
   │
   ├─ CudecaBE/
   └─ [Frontend]/
   │
   ▼

4️⃣ RAILWAY DETECTA CAMBIOS
   │
   Webhook automático desde GitHub
   │
   ├─────────────────┬─────────────────┐
   │                 │                 │
   ▼                 ▼                 ▼
Backend Service   Frontend Service   Database
   │                 │                 │
   ├─ Root: CudecaBE ├─ Root: [FE]   (No cambia)
   ├─ Build Maven    ├─ Build npm     │
   ├─ Run Java       ├─ Run Vite      │
   └─ Deploy ✅      └─ Deploy ✅     │
   │                 │                 │
   ▼                 ▼                 ▼

5️⃣ APLICACIÓN LIVE
   │
   ├─ Backend:  https://backend-xxx.up.railway.app
   └─ Frontend: https://frontend-xxx.up.railway.app
```

---

## 🌐 FLUJO DE REQUESTS EN PRODUCCIÓN

```
👤 Usuario
│
│ Abre navegador
│
▼
https://frontend-xxx.up.railway.app
│
├─ Railway Frontend Service
│  │
│  ├─ Sirve index.html
│  ├─ Carga React App
│  └─ JavaScript ejecuta en el navegador
│     │
│     │ Usuario hace login
│     │
│     ▼
│     📤 Fetch API Request
│        URL: https://backend-xxx.up.railway.app/api/auth/login
│        │
│        │ CORS Check:
│        │ Origin: https://frontend-xxx.up.railway.app
│        │ Allowed: ✅ (configurado en FRONTEND_URL)
│        │
│        ▼
│        Railway Backend Service
│        │
│        ├─ Spring Boot recibe request
│        ├─ Valida credenciales
│        ├─ Consulta PostgreSQL
│        │  │
│        │  ▼
│        │  Railway PostgreSQL
│        │  │
│        │  └─ Retorna datos
│        │
│        ├─ Genera JWT
│        └─ Responde al frontend
│           │
│           ▼
│        📥 Response JSON
│           │
│           └─► Frontend guarda token
│               │
│               └─► Usuario autenticado ✅
```

---

## ⚙️ CONFIGURACIÓN CRÍTICA: ROOT DIRECTORY

### ❌ SIN Root Directory (ERROR)
```
Railway intenta compilar desde raíz:
Cudeca/
│
├─ CudecaBE/
│   └─ pom.xml         ← Encuentra Maven
├─ Frontend/
│   └─ package.json    ← ¡También encuentra npm!
│
❌ ERROR: "Multiple build systems detected"
❌ ERROR: Intenta compilar todo junto
```

### ✅ CON Root Directory (CORRECTO)
```
Servicio Backend:
Root Directory: CudecaBE
│
Railway solo ve:
CudecaBE/
├─ pom.xml         ← ✅ Detecta Maven
├─ src/
└─ target/

---

Servicio Frontend:
Root Directory: [TU-FRONTEND]
│
Railway solo ve:
[TU-FRONTEND]/
├─ package.json    ← ✅ Detecta npm
├─ src/
└─ node_modules/
```

---

## 🔐 VARIABLES DE ENTORNO: REFERENCIAS CRUZADAS

```
┌─────────────────────────────────────────────────────────┐
│  PostgreSQL Service                                     │
│  Genera automáticamente:                                │
│  - PGHOST=xyz.railway.internal                         │
│  - PGPORT=5432                                          │
│  - PGUSER=postgres                                      │
│  - PGPASSWORD=abc123xyz                                 │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Railway permite referencias
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Backend Service                                        │
│  Usa variables con ${{Service.VARIABLE}}:              │
│                                                          │
│  DATABASE_URL=jdbc:postgresql://                        │
│    ${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway  │
│  DB_USERNAME=${{Postgres.PGUSER}}                      │
│  DB_PASSWORD=${{Postgres.PGPASSWORD}}                  │
│                                                          │
│  BACKEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}        │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Backend genera dominio
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend Service                                       │
│  Apunta al backend con URL real:                       │
│                                                          │
│  VITE_API_URL=https://backend-xxx.up.railway.app       │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 RESUMEN VISUAL

```
🎯 1 REPOSITORIO
   ├── CudecaBE/      → Servicio Backend en Railway
   └── Frontend/      → Servicio Frontend en Railway

🚂 1 PROYECTO RAILWAY
   ├── PostgreSQL     → Base de datos compartida
   ├── Backend        → Root: CudecaBE
   └── Frontend       → Root: [TU-FE]

🌐 2 URLs PÚBLICAS
   ├── https://backend-xxx.up.railway.app
   └── https://frontend-xxx.up.railway.app

🔄 1 WORKFLOW
   git push → GitHub → Railway → Deploy automático
```

---

## 💡 VENTAJAS DEL MONOREPO

✅ **Un solo repositorio** - Más fácil de mantener
✅ **Versionado conjunto** - Backend y frontend siempre sincronizados
✅ **Un solo git push** - Despliega ambos servicios
✅ **Compartir código** - Si es necesario en el futuro
✅ **CI/CD simplificado** - Un solo webhook de GitHub

---

## 📚 SIGUIENTE PASO

Una vez entiendas la estructura, sigue la guía:
- **`COMANDOS_MONOREPO.md`** - Comandos paso a paso
- **`CHECKLIST_MONOREPO.md`** - Para marcar progreso

**¿Tienes clara la estructura?** 🤔

