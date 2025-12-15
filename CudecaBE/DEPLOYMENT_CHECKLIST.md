# ✅ CHECKLIST DE DESPLIEGUE RAILWAY - CUDECA

## 📦 PREPARACIÓN LOCAL
- [x] Variables de entorno configuradas en `application.properties`
- [x] CORS actualizado para URLs dinámicas
- [x] Archivo `.env.example` creado
- [x] Proyecto compila correctamente

---

## 🌐 CONFIGURACIÓN RAILWAY

### PASO 1: Crear cuenta
- [ ] Cuenta creada en https://railway.app
- [ ] Conectada con GitHub

### PASO 2: Subir código a GitHub
- [ ] Repositorio backend creado en GitHub
- [ ] Código subido (push)
- [ ] Repositorio frontend creado en GitHub (si aplica)

### PASO 3: Crear proyecto en Railway
- [ ] Nuevo proyecto creado en Railway
- [ ] Nombre del proyecto configurado

---

## 🗄️ BASE DE DATOS POSTGRESQL

### PASO 4: Añadir PostgreSQL
- [ ] Servicio PostgreSQL creado en Railway
- [ ] Base de datos inicializada
- [ ] Credenciales anotadas:
  - [ ] `PGHOST`: ___________________
  - [ ] `PGPORT`: ___________________
  - [ ] `PGUSER`: ___________________
  - [ ] `PGPASSWORD`: ___________________

---

## ⚙️ SERVICIO BACKEND

### PASO 5: Deploy del backend
- [ ] Servicio backend creado desde GitHub repo
- [ ] Build detectado correctamente (Maven/Spring Boot)

### PASO 6: Variables de entorno del backend
Añadir en Railway → Variables:

```
# Base de datos
- [ ] DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
- [ ] DB_USERNAME=${{Postgres.PGUSER}}
- [ ] DB_PASSWORD=${{Postgres.PGPASSWORD}}

# JWT
- [ ] JWT_SECRET=(copiar de .env.example)
- [ ] JWT_EXPIRATION=36000000
- [ ] JWT_REFRESH_EXPIRATION=604800000

# URLs (actualizar después)
- [ ] FRONTEND_URL=https://_____________________.up.railway.app
- [ ] FRONTEND_URL_VITE=https://_____________________.up.railway.app
- [ ] BACKEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# OAuth2
- [ ] GOOGLE_CLIENT_ID=(tu client id)
- [ ] GOOGLE_CLIENT_SECRET=(tu secret)

# Seguridad
- [ ] SECURITY_USER_NAME=admin
- [ ] SECURITY_USER_PASSWORD=(cambiar)
```

### PASO 7: Generar dominio backend
- [ ] Dominio generado en Settings → Networking
- [ ] URL del backend: https://_____________________.up.railway.app
- [ ] Backend desplegado correctamente
- [ ] Logs revisados (sin errores)

---

## 🔐 GOOGLE OAUTH2

### PASO 8: Actualizar Google Cloud Console
Ir a: https://console.cloud.google.com → APIs & Services → Credentials

**Authorized redirect URIs:**
- [ ] `https://[tu-backend].up.railway.app/login/oauth2/code/google`

**Authorized JavaScript origins:**
- [ ] `https://[tu-frontend].up.railway.app`
- [ ] `https://[tu-backend].up.railway.app`

---

## 🎨 SERVICIO FRONTEND

### PASO 9: Preparar frontend
En tu proyecto React:
- [ ] Archivo `.env.production` creado
- [ ] Variable `VITE_API_URL` configurada
- [ ] Código actualizado para usar variables de entorno
- [ ] Subido a GitHub

### PASO 10: Deploy del frontend
- [ ] Servicio frontend creado en Railway
- [ ] Build detectado (Vite/React)
- [ ] Variable `VITE_API_URL` configurada
- [ ] Dominio generado
- [ ] URL del frontend: https://_____________________.up.railway.app

### PASO 11: Actualizar URLs
- [ ] Variable `FRONTEND_URL` actualizada en backend con URL real
- [ ] Variable `FRONTEND_URL_VITE` actualizada en backend con URL real
- [ ] Backend redesplegado

---

## ✅ VERIFICACIÓN FINAL

### PASO 12: Pruebas
- [ ] Frontend carga correctamente
- [ ] API responde (test con `/api/eventos`)
- [ ] Login normal funciona
- [ ] Login con Google funciona
- [ ] Registro de usuarios funciona
- [ ] Datos se guardan en la base de datos
- [ ] No hay errores CORS

### PASO 13: Logs y monitoreo
- [ ] Logs del backend revisados
- [ ] Logs del frontend revisados
- [ ] No hay errores críticos

---

## 🎉 DESPLIEGUE COMPLETADO

### Información final:
- **Frontend URL:** https://_____________________.up.railway.app
- **Backend URL:** https://_____________________.up.railway.app
- **Database:** Railway PostgreSQL

### Próximos pasos (opcional):
- [ ] Configurar dominio personalizado
- [ ] Configurar alertas de monitoreo
- [ ] Documentar endpoints para el equipo
- [ ] Configurar CI/CD adicional

---

## 📞 SOPORTE

Si algo no funciona:
1. Revisa los logs en Railway
2. Verifica las variables de entorno
3. Comprueba que las URLs de OAuth2 estén correctas
4. Consulta `RAILWAY_DEPLOYMENT_GUIDE.md` para troubleshooting

