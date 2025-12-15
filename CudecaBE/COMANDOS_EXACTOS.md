# 🎯 COMANDOS EXACTOS PARA EJECUTAR

## 📦 PARTE 1: GIT Y GITHUB

### Paso 1.1: Preparar Git (PowerShell)
```powershell
cd C:\Users\Dani\Documents\Cudeca\CudecaBE
```

### Paso 1.2: Verificar estado
```powershell
git status
```

### Paso 1.3: Añadir y commitear
```powershell
git add .
git commit -m "Configurar variables de entorno para Railway"
```

### Paso 1.4: Crear repo en GitHub
**IR A:** https://github.com/new
- Repository name: `CudecaBE`
- Private
- NO marcar nada más
- Click "Create repository"

### Paso 1.5: Conectar y subir
**⚠️ IMPORTANTE:** Reemplaza `TU-USUARIO` con tu usuario real de GitHub

```powershell
git remote add origin https://github.com/TU-USUARIO/CudecaBE.git
git branch -M main
git push -u origin main
```

**Si te pide usuario/contraseña:**
- Usuario: tu usuario de GitHub
- Contraseña: Personal Access Token (NO tu contraseña de GitHub)
  - Crear token: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Marca "repo"
  - Copia el token generado y úsalo como contraseña

---

## 🚂 PARTE 2: RAILWAY

### Paso 2.1: Crear cuenta
**IR A:** https://railway.app
- Click "Login"
- Selecciona "Login With GitHub"
- Autoriza Railway

### Paso 2.2: Crear proyecto
1. Click "+ New Project"
2. Click "Deploy from GitHub repo"
3. Selecciona `CudecaBE`
4. Espera que inicie el build (fallará, es normal)

### Paso 2.3: Añadir PostgreSQL
1. Click "+ New" (botón morado arriba derecha)
2. Click "Database"
3. Click "Add PostgreSQL"
4. Espera 30 segundos

### Paso 2.4: Configurar variables de entorno

**EN:** Servicio "CudecaBE" → Pestaña "Variables" → Click "New Variable"

Añade estas 13 variables **UNA POR UNA** (copia exactamente):

#### Variable 1:
```
Name: DATABASE_URL
Value: jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
```

#### Variable 2:
```
Name: DB_USERNAME
Value: ${{Postgres.PGUSER}}
```

#### Variable 3:
```
Name: DB_PASSWORD
Value: ${{Postgres.PGPASSWORD}}
```

#### Variable 4:
```
Name: JWT_SECRET
Value: CudecaSecretKeyForJWTTokenGenerationAndValidation2024MustBeAtLeast256BitsLongForHS256Algorithm
```

#### Variable 5:
```
Name: JWT_EXPIRATION
Value: 36000000
```

#### Variable 6:
```
Name: JWT_REFRESH_EXPIRATION
Value: 604800000
```

#### Variable 7:
```
Name: FRONTEND_URL
Value: http://localhost:3000
```

#### Variable 8:
```
Name: FRONTEND_URL_VITE
Value: http://localhost:5173
```

#### Variable 9:
```
Name: BACKEND_URL
Value: https://${{RAILWAY_PUBLIC_DOMAIN}}
```

#### Variable 10:
```
Name: GOOGLE_CLIENT_ID
Value: 50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com
```

#### Variable 11:
```
Name: GOOGLE_CLIENT_SECRET
Value: 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
```

#### Variable 12:
```
Name: SECURITY_USER_NAME
Value: admin
```

#### Variable 13:
```
Name: SECURITY_USER_PASSWORD
Value: CudecaAdmin2024!
```

### Paso 2.5: Generar dominio público
1. EN servicio "CudecaBE" → "Settings"
2. Scroll hasta "Networking"
3. Click "Generate Domain"
4. **COPIAR LA URL** que aparece (ejemplo: https://cudecabe-production.up.railway.app)

### Paso 2.6: Redesplegar
1. Pestaña "Deployments"
2. Click en los 3 puntos (...) del deployment actual
3. Click "Redeploy"
4. Click en el deployment para ver logs

### Paso 2.7: Verificar logs
**BUSCAR EN LOGS:**
✅ "Started CudecaBeApplication in X seconds"
✅ "Flyway migration successful"
✅ Sin líneas con "ERROR" o "FAILED"

---

## ✅ VERIFICACIÓN FINAL

### Abrir en navegador:
```
https://TU-DOMINIO.up.railway.app/api/eventos
```

**REEMPLAZA** `TU-DOMINIO` con el dominio que generaste en Paso 2.5

**DEBERÍAS VER:**
```json
[
  {
    "id": 1,
    "nombre": "Carrera Solidaria 5K",
    ...
  }
]
```

---

## 📝 ANOTAR AQUÍ

**Mi usuario de GitHub:** _______________________

**URL de mi repo:** https://github.com/____________/CudecaBE

**URL de mi backend en Railway:** https://_________________________________.up.railway.app

---

## ✅ CUANDO TERMINES

Verifica que:
- [ ] El código está en GitHub
- [ ] Railway está desplegado sin errores
- [ ] La URL del backend responde con JSON

Luego dime: **"siguiente paso"**

---

## 🆘 SI ALGO FALLA

**Escríbeme:**
"Tengo un error en [PARTE X, PASO Y]: [MENSAJE DE ERROR]"

Y te ayudo a resolverlo. 💪

