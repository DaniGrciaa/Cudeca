# 🚂 GUÍA DE DESPLIEGUE EN RAILWAY - CUDECA BACKEND

## ✅ PASO 1: PREPARACIÓN LOCAL (COMPLETADO)

### Cambios realizados:
- ✅ `application.properties` actualizado con variables de entorno
- ✅ `CORSConfig.java` configurado para aceptar URLs dinámicas
- ✅ Archivo `.env.example` creado con todas las variables necesarias

---

## 📋 PASO 2: CREAR CUENTA Y PROYECTO EN RAILWAY

### 2.1 Crear cuenta en Railway
1. Ve a https://railway.app
2. Haz clic en "Start a New Project"
3. Inicia sesión con GitHub (recomendado)

### 2.2 Conectar tu repositorio
1. Sube tu código a GitHub (si no lo has hecho)
2. En Railway, selecciona "Deploy from GitHub repo"
3. Autoriza a Railway para acceder a tus repositorios
4. Selecciona el repositorio `CudecaBE`

---

## 🗄️ PASO 3: CREAR BASE DE DATOS POSTGRESQL

### 3.1 Añadir PostgreSQL
1. En tu proyecto de Railway, haz clic en "+ New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente la base de datos

### 3.2 Obtener credenciales
1. Haz clic en el servicio PostgreSQL
2. Ve a la pestaña "Variables"
3. Railway generará automáticamente:
   - `DATABASE_URL` (en formato Railway)
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

### 3.3 Convertir DATABASE_URL para Spring Boot
Railway da la URL en formato: `postgresql://user:pass@host:port/dbname`
Spring Boot necesita: `jdbc:postgresql://host:port/dbname`

**IMPORTANTE:** En las variables del servicio backend, deberás añadir manualmente:
```
DATABASE_URL=jdbc:postgresql://[PGHOST]:[PGPORT]/railway
DB_USERNAME=[PGUSER]
DB_PASSWORD=[PGPASSWORD]
```

Usa las referencias de Railway:
```
DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
```

---

## ⚙️ PASO 4: CONFIGURAR SERVICIO BACKEND (SPRING BOOT)

### 4.1 Crear servicio
1. En tu proyecto, haz clic en "+ New"
2. Selecciona "GitHub Repo"
3. Elige tu repositorio `CudecaBE`

### 4.2 Configurar Build
Railway detectará automáticamente que es un proyecto Maven/Spring Boot.

Si necesitas personalizar:
1. Ve a "Settings" → "Build"
2. Build Command: `mvn clean package -DskipTests`
3. Start Command: `java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar`

### 4.3 Configurar Variables de Entorno
1. Ve a la pestaña "Variables" del servicio backend
2. Añade las siguientes variables:

```bash
# Base de datos (usar referencias de Railway)
DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# JWT (IMPORTANTE: cambia el secret en producción)
JWT_SECRET=CudecaSecretKeyForJWTTokenGenerationAndValidation2024MustBeAtLeast256BitsLongForHS256Algorithm
JWT_EXPIRATION=36000000
JWT_REFRESH_EXPIRATION=604800000

# URLs (se actualizarán después de desplegar el frontend)
FRONTEND_URL=https://tu-frontend.up.railway.app
FRONTEND_URL_VITE=https://tu-frontend.up.railway.app
BACKEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# OAuth2 Google (tus credenciales actuales)
GOOGLE_CLIENT_ID=50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Seguridad básica
SECURITY_USER_NAME=admin
SECURITY_USER_PASSWORD=cambiar_en_produccion
```

### 4.4 Generar dominio público
1. Ve a "Settings" → "Networking"
2. Haz clic en "Generate Domain"
3. Railway te dará una URL como: `https://cudecabe-production.up.railway.app`

---

## 🔐 PASO 5: ACTUALIZAR GOOGLE OAUTH2

### 5.1 Ir a Google Cloud Console
1. Ve a https://console.cloud.google.com
2. Selecciona tu proyecto
3. Ve a "APIs & Services" → "Credentials"

### 5.2 Actualizar Redirect URIs
Añade estas URIs a tu cliente OAuth2:

**Authorized redirect URIs:**
```
https://tu-backend.up.railway.app/login/oauth2/code/google
```

**Authorized JavaScript origins:**
```
https://tu-frontend.up.railway.app
https://tu-backend.up.railway.app
```

---

## 🎨 PASO 6: DESPLEGAR FRONTEND (REACT)

### 6.1 Preparar proyecto React
En tu proyecto frontend, crea `.env.production`:

```bash
VITE_API_URL=https://tu-backend.up.railway.app
```

### 6.2 Actualizar llamadas a la API
Asegúrate de que tu frontend use la variable de entorno:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

### 6.3 Desplegar en Railway
1. Sube tu frontend a un repositorio separado en GitHub
2. En Railway, crea un nuevo servicio desde ese repo
3. Railway detectará que es un proyecto Vite/React

Configura variables de entorno:
```bash
VITE_API_URL=https://tu-backend.up.railway.app
```

### 6.4 Generar dominio
1. Ve a "Settings" → "Networking"
2. Genera un dominio para el frontend

### 6.5 Actualizar variable FRONTEND_URL en backend
Vuelve al servicio backend y actualiza la variable `FRONTEND_URL` con la URL real del frontend.

---

## ✅ PASO 7: VERIFICACIÓN FINAL

### 7.1 Verificar que todo funciona
1. Abre la URL del frontend en el navegador
2. Prueba el login normal
3. Prueba el login con Google
4. Verifica que los datos se guardan en la base de datos

### 7.2 Ver logs
En Railway:
- Haz clic en el servicio
- Ve a la pestaña "Deployments"
- Haz clic en el deployment activo
- Ve a "View Logs"

---

## 🔧 TROUBLESHOOTING

### Error: "Failed to connect to database"
- Verifica que las variables `DATABASE_URL`, `DB_USERNAME`, `DB_PASSWORD` estén correctas
- Asegúrate de usar las referencias de Railway: `${{Postgres.PGHOST}}`

### Error: CORS
- Verifica que `FRONTEND_URL` esté configurada correctamente
- Asegúrate de que las URLs no terminen en `/`

### Error: OAuth2 redirect
- Verifica que hayas actualizado las URIs en Google Cloud Console
- Comprueba que `BACKEND_URL` esté configurado correctamente

### Error: 502 Bad Gateway
- Revisa los logs del backend
- Verifica que Flyway pueda ejecutar las migraciones
- Asegúrate de que el puerto no esté hardcodeado (Railway asigna uno dinámico)

---

## 📝 PRÓXIMOS PASOS

1. **Dominio personalizado** (opcional): Puedes configurar tu propio dominio en Railway
2. **Monitoreo**: Configura alertas en Railway
3. **Backups**: Railway hace backups automáticos de PostgreSQL
4. **CI/CD**: Cada push a main desplegará automáticamente

---

## 💡 TIPS

- Railway reinicia automáticamente los servicios si detecta cambios
- El plan gratuito tiene límites de uso mensual
- Puedes escalar verticalmente en Settings → Resources
- Usa el comando `railway logs` desde CLI para debugging

