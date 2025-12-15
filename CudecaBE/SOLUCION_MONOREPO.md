# 🎯 SOLUCIÓN: MONOREPO (Backend + Frontend en mismo repositorio)

## 📂 SITUACIÓN ACTUAL

Tienes una estructura como esta:
```
Cudeca/
├── CudecaBE/          # Backend (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   └── ...
└── CudecaFE/          # Frontend (React/Vite)
    ├── src/
    ├── package.json
    └── ...
```

**✅ Railway soporta monorepos perfectamente**, solo necesitamos indicarle dónde está cada proyecto.

---

## 🚀 SOLUCIÓN: DOS SERVICIOS, UN REPOSITORIO

### ESTRATEGIA:
1. **Un solo repositorio en GitHub** con backend y frontend
2. **Dos servicios en Railway:**
   - Servicio 1: Backend (apunta a carpeta `CudecaBE`)
   - Servicio 2: Frontend (apunta a carpeta `CudecaFE` o como se llame)

---

## 📋 PASO A PASO ACTUALIZADO

### 🔹 PASO 1: Subir TODO a GitHub

```powershell
# Navegar a la carpeta PRINCIPAL (Cudeca)
cd C:\Users\Dani\Documents\Cudeca

# Verificar si ya es un repo Git
git status

# Si NO es un repo, inicializar
git init

# Añadir TODO (backend y frontend)
git add .

# Commit
git commit -m "Preparar monorepo para Railway - Backend y Frontend"

# Crear repositorio en GitHub
# IR A: https://github.com/new
# Nombre: Cudeca (o CudecaApp)
# Private
# NO marcar nada
# Create repository

# Conectar y subir
git remote add origin https://github.com/TU-USUARIO/Cudeca.git
git branch -M main
git push -u origin main
```

---

### 🔹 PASO 2: Configurar Railway - BACKEND

#### 2.1 Crear proyecto en Railway
1. https://railway.app → Login con GitHub
2. "+ New Project" → "Deploy from GitHub repo"
3. Selecciona el repo `Cudeca` (el que contiene ambos)

#### 2.2 Configurar ROOT DIRECTORY del Backend
⚠️ **IMPORTANTE:** Railway necesita saber que solo debe compilar el backend

1. **En el servicio desplegado**, ve a **"Settings"**
2. Busca la sección **"Build"**
3. Encuentra **"Root Directory"** o **"Working Directory"**
4. Configura:
   ```
   Root Directory: CudecaBE
   ```

#### 2.3 Verificar configuración de Build
- **Build Command:** `mvn clean package -DskipTests` (Railway lo detecta automáticamente)
- **Start Command:** `java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar`

#### 2.4 Renombrar servicio (opcional pero recomendado)
1. Settings → **Service Name:** `cudeca-backend`

---

### 🔹 PASO 3: Añadir PostgreSQL
(Igual que antes)

1. "+ New" → Database → PostgreSQL
2. Espera que se cree

---

### 🔹 PASO 4: Configurar Variables Backend
(Las mismas 13 variables de antes)

En servicio `cudeca-backend` → Variables:

```env
DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
JWT_SECRET=CudecaSecretKeyForJWTTokenGenerationAndValidation2024MustBeAtLeast256BitsLongForHS256Algorithm
JWT_EXPIRATION=36000000
JWT_REFRESH_EXPIRATION=604800000
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_VITE=http://localhost:5173
BACKEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
GOOGLE_CLIENT_ID=50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
SECURITY_USER_NAME=admin
SECURITY_USER_PASSWORD=CudecaAdmin2024!
```

---

### 🔹 PASO 5: Generar dominio Backend
1. Settings → Networking → Generate Domain
2. **ANOTAR URL:** https://_________________.up.railway.app

---

### 🔹 PASO 6: Desplegar FRONTEND

#### 6.1 Añadir nuevo servicio desde el MISMO repo
1. En tu proyecto Railway, click **"+ New"**
2. Click **"GitHub Repo"**
3. Selecciona **el mismo repositorio** `Cudeca`
4. Railway creará un SEGUNDO servicio

#### 6.2 Configurar ROOT DIRECTORY del Frontend
⚠️ **CRÍTICO:** Decirle a Railway que compile el frontend

1. En el NUEVO servicio, ve a **"Settings"**
2. En la sección **"Build"**:
   ```
   Root Directory: CudecaFE
   ```
   (o como se llame tu carpeta de frontend: `frontend`, `cudeca-frontend`, etc.)

#### 6.3 Configurar Build del Frontend
- **Build Command:** `npm run build` (Railway lo detecta automáticamente)
- **Start Command:** `npm run preview` o el comando que uses para servir el build

#### 6.4 Configurar variables del Frontend
En el servicio frontend → Variables:

```
VITE_API_URL=https://[URL-BACKEND-RAILWAY].up.railway.app
```

Usa la URL del backend que anotaste en el Paso 5.

#### 6.5 Renombrar servicio
Settings → **Service Name:** `cudeca-frontend`

#### 6.6 Generar dominio Frontend
1. Settings → Networking → Generate Domain
2. **ANOTAR URL:** https://_________________.up.railway.app

---

### 🔹 PASO 7: Actualizar URLs cruzadas

#### 7.1 Actualizar variable FRONTEND_URL en Backend
Vuelve al servicio `cudeca-backend` → Variables:

```
FRONTEND_URL=https://[URL-FRONTEND-RAILWAY].up.railway.app
FRONTEND_URL_VITE=https://[URL-FRONTEND-RAILWAY].up.railway.app
```

#### 7.2 Redesplegar ambos servicios
- Ambos servicios se redesplegarán automáticamente al cambiar variables

---

## 📁 ESTRUCTURA ESPERADA DEL REPOSITORIO

Tu repo en GitHub debería verse así:

```
Cudeca/
├── .gitignore                    # Ignorar node_modules, target, .env, etc.
├── README.md                     # Descripción del proyecto
├── CudecaBE/                     # ⬅️ Servicio 1 en Railway
│   ├── src/
│   ├── pom.xml
│   ├── railway.toml              # Opcional
│   └── ...
└── CudecaFE/                     # ⬅️ Servicio 2 en Railway
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── ...
```

---

## 🔧 ARCHIVOS A CREAR

### .gitignore en la raíz (Cudeca/.gitignore)

```gitignore
# Backend (Maven/Spring Boot)
CudecaBE/target/
CudecaBE/.mvn/
CudecaBE/mvnw
CudecaBE/mvnw.cmd

# Frontend (Node/React)
CudecaFE/node_modules/
CudecaFE/dist/
CudecaFE/.env
CudecaFE/.env.local
CudecaFE/.env.production

# IDEs
.idea/
.vscode/
*.iml
*.iws

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
```

---

## ⚙️ ALTERNATIVA: railway.toml por proyecto

### CudecaBE/railway.toml
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "java -Dserver.port=$PORT -jar target/CudecaBE-0.0.1-SNAPSHOT.jar"
```

### CudecaFE/railway.toml (si usas Vite)
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run preview"
```

---

## ✅ CHECKLIST MONOREPO

### Configuración Git
- [ ] Navegado a carpeta RAÍZ (Cudeca)
- [ ] Git inicializado
- [ ] TODO añadido y commiteado
- [ ] Repo creado en GitHub
- [ ] Código subido

### Railway - Backend
- [ ] Proyecto creado en Railway
- [ ] Primer servicio creado desde repo Cudeca
- [ ] **Root Directory** configurado: `CudecaBE`
- [ ] PostgreSQL añadido
- [ ] 13 variables configuradas
- [ ] Dominio generado
- [ ] Backend funcionando

### Railway - Frontend
- [ ] Segundo servicio añadido (mismo repo)
- [ ] **Root Directory** configurado: `CudecaFE` (o tu nombre)
- [ ] Variable `VITE_API_URL` configurada
- [ ] Dominio generado
- [ ] Frontend funcionando

### Integración
- [ ] Variables de URL actualizadas en backend
- [ ] CORS funciona entre frontend y backend
- [ ] OAuth2 actualizado en Google Cloud Console

---

## 🆘 PREGUNTAS FRECUENTES

**P: ¿Cómo sabe Railway qué carpeta compilar?**
R: Con el **Root Directory** en Settings → Build

**P: ¿Puedo tener diferentes nombres de carpeta?**
R: Sí, solo ajusta el Root Directory en Railway

**P: ¿Railway cobra por dos servicios?**
R: El plan gratuito incluye múltiples servicios, pero comparten el límite de uso total

**P: ¿Qué pasa si actualizo el código?**
R: Railway detecta cambios en GitHub y redesplega automáticamente ambos servicios

---

## 📝 COMANDOS ACTUALIZADOS

Ver el archivo: **`COMANDOS_MONOREPO.md`** (lo crearé ahora)

---

**¿Cuál es el nombre de tu carpeta de frontend?** 

Dime el nombre exacto y te actualizo todos los comandos con el nombre correcto.

