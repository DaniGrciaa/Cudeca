# ✅ CHECKLIST MONOREPO - RAILWAY

## 📋 INFORMACIÓN INICIAL

**Nombre de carpeta Backend:** CudecaBE
**Nombre de carpeta Frontend:** ___________________ (⬅️ COMPLETAR)

**Repositorio GitHub:** https://github.com/____________/Cudeca

---

## 🔹 FASE 1: PREPARAR REPOSITORIO

- [ ] Navegado a carpeta raíz: `C:\Users\Dani\Documents\Cudeca`
- [ ] Ejecutado `Get-ChildItem -Directory` para ver carpetas
- [ ] Identificado nombre de carpeta frontend: _______________
- [ ] Git inicializado (o ya existía)
- [ ] Archivo `.gitignore` creado en la raíz
- [ ] `git add .` ejecutado
- [ ] `git commit -m "..."` ejecutado
- [ ] Repositorio creado en GitHub
- [ ] Remote añadido
- [ ] Código subido con `git push`
- [ ] ✅ Código visible en GitHub

---

## 🔹 FASE 2: RAILWAY - BACKEND

### Proyecto y Servicio
- [ ] Cuenta creada en Railway
- [ ] Login con GitHub
- [ ] Proyecto creado
- [ ] Repositorio `Cudeca` conectado
- [ ] Servicio creado (detectó Maven automáticamente)

### Configuración Backend
- [ ] **Settings → Build → Root Directory:** `CudecaBE` ⚠️
- [ ] Servicio renombrado a: `cudeca-backend`
- [ ] PostgreSQL añadido (+ New → Database)

### Variables de Entorno (13 variables)
- [ ] `DATABASE_URL` = `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway`
- [ ] `DB_USERNAME` = `${{Postgres.PGUSER}}`
- [ ] `DB_PASSWORD` = `${{Postgres.PGPASSWORD}}`
- [ ] `JWT_SECRET` = (copiar valor)
- [ ] `JWT_EXPIRATION` = `36000000`
- [ ] `JWT_REFRESH_EXPIRATION` = `604800000`
- [ ] `FRONTEND_URL` = `http://localhost:3000` (temporal)
- [ ] `FRONTEND_URL_VITE` = `http://localhost:5173` (temporal)
- [ ] `BACKEND_URL` = `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `GOOGLE_CLIENT_ID` = (copiar valor)
- [ ] `GOOGLE_CLIENT_SECRET` = (copiar valor)
- [ ] `SECURITY_USER_NAME` = `admin`
- [ ] `SECURITY_USER_PASSWORD` = (cambiar por segura)

### Dominio y Despliegue
- [ ] Dominio generado (Settings → Networking)
- [ ] **Backend URL:** https://________________________________.up.railway.app
- [ ] Logs revisados
- [ ] ✅ "Started CudecaBeApplication" en logs
- [ ] ✅ Backend responde en `/api/eventos`

---

## 🔹 FASE 3: RAILWAY - FRONTEND

### Servicio Frontend
- [ ] "+ New" → "GitHub Repo"
- [ ] **MISMO repositorio** `Cudeca` seleccionado
- [ ] Segundo servicio creado

### Configuración Frontend ⚠️ CRÍTICO
- [ ] **Settings → Build → Root Directory:** `__________` (nombre exacto de tu carpeta)
- [ ] Servicio renombrado a: `cudeca-frontend`

### Variables de Entorno
- [ ] `VITE_API_URL` = `https://[backend-url].up.railway.app` (URL real del backend)

### Dominio y Despliegue
- [ ] Dominio generado
- [ ] **Frontend URL:** https://________________________________.up.railway.app
- [ ] Logs revisados
- [ ] ✅ Build exitoso
- [ ] ✅ Frontend carga en el navegador

---

## 🔹 FASE 4: INTEGRACIÓN

### Actualizar URLs
- [ ] Backend → Variables → `FRONTEND_URL` actualizada con URL real de Railway
- [ ] Backend → Variables → `FRONTEND_URL_VITE` actualizada con URL real de Railway
- [ ] Servicios redesplegados

### Pruebas
- [ ] Frontend carga correctamente
- [ ] API responde (sin errores CORS)
- [ ] Login funciona
- [ ] Datos se cargan desde el backend
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en logs de Railway

---

## 🔹 FASE 5: GOOGLE OAUTH2 (Próximo paso)

- [ ] Google Cloud Console abierto
- [ ] Authorized redirect URIs actualizadas
- [ ] Authorized JavaScript origins actualizadas
- [ ] OAuth2 funcionando en producción

---

## 📊 RESUMEN FINAL

### URLs de Producción
```
GitHub Repo:     https://github.com/____________/Cudeca
Backend Railway: https://________________________________.up.railway.app
Frontend Railway: https://________________________________.up.railway.app
```

### Estructura del Proyecto Railway
```
Proyecto: Cudeca
├── Servicio 1: cudeca-backend (Root: CudecaBE)
├── Servicio 2: cudeca-frontend (Root: [tu-carpeta-frontend])
└── Database: Postgres
```

### Estado
- [ ] ✅ TODO FUNCIONANDO
- [ ] ⚠️ Errores pendientes (describir): _______________________
- [ ] ⏳ En proceso de despliegue

---

## 🎯 SIGUIENTE PASO

Cuando todo esté marcado, dime **"siguiente paso"** para configurar OAuth2 en producción.

---

## 💡 NOTAS

**Root Directory importante porque:**
- Sin él, Railway intenta compilar TODA la carpeta raíz
- Puede intentar compilar el frontend con Maven (error)
- O el backend con npm (error)

**Dos servicios, un repo:**
- Railway permite múltiples servicios del mismo repositorio
- Cada servicio tiene su propio Root Directory
- Cada servicio se despliega independientemente
- Comparten el límite del plan gratuito

