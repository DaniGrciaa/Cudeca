# ✅ CHECKLIST - TU PROYECTO CUDECA

## 📂 ESTRUCTURA CONFIRMADA

```
C:\Users\Dani\Documents\Cudeca\
├── CudecaBE/      ← Backend
├── CudecaFE/      ← Frontend
├── .vscode/
└── README.md
```

---

## 🔹 FASE 1: GIT Y GITHUB

- [ ] Navegado a: `C:\Users\Dani\Documents\Cudeca`
- [ ] Verificado carpetas con `Get-ChildItem -Directory`
- [ ] Git inicializado (o ya existía)
- [ ] `.gitignore` creado en la raíz
- [ ] `git add .` ejecutado
- [ ] `git commit -m "..."` ejecutado
- [ ] Repositorio "Cudeca" creado en GitHub
- [ ] Remote añadido
- [ ] `git push -u origin main` ejecutado
- [ ] ✅ Código visible en GitHub

**Tu repo GitHub:** https://github.com/____________/Cudeca

---

## 🔹 FASE 2: RAILWAY BACKEND

### Proyecto
- [ ] Cuenta Railway creada
- [ ] Login con GitHub
- [ ] Proyecto creado
- [ ] Repo "Cudeca" conectado

### Configuración Backend
- [ ] **Settings → Root Directory:** `CudecaBE` ⚠️
- [ ] Servicio renombrado: `cudeca-backend`
- [ ] PostgreSQL añadido

### Variables (13 variables)
- [ ] `DATABASE_URL` = `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway`
- [ ] `DB_USERNAME` = `${{Postgres.PGUSER}}`
- [ ] `DB_PASSWORD` = `${{Postgres.PGPASSWORD}}`
- [ ] `JWT_SECRET` = (copiado)
- [ ] `JWT_EXPIRATION` = `36000000`
- [ ] `JWT_REFRESH_EXPIRATION` = `604800000`
- [ ] `FRONTEND_URL` = `http://localhost:3000` (temporal)
- [ ] `FRONTEND_URL_VITE` = `http://localhost:5173` (temporal)
- [ ] `BACKEND_URL` = `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `GOOGLE_CLIENT_ID` = (copiado)
- [ ] `GOOGLE_CLIENT_SECRET` = (copiado)
- [ ] `SECURITY_USER_NAME` = `admin`
- [ ] `SECURITY_USER_PASSWORD` = (segura)

### Dominio
- [ ] Dominio generado
- [ ] **Backend URL:** https://________________________________.up.railway.app

### Verificación
- [ ] Logs revisados
- [ ] ✅ "Started CudecaBeApplication" visible
- [ ] ✅ `/api/eventos` responde con JSON

---

## 🔹 FASE 3: RAILWAY FRONTEND

### Servicio
- [ ] "+ New" → "GitHub Repo"
- [ ] Repo "Cudeca" seleccionado (mismo que backend)
- [ ] Segundo servicio creado

### Configuración Frontend
- [ ] **Settings → Root Directory:** `CudecaFE` ⚠️
- [ ] Servicio renombrado: `cudeca-frontend`

### Variables
- [ ] `VITE_API_URL` = (URL del backend de Railway)

### Dominio
- [ ] Dominio generado
- [ ] **Frontend URL:** https://________________________________.up.railway.app

### Verificación
- [ ] Build exitoso en logs
- [ ] ✅ Frontend carga en navegador

---

## 🔹 FASE 4: INTEGRACIÓN

- [ ] Backend → Variables → `FRONTEND_URL` actualizada con URL real
- [ ] Backend → Variables → `FRONTEND_URL_VITE` actualizada con URL real
- [ ] Backend redesplegado automáticamente

### Pruebas Finales
- [ ] Frontend carga
- [ ] Backend responde
- [ ] No hay errores CORS
- [ ] Login funciona
- [ ] Datos se cargan

---

## 🔹 FASE 5: GOOGLE OAUTH2

- [ ] Google Cloud Console abierto
- [ ] Redirect URIs actualizadas
- [ ] JavaScript origins actualizadas
- [ ] OAuth2 funciona en producción

---

## 📊 TU CONFIGURACIÓN FINAL

```
GitHub:   https://github.com/____________/Cudeca
Backend:  https://________________________________.up.railway.app
Frontend: https://________________________________.up.railway.app

Railway Proyecto: Cudeca
├── Postgres
├── cudeca-backend  (Root: CudecaBE)
└── cudeca-frontend (Root: CudecaFE)
```

---

## 🎯 ESTADO ACTUAL

- [ ] ✅ TODO FUNCIONANDO
- [ ] ⚠️ Con errores: _______________________
- [ ] ⏳ En proceso

---

## 💡 RECORDATORIO

**Root Directory es CLAVE:**
- Backend: `CudecaBE`
- Frontend: `CudecaFE`

**Sin esto, Railway no sabrá qué compilar.**

---

Cuando termines, dime **"siguiente paso"** 🚀

