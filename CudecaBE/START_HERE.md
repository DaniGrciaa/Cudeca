# 🎯 RESUMEN EJECUTIVO - DESPLIEGUE RAILWAY

## ✅ TU SITUACIÓN

```
Tu proyecto:
C:\Users\Dani\Documents\Cudeca\
├── CudecaBE/  ← Backend Spring Boot (aquí estás ahora)
├── CudecaFE/  ← Frontend React
├── .vscode/
└── README.md

Objetivo:
Desplegar ambos en Railway desde un solo repositorio
```

---

## 🚀 PLAN DE 5 PASOS (25 minutos total)

### ✅ PASO 1: GitHub (5 min)
```powershell
cd C:\Users\Dani\Documents\Cudeca
git init
git add .
git commit -m "Preparar para Railway"
# Crear repo en github.com/new
git remote add origin https://github.com/TU-USUARIO/Cudeca.git
git push -u origin main
```

### ✅ PASO 2: Railway Backend (10 min)
1. railway.app → Login con GitHub
2. New Project → Deploy from GitHub → Cudeca
3. **Settings → Root Directory: `CudecaBE`** ← CRÍTICO
4. + New → Database → PostgreSQL
5. Variables → Añadir 13 variables (ver lista abajo)
6. Settings → Networking → Generate Domain
7. Verificar: https://[backend-url].up.railway.app/api/eventos

### ✅ PASO 3: Railway Frontend (5 min)
1. + New → GitHub Repo → Cudeca (mismo repo)
2. **Settings → Root Directory: `CudecaFE`** ← CRÍTICO
3. Variables → `VITE_API_URL` = [backend-url]
4. Settings → Networking → Generate Domain
5. Verificar: https://[frontend-url].up.railway.app

### ✅ PASO 4: Actualizar URLs (2 min)
1. Backend → Variables → Editar `FRONTEND_URL` con URL real
2. Backend → Variables → Editar `FRONTEND_URL_VITE` con URL real
3. Esperar redespliegue automático

### ✅ PASO 5: Google OAuth2 (3 min)
1. console.cloud.google.com
2. Credentials → Editar OAuth client
3. Añadir redirect URIs de producción

---

## 📋 VARIABLES BACKEND (13)

```bash
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

## ⚠️ PUNTOS CRÍTICOS

### 1. Root Directory (LA CLAVE)
- **Backend:** `CudecaBE` (exactamente así)
- **Frontend:** `CudecaFE` (exactamente así)

**Sin esto, Railway intentará compilar todo junto y fallará.**

### 2. Variables con Referencias
```bash
DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:...
                              ^^^^^^^^^^^^^^^^^^^^^^
                              Esto es una referencia de Railway
```

Railway reemplazará automáticamente `${{Postgres.PGHOST}}` con el valor real.

### 3. Dos servicios, un repositorio
- Servicio 1: Backend (Root: CudecaBE)
- Servicio 2: Frontend (Root: CudecaFE)
- Ambos del mismo repo "Cudeca"

---

## 📚 ARCHIVOS DE AYUDA

### PARA EMPEZAR AHORA
⭐ **`COMANDOS_FINALES_TU_PROYECTO.md`** - Comandos paso a paso (ABIERTO)
⭐ **`CHECKLIST_FINAL.md`** - Para marcar progreso

### PARA CONSULTAR
- `DIAGRAMA_MONOREPO.md` - Explicación visual
- `SOLUCION_MONOREPO.md` - Teoría y conceptos

---

## 🎯 PRIMER COMANDO

Abre PowerShell y ejecuta:

```powershell
cd C:\Users\Dani\Documents\Cudeca
```

Luego sigue `COMANDOS_FINALES_TU_PROYECTO.md` paso a paso.

---

## 💬 COMUNICACIÓN

- **Dudas:** Pregúntame en cualquier momento
- **Errores:** Copia el mensaje completo y envíamelo
- **Terminado:** Dime "siguiente paso" para continuar

---

## 🆘 SI ALGO FALLA

**Error común:** "Root directory not found"
→ Verifica que escribiste `CudecaBE` o `CudecaFE` exactamente (case-sensitive)

**Build falla:** 
→ Copia los logs completos y envíamelos

**CORS error:**
→ Verifica que `FRONTEND_URL` esté actualizada con la URL real de Railway

---

## ✅ RESULTADO ESPERADO

Al terminar tendrás:

```
✅ Código en GitHub
✅ Backend en Railway: https://cudeca-backend-xxx.up.railway.app
✅ Frontend en Railway: https://cudeca-frontend-xxx.up.railway.app
✅ Base de datos PostgreSQL funcionando
✅ OAuth2 Google configurado
✅ Todo integrado y funcionando
```

---

## 🚀 ¿LISTO?

**Archivo a seguir:** `COMANDOS_FINALES_TU_PROYECTO.md`

**Primer comando:**
```powershell
cd C:\Users\Dani\Documents\Cudeca
```

**¡Vamos! 💪**

