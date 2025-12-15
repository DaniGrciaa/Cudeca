# 🚂 PASO 2: CONFIGURAR RAILWAY - GUÍA PRÁCTICA

## 📋 ANTES DE EMPEZAR

✅ El código ha sido compilado y empaquetado correctamente
✅ Todo está listo para subir a GitHub y desplegar

---

## 🎯 PARTE A: SUBIR CÓDIGO A GITHUB

### A.1 Verificar estado de Git

Abre una terminal PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd C:\Users\Dani\Documents\Cudeca\CudecaBE
git status
```

**Si dice "not a git repository":**
```powershell
git init
git add .
git commit -m "Preparar proyecto para despliegue en Railway"
```

**Si ya es un repositorio:**
```powershell
git add .
git commit -m "Configurar variables de entorno para Railway"
```

### A.2 Crear repositorio en GitHub

1. Ve a https://github.com/new
2. **Repository name:** `CudecaBE` (o el nombre que prefieras)
3. **Description:** Backend de Cudeca con Spring Boot
4. **Visibility:** Private (recomendado para producción)
5. ❌ **NO** marques ninguna opción de inicialización (README, .gitignore, license)
6. Haz clic en **"Create repository"**

### A.3 Conectar y subir código

GitHub te mostrará comandos. Usa estos:

```powershell
git remote add origin https://github.com/TU-USUARIO/CudecaBE.git
git branch -M main
git push -u origin main
```

**⚠️ Importante:** Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

**Si te pide autenticación:**
- Usa un Personal Access Token (PAT) de GitHub
- Ve a: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token → Marca "repo" → Generate
- Usa el token como contraseña

---

## 🚂 PARTE B: CONFIGURAR RAILWAY

### B.1 Crear cuenta en Railway

1. Ve a https://railway.app
2. Haz clic en **"Login"** o **"Start a New Project"**
3. Selecciona **"Login With GitHub"**
4. Autoriza a Railway para acceder a tus repositorios

### B.2 Crear nuevo proyecto

1. En el dashboard de Railway, haz clic en **"+ New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. **Si no ves tus repositorios:**
   - Haz clic en "Configure GitHub App"
   - Autoriza acceso a tus repositorios (todos o solo CudecaBE)
4. Selecciona el repositorio **"CudecaBE"**

✅ Railway detectará automáticamente que es un proyecto Spring Boot/Maven

### B.3 Esperar el primer build (fallará, es normal)

Railway intentará hacer el primer despliegue pero **FALLARÁ** porque:
- ❌ No tiene base de datos PostgreSQL
- ❌ No tiene las variables de entorno configuradas

**Esto es completamente NORMAL.** Vamos a arreglarlo ahora.

---

## 🗄️ PARTE C: AÑADIR BASE DE DATOS POSTGRESQL

### C.1 Añadir servicio PostgreSQL

1. En tu proyecto de Railway, haz clic en **"+ New"** (botón morado arriba a la derecha)
2. Selecciona **"Database"**
3. Selecciona **"Add PostgreSQL"**
4. Railway creará la base de datos automáticamente

**Espera unos segundos** mientras se crea la base de datos.

### C.2 Ver credenciales de PostgreSQL

1. Haz clic en el servicio **"Postgres"** (el nuevo que acabas de crear)
2. Ve a la pestaña **"Variables"**
3. Verás variables como:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

**⚠️ NO copies estos valores todavía**, los usaremos con referencias en el siguiente paso.

---

## ⚙️ PARTE D: CONFIGURAR VARIABLES DE ENTORNO DEL BACKEND

### D.1 Ir al servicio Backend

1. Haz clic en el servicio que dice **"CudecaBE"** (tu repositorio)
2. Ve a la pestaña **"Variables"**
3. Haz clic en **"+ New Variable"**

### D.2 Añadir variables una por una

Añade las siguientes variables (copia exactamente):

#### 📊 **Base de Datos** (usar referencias de Railway)

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

**💡 Nota:** Railway reemplazará automáticamente `${{Postgres.PGHOST}}` con los valores reales.

#### 🔐 **JWT Configuration**

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

#### 🌐 **URLs** (actualizaremos después)

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

**💡 Nota:** `RAILWAY_PUBLIC_DOMAIN` es una variable mágica de Railway que se rellena automáticamente.

#### 🔑 **OAuth2 Google**

```
Variable: GOOGLE_CLIENT_ID
Value: 50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com
```

```
Variable: GOOGLE_CLIENT_SECRET
Value: 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
```

#### 🛡️ **Seguridad Básica**

```
Variable: SECURITY_USER_NAME
Value: admin
```

```
Variable: SECURITY_USER_PASSWORD
Value: CudecaAdmin2024!
```

**⚠️ IMPORTANTE:** Cambia esta contraseña por una segura.

---

## 🌍 PARTE E: GENERAR DOMINIO PÚBLICO

### E.1 Generar dominio

1. En el servicio **CudecaBE**, ve a **"Settings"**
2. Baja hasta la sección **"Networking"**
3. Haz clic en **"Generate Domain"**
4. Railway te dará una URL como:
   ```
   https://cudecabe-production.up.railway.app
   ```

**📋 ANOTA ESTA URL** - la necesitaremos para Google OAuth2.

---

## 🔄 PARTE F: REDESPLEGAR

### F.1 Forzar redespliegue

1. Ve a la pestaña **"Deployments"**
2. Haz clic en los tres puntos (...) del último deployment
3. Selecciona **"Redeploy"**

O simplemente haz un pequeño cambio en GitHub y push:
```powershell
git commit --allow-empty -m "Trigger Railway redeploy"
git push
```

### F.2 Ver logs del deployment

1. Haz clic en el deployment activo
2. Ve a **"View Logs"**
3. Deberías ver:
   - ✅ Maven descargando dependencias
   - ✅ Compilación exitosa
   - ✅ Flyway ejecutando migraciones
   - ✅ "Started CudecaBeApplication in X seconds"

**Si hay errores:**
- Lee los logs cuidadosamente
- Busca líneas con "ERROR" o "FAILED"
- Verifica que las variables de entorno estén correctas

---

## ✅ VERIFICACIÓN

### Probar el backend

Abre tu navegador y ve a:
```
https://tu-dominio.up.railway.app/api/eventos
```

**Deberías ver:**
- ✅ Un JSON con la lista de eventos
- ✅ Status 200 OK

**Si ves un error:**
- Revisa los logs en Railway
- Verifica que Flyway haya ejecutado las migraciones
- Comprueba que PostgreSQL esté conectado

---

## 📝 INFORMACIÓN PARA EL SIGUIENTE PASO

### Anota estos valores:

**URL del Backend:** `https://___________________.up.railway.app`

**Credenciales PostgreSQL en Railway:**
- Host: (lo ves en Variables de Postgres)
- Puerto: (normalmente 5432)
- Usuario: (lo ves en Variables)
- Contraseña: (lo ves en Variables)
- Base de datos: `railway`

---

## 🎉 ¿TODO FUNCIONÓ?

Si tu backend responde correctamente en la URL pública, **¡PERFECTO!**

Dime **"siguiente paso"** y configuraremos:
1. Google OAuth2 para que funcione con la nueva URL
2. El frontend en Railway
3. Conexión completa entre frontend y backend

---

## 🆘 TROUBLESHOOTING COMÚN

### Error: "Failed to connect to database"
**Solución:** Verifica que las variables `DATABASE_URL`, `DB_USERNAME`, `DB_PASSWORD` usen las referencias `${{Postgres.XXXX}}`

### Error: "Flyway migration failed"
**Solución:** 
- Ve al servicio PostgreSQL en Railway
- Abre la consola de datos (Connect)
- Verifica que la base de datos esté vacía
- Si hay tablas, puedes hacer `DROP TABLE` o crear un nuevo servicio PostgreSQL

### Error: 502 Bad Gateway
**Solución:**
- Revisa los logs del deployment
- Asegúrate de que la aplicación haya iniciado completamente
- Verifica que no haya errores de compilación

### La app se queda en "Building..."
**Solución:**
- Espera 5-10 minutos (la primera vez tarda)
- Si pasa de 15 minutos, revisa los logs

---

**¿Listo para empezar?** 🚀

