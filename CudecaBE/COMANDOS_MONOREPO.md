# 🎯 COMANDOS EXACTOS - MONOREPO

## ⚠️ PRIMERO: Dime el nombre de tu carpeta de frontend

Antes de empezar, necesito saber:

**¿Cómo se llama tu carpeta de frontend?**

Opciones comunes:
- [ ] `CudecaFE`
- [ ] `cudeca-frontend`
- [ ] `frontend`
- [ ] `client`
- [ ] Otro: ______________

**Abre PowerShell y ejecuta:**
```powershell
Get-ChildItem -Directory C:\Users\Dani\Documents\Cudeca | Select-Object Name
```

**Anota los nombres de las carpetas aquí:**
1. _______________________
2. _______________________

---

## 📦 PARTE 1: PREPARAR Y SUBIR MONOREPO A GITHUB

### Paso 1.1: Ir a la carpeta RAÍZ (Cudeca)
```powershell
cd C:\Users\Dani\Documents\Cudeca
```

### Paso 1.2: Verificar estructura
```powershell
Get-ChildItem -Directory
```

**Deberías ver algo como:**
```
CudecaBE
[Nombre de tu frontend]
```

### Paso 1.3: Inicializar Git (si no existe)
```powershell
# Verificar si ya es un repo
git status

# Si dice "not a git repository", inicializar:
git init
```

### Paso 1.4: Crear .gitignore en la raíz
Abre PowerShell y ejecuta:

```powershell
@"
# Backend (Maven/Spring Boot)
CudecaBE/target/
CudecaBE/.mvn/
CudecaBE/mvnw
CudecaBE/mvnw.cmd

# Frontend (Node/React/Vite)
*/node_modules/
*/dist/
*/build/
*/.env
*/.env.local
*/.env.production

# IDEs
.idea/
.vscode/
*.iml
*.iws
*.ipr

# OS
.DS_Store
Thumbs.db

# Environment files
.env
.env.local
.railway/
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

### Paso 1.5: Añadir TODO y commitear
```powershell
git add .
git commit -m "Preparar monorepo Cudeca para Railway"
```

### Paso 1.6: Crear repositorio en GitHub
**IR A:** https://github.com/new

Configuración:
- **Repository name:** `Cudeca` (o `CudecaApp`)
- **Description:** Aplicación Cudeca - Backend Spring Boot + Frontend React
- **Visibility:** Private
- ❌ **NO** marcar README
- ❌ **NO** marcar .gitignore
- ❌ **NO** marcar license
- Click **"Create repository"**

### Paso 1.7: Conectar y subir

**⚠️ REEMPLAZA** `TU-USUARIO` con tu usuario de GitHub:

```powershell
git remote add origin https://github.com/TU-USUARIO/Cudeca.git
git branch -M main
git push -u origin main
```

**Si te pide autenticación:**
- Usuario: tu usuario de GitHub
- Contraseña: Personal Access Token
  - Crear: https://github.com/settings/tokens
  - "Generate new token (classic)"
  - Marca "repo"
  - Copia y úsalo como contraseña

---

## 🚂 PARTE 2: RAILWAY - SERVICIO BACKEND

### Paso 2.1: Crear cuenta y proyecto
1. https://railway.app
2. Login con GitHub
3. "+ New Project"
4. "Deploy from GitHub repo"
5. Selecciona `Cudeca`

### Paso 2.2: ⚠️ CONFIGURAR ROOT DIRECTORY (CRÍTICO)

Railway intentará compilar todo el repo. Debemos decirle que solo compile el backend:

1. En el servicio que se creó, click **"Settings"**
2. Scroll hasta la sección **"Build"** o **"Service Settings"**
3. Busca **"Root Directory"** o **"Source Directory"**
4. Configura:
   ```
   CudecaBE
   ```
5. Click fuera o "Save"

### Paso 2.3: Renombrar servicio (recomendado)
1. En Settings, arriba de todo
2. **Service Name:** `cudeca-backend`

### Paso 2.4: Añadir PostgreSQL
1. Click **"+ New"** (botón morado)
2. "Database"
3. "Add PostgreSQL"
4. Espera 30 segundos

### Paso 2.5: Configurar variables de entorno

En servicio `cudeca-backend` → **Variables** → **New Variable**

Añade estas 13 variables:

```
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

### Paso 2.6: Generar dominio público
1. Settings → **Networking**
2. **Generate Domain**
3. **📋 COPIAR URL:** https://_________________.up.railway.app

**ANOTAR AQUÍ:**
```
Backend URL: https://_________________________________.up.railway.app
```

### Paso 2.7: Verificar logs
1. **Deployments** → Click en el deployment activo
2. **View Logs**
3. Buscar:
   - ✅ "BUILD SUCCESS"
   - ✅ "Started CudecaBeApplication"

---

## 🎨 PARTE 3: RAILWAY - SERVICIO FRONTEND

### Paso 3.1: Añadir nuevo servicio desde el MISMO repo

1. En tu proyecto Railway, click **"+ New"**
2. Click **"GitHub Repo"**
3. Busca y selecciona **el MISMO repositorio** `Cudeca`
4. Railway creará un SEGUNDO servicio

### Paso 3.2: ⚠️ CONFIGURAR ROOT DIRECTORY (CRÍTICO)

**Aquí debes usar el nombre EXACTO de tu carpeta de frontend:**

1. En el NUEVO servicio, click **"Settings"**
2. En la sección **"Build"**
3. **Root Directory:** 

**Elige según el nombre de tu carpeta:**

```
Opción 1 (si tu carpeta se llama CudecaFE):
CudecaFE

Opción 2 (si se llama cudeca-frontend):
cudeca-frontend

Opción 3 (si se llama frontend):
frontend

Opción 4 (otro nombre):
[TU-NOMBRE-EXACTO]
```

### Paso 3.3: Renombrar servicio
1. Settings → **Service Name:** `cudeca-frontend`

### Paso 3.4: Configurar variable de entorno

En el servicio `cudeca-frontend` → **Variables**:

```
VITE_API_URL=https://[BACKEND-URL-DEL-PASO-2.6].up.railway.app
```

**⚠️ Reemplaza** `[BACKEND-URL-DEL-PASO-2.6]` con la URL real que copiaste.

Ejemplo:
```
VITE_API_URL=https://cudeca-backend-production.up.railway.app
```

### Paso 3.5: Verificar configuración de Build

Railway debería detectar automáticamente:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview` (o el que uses)

Si usa otro comando para servir el build, actualízalo en Settings → Deploy.

### Paso 3.6: Generar dominio frontend
1. Settings → **Networking**
2. **Generate Domain**
3. **📋 COPIAR URL:** https://_________________.up.railway.app

**ANOTAR AQUÍ:**
```
Frontend URL: https://_________________________________.up.railway.app
```

---

## 🔄 PARTE 4: ACTUALIZAR URLs CRUZADAS

### Paso 4.1: Actualizar variables en Backend

Vuelve al servicio `cudeca-backend` → **Variables**

**Edita** estas variables con las URLs REALES de Railway:

```
FRONTEND_URL=https://[FRONTEND-URL-DEL-PASO-3.6].up.railway.app

FRONTEND_URL_VITE=https://[FRONTEND-URL-DEL-PASO-3.6].up.railway.app
```

Ejemplo:
```
FRONTEND_URL=https://cudeca-frontend-production.up.railway.app
FRONTEND_URL_VITE=https://cudeca-frontend-production.up.railway.app
```

### Paso 4.2: Esperar redespliegue
- Ambos servicios se redesplegarán automáticamente

---

## ✅ VERIFICACIÓN FINAL

### Backend
Abre en navegador:
```
https://[BACKEND-URL].up.railway.app/api/eventos
```

**Deberías ver:** JSON con eventos

### Frontend
Abre en navegador:
```
https://[FRONTEND-URL].up.railway.app
```

**Deberías ver:** Tu aplicación React funcionando

### Integración
1. Intenta hacer login en el frontend
2. Verifica que no hay errores CORS
3. Prueba que los datos se cargan correctamente

---

## 📝 RESUMEN DE URLs

**Repositorio GitHub:**
```
https://github.com/_______________/Cudeca
```

**Backend Railway:**
```
https://_________________________________.up.railway.app
```

**Frontend Railway:**
```
https://_________________________________.up.railway.app
```

**PostgreSQL:**
- Host: (ver en Variables de Postgres)
- Database: railway

---

## 🎯 PRÓXIMO PASO

Una vez todo funcione, dime **"siguiente paso"** para:
- ✅ Actualizar Google OAuth2 con las URLs de producción
- ✅ Configurar dominio personalizado (opcional)
- ✅ Optimizar configuración de producción

---

## 🆘 ERRORES COMUNES

### Error: "Root directory not found"
**Solución:** Verifica que el nombre en Root Directory coincida EXACTAMENTE con el nombre de la carpeta

### Error: "No package.json found" (en backend)
**Solución:** Asegúrate de que Root Directory apunte a `CudecaBE`, no a la raíz

### Error: "No pom.xml found" (en frontend)
**Solución:** Asegúrate de que Root Directory apunte a la carpeta del frontend

### Error CORS en el frontend
**Solución:** Verifica que las variables `FRONTEND_URL` y `FRONTEND_URL_VITE` estén actualizadas en el backend

---

**¿Cuál es el nombre exacto de tu carpeta de frontend?**

Dímelo y actualizaré todos los comandos con el nombre correcto. 🚀

