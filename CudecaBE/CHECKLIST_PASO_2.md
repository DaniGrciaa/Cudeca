# ✅ CHECKLIST PASO 2 - RAILWAY SETUP

## 📦 PARTE A: GITHUB
- [ ] Git inicializado (`git init` o ya existente)
- [ ] Cambios añadidos (`git add .`)
- [ ] Commit creado (`git commit -m "..."`)
- [ ] Repositorio creado en GitHub
- [ ] Remote añadido (`git remote add origin ...`)
- [ ] Código subido (`git push -u origin main`)
- [ ] ✅ Código visible en GitHub

---

## 🚂 PARTE B: RAILWAY - CUENTA Y PROYECTO
- [ ] Cuenta creada en Railway (https://railway.app)
- [ ] Conectado con GitHub
- [ ] Nuevo proyecto creado
- [ ] Repositorio CudecaBE conectado
- [ ] Primer build iniciado (puede fallar, es normal)

---

## 🗄️ PARTE C: BASE DE DATOS POSTGRESQL
- [ ] Servicio PostgreSQL añadido (+ New → Database → PostgreSQL)
- [ ] PostgreSQL inicializado correctamente
- [ ] Variables visibles (PGHOST, PGPORT, PGUSER, PGPASSWORD)

---

## ⚙️ PARTE D: VARIABLES DE ENTORNO

### Base de datos
- [ ] `DATABASE_URL` = `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway`
- [ ] `DB_USERNAME` = `${{Postgres.PGUSER}}`
- [ ] `DB_PASSWORD` = `${{Postgres.PGPASSWORD}}`

### JWT
- [ ] `JWT_SECRET` = (copiar de .env.example)
- [ ] `JWT_EXPIRATION` = `36000000`
- [ ] `JWT_REFRESH_EXPIRATION` = `604800000`

### URLs
- [ ] `FRONTEND_URL` = `http://localhost:3000` (temporal)
- [ ] `FRONTEND_URL_VITE` = `http://localhost:5173` (temporal)
- [ ] `BACKEND_URL` = `https://${{RAILWAY_PUBLIC_DOMAIN}}`

### OAuth2
- [ ] `GOOGLE_CLIENT_ID` = (tu client id)
- [ ] `GOOGLE_CLIENT_SECRET` = (tu secret)

### Seguridad
- [ ] `SECURITY_USER_NAME` = `admin`
- [ ] `SECURITY_USER_PASSWORD` = (contraseña segura)

---

## 🌍 PARTE E: DOMINIO PÚBLICO
- [ ] Dominio generado (Settings → Networking → Generate Domain)
- [ ] URL anotada: `https://_____________________________.up.railway.app`

---

## 🔄 PARTE F: DESPLIEGUE
- [ ] Redespliegue iniciado
- [ ] Logs revisados
- [ ] ✅ "Started CudecaBeApplication" visible en logs
- [ ] ✅ Sin errores en logs
- [ ] ✅ Flyway ejecutó migraciones correctamente

---

## ✅ VERIFICACIÓN FINAL

### Prueba del backend
- [ ] URL abierta en navegador: `https://tu-dominio.up.railway.app/api/eventos`
- [ ] ✅ Respuesta JSON recibida
- [ ] ✅ Status 200 OK
- [ ] ✅ Lista de eventos visible

---

## 📋 INFORMACIÓN RECOPILADA

**Backend URL:** `https://___________________________________.up.railway.app`

**Estado:** 
- [ ] ✅ Backend funcionando correctamente
- [ ] ⚠️ Backend con errores (revisar logs)
- [ ] ⏳ Todavía desplegando

---

## 🎯 PRÓXIMO PASO

Una vez marcados todos los checks anteriores, continúa con:
- PASO 3: Configurar Google OAuth2 con la nueva URL
- PASO 4: Desplegar Frontend

**Dime "siguiente paso" cuando esté todo listo.** 🚀

