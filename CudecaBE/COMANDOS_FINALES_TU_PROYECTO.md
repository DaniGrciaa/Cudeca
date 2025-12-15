# 🎯 COMANDOS EXACTOS PARA TU PROYECTO

## 📂 TU ESTRUCTURA CONFIRMADA

```
C:\Users\Dani\Documents\Cudeca\
├── CudecaBE/      ← Backend Spring Boot (aquí estás ahora)
├── CudecaFE/      ← Frontend React
├── .vscode/
└── README.md
```

---

## 🚀 PASO 1: SUBIR TODO A GITHUB (5 minutos)

### 1.1 Navegar a la carpeta RAÍZ (Cudeca)
```powershell
cd C:\Users\Dani\Documents\Cudeca
```

### 1.2 Verificar que estás en la carpeta correcta
```powershell
Get-ChildItem -Directory
```

**Deberías ver:**
```
CudecaBE
CudecaFE
.vscode
```

### 1.3 Verificar Git
```powershell
git status
```

**Si dice "not a git repository":**
```powershell
git init
```

### 1.4 Crear .gitignore en la raíz
```powershell
@"
# Backend (Maven/Spring Boot)
CudecaBE/target/
CudecaBE/.mvn/
CudecaBE/*.jar
CudecaBE/*.log

# Frontend (Node/React)
CudecaFE/node_modules/
CudecaFE/dist/
CudecaFE/build/
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

# Railway
.railway/
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

### 1.5 Añadir y commitear TODO
```powershell
git add .
git commit -m "Preparar monorepo Cudeca para Railway - Backend y Frontend"
```

### 1.6 Crear repositorio en GitHub

**ABRIR EN NAVEGADOR:** https://github.com/new

**Configuración:**
- Repository name: `Cudeca`
- Description: `Aplicación Cudeca - Backend Spring Boot + Frontend React`
- Private
- ❌ NO marcar README
- ❌ NO marcar .gitignore
- ❌ NO marcar license
- Click **"Create repository"**

### 1.7 Conectar y subir

**⚠️ REEMPLAZA `TU-USUARIO`** con tu usuario real de GitHub:

```powershell
git remote add origin https://github.com/TU-USUARIO/Cudeca.git
git branch -M main
git push -u origin main
```

**Si pide autenticación:**
- Usuario: tu usuario de GitHub
- Contraseña: Personal Access Token
  - Crear en: https://github.com/settings/tokens
  - "Generate new token (classic)"
  - Marca "repo"
  - Copia el token y úsalo como contraseña

---

## 🚂 PASO 2: RAILWAY - BACKEND (10 minutos)

### 2.1 Crear cuenta en Railway

**ABRIR:** https://railway.app

1. Click "Login"
2. "Login With GitHub"
3. Autoriza Railway

### 2.2 Crear proyecto

1. Click **"+ New Project"**
2. Click **"Deploy from GitHub repo"**
3. Selecciona el repositorio **"Cudeca"**
4. Railway creará un servicio automáticamente

### 2.3 ⚠️ CONFIGURAR ROOT DIRECTORY (MUY IMPORTANTE)

Railway detectará Maven, pero intentará compilar desde la raíz. Debes decirle que solo compile el backend:

1. En el servicio creado, click **"Settings"**
2. Scroll hasta **"Build"** o **"Source"**
3. Busca **"Root Directory"**
4. Escribe exactamente:
   ```
   CudecaBE
   ```
5. Click fuera o presiona Enter para guardar

### 2.4 Renombrar servicio

1. En Settings, arriba del todo
2. **Service Name:** `cudeca-backend`
3. Guardar

### 2.5 Añadir PostgreSQL

1. En tu proyecto Railway, click **"+ New"** (botón morado arriba derecha)
2. Click **"Database"**
3. Click **"Add PostgreSQL"**
4. Espera 30 segundos que se cree

### 2.6 Configurar Variables de Entorno

En el servicio **cudeca-backend** → **Variables** → **New Variable**

**Añade estas 13 variables UNA POR UNA:**

#### Base de datos (con referencias a Postgres)
```
Variable: DATABASE_URL
Value: jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
```

```
Variable: DB_USERNAME
Value: ${{Postgres.PGUSER}}
```

```
Variable: DB_PASSWORD
Value: ${{Postgres.PGPASSWORD}}
```

#### JWT
```
Variable: JWT_SECRET
Value: CudecaSecretKeyForJWTTokenGenerationAndValidation2024MustBeAtLeast256BitsLongForHS256Algorithm
```

```
Variable: JWT_EXPIRATION
Value: 36000000
```

```
Variable: JWT_REFRESH_EXPIRATION
Value: 604800000
```

#### URLs (temporales, las actualizaremos después)
```
Variable: FRONTEND_URL
Value: http://localhost:3000
```

```
Variable: FRONTEND_URL_VITE
Value: http://localhost:5173
```

```
Variable: BACKEND_URL
Value: https://${{RAILWAY_PUBLIC_DOMAIN}}
```

#### OAuth2 Google
```
Variable: GOOGLE_CLIENT_ID
Value: 50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com
```

```
Variable: GOOGLE_CLIENT_SECRET
Value: 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
```

#### Seguridad
```
Variable: SECURITY_USER_NAME
Value: admin
```

```
Variable: SECURITY_USER_PASSWORD
Value: CudecaAdmin2024!
```

### 2.7 Generar dominio público

1. En **cudeca-backend** → **Settings**
2. Scroll hasta **"Networking"**
3. Click **"Generate Domain"**
4. Railway te dará una URL como: `https://cudeca-backend-production.up.railway.app`

**📋 COPIAR Y ANOTAR AQUÍ:**
```
Backend URL: https://_________________________________.up.railway.app
```

### 2.8 Ver logs del despliegue

1. Click en **"Deployments"**
2. Click en el deployment activo
3. **"View Logs"**

**Busca en los logs:**
- ✅ "BUILD SUCCESS"
- ✅ "Flyway migration"
- ✅ "Started CudecaBeApplication in X seconds"

**Si hay errores:**
- Copia el error completo
- Dímelo y te ayudo

### 2.9 Verificar que funciona

**ABRIR EN NAVEGADOR:**
```
https://[TU-BACKEND-URL].up.railway.app/api/eventos
```

**Deberías ver:** JSON con la lista de eventos

---

## 🎨 PASO 3: RAILWAY - FRONTEND (5 minutos)

### 3.1 Añadir segundo servicio

1. En tu proyecto Railway, click **"+ New"**
2. Click **"GitHub Repo"**
3. Selecciona **EL MISMO repositorio "Cudeca"**
4. Railway creará un SEGUNDO servicio

### 3.2 ⚠️ CONFIGURAR ROOT DIRECTORY (MUY IMPORTANTE)

1. En el NUEVO servicio, click **"Settings"**
2. En la sección **"Build"**
3. **Root Directory:** escribe exactamente:
   ```
   CudecaFE
   ```
4. Guardar

### 3.3 Renombrar servicio

1. Settings → **Service Name:** `cudeca-frontend`
2. Guardar

### 3.4 Configurar variable de entorno

En el servicio **cudeca-frontend** → **Variables** → **New Variable**:

```
Variable: VITE_API_URL
Value: https://[TU-BACKEND-URL-DEL-PASO-2.7].up.railway.app
```

**⚠️ Reemplaza** con la URL REAL del backend que copiaste antes.

Ejemplo:
```
VITE_API_URL=https://cudeca-backend-production.up.railway.app
```

### 3.5 Verificar configuración de build

Railway debería detectar automáticamente:
- **Build Command:** `npm install && npm run build`
- **Start Command:** detecta automáticamente

Si necesitas cambiar algo, ve a Settings → Deploy.

### 3.6 Generar dominio frontend

1. Settings → **Networking**
2. **Generate Domain**
3. Railway te dará: `https://cudeca-frontend-production.up.railway.app`

**📋 COPIAR Y ANOTAR AQUÍ:**
```
Frontend URL: https://_________________________________.up.railway.app
```

### 3.7 Esperar despliegue

1. Click en **"Deployments"**
2. Ver logs del build
3. Espera a que termine (puede tardar 2-3 minutos)

---

## 🔄 PASO 4: ACTUALIZAR URLs CRUZADAS (2 minutos)

### 4.1 Actualizar variables en Backend

Vuelve al servicio **cudeca-backend** → **Variables**

**EDITA** (no crees nuevas) estas dos variables con las URLs REALES:

```
Variable: FRONTEND_URL
Nuevo valor: https://[TU-FRONTEND-URL-DEL-PASO-3.6].up.railway.app
```

```
Variable: FRONTEND_URL_VITE
Nuevo valor: https://[TU-FRONTEND-URL-DEL-PASO-3.6].up.railway.app
```

Ejemplo:
```
FRONTEND_URL=https://cudeca-frontend-production.up.railway.app
FRONTEND_URL_VITE=https://cudeca-frontend-production.up.railway.app
```

### 4.2 Esperar redespliegue automático

Railway redesplegará el backend automáticamente (tarda 2-3 minutos).

---

## ✅ PASO 5: VERIFICACIÓN COMPLETA

### 5.1 Verificar Backend

**ABRIR:**
```
https://[TU-BACKEND-URL].up.railway.app/api/eventos
```

✅ Debe mostrar JSON con eventos

### 5.2 Verificar Frontend

**ABRIR:**
```
https://[TU-FRONTEND-URL].up.railway.app
```

✅ Debe cargar tu aplicación React

### 5.3 Verificar Integración

1. En el frontend, intenta hacer login
2. Verifica que no hay errores CORS en la consola del navegador (F12)
3. Comprueba que los datos se cargan correctamente

---

## 📊 RESUMEN DE TU CONFIGURACIÓN

### Repositorio GitHub
```
https://github.com/TU-USUARIO/Cudeca

Estructura:
├── CudecaBE/      → Servicio 1 Railway (Root: CudecaBE)
├── CudecaFE/      → Servicio 2 Railway (Root: CudecaFE)
├── .vscode/
└── README.md
```

### Railway - Proyecto "Cudeca"
```
Servicios:
├── PostgreSQL      → Base de datos
├── cudeca-backend  → Root: CudecaBE
└── cudeca-frontend → Root: CudecaFE

URLs:
├── Backend:  https://_________________________________.up.railway.app
└── Frontend: https://_________________________________.up.railway.app
```

---

## 🎯 SIGUIENTE PASO

Cuando todo esté funcionando, dime **"siguiente paso"** para:
- ✅ Configurar Google OAuth2 con las URLs de producción
- ✅ Verificar que todo funciona correctamente
- ✅ Optimizaciones finales

---

## 🆘 ERRORES COMUNES

### Error: "Root directory not found"
**Solución:** Verifica que escribiste exactamente `CudecaBE` o `CudecaFE` (case-sensitive)

### Error: "Could not find pom.xml" en el frontend
**Solución:** Asegúrate de que Root Directory del frontend es `CudecaFE`

### Error: "Could not find package.json" en el backend
**Solución:** Asegúrate de que Root Directory del backend es `CudecaBE`

### Error CORS
**Solución:** Verifica que `FRONTEND_URL` y `FRONTEND_URL_VITE` están actualizadas en el backend

### Build muy lento
**Solución:** Es normal la primera vez. Railway descarga dependencias. Espera 5-10 minutos.

---

## 💡 RECORDATORIO IMPORTANTE

**Root Directory es CRÍTICO:**
- Backend: `CudecaBE` (exactamente así)
- Frontend: `CudecaFE` (exactamente así)

Sin esto, Railway intentará compilar todo el repositorio y fallará.

---

**¿Listo para empezar?** 🚀

**Ejecuta el primer comando y vamos paso a paso.**

