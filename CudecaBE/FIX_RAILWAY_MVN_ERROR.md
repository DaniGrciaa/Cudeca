# 🔧 SOLUCIÓN AL ERROR: "vn: command not found"

## ❌ ERROR DETECTADO

```
RUN vn clean package -DskipTests
/bin/bash: line 1: vn: command not found
```

**Problema:** Railway estaba generando un Dockerfile con `vn` en lugar de `mvn`.

## ✅ SOLUCIÓN APLICADA

He creado/actualizado 2 archivos para forzar a Railway a usar el comando correcto:

### 1. `railway.toml` (actualizado)
- Especifica explícitamente el comando de build: `mvn clean package -DskipTests`

### 2. `nixpacks.json` (nuevo)
- Configuración adicional para asegurar que Maven se ejecuta correctamente

## 🚀 PASOS PARA APLICAR LA SOLUCIÓN

### 1. Hacer commit y push de los cambios

Abre PowerShell en la carpeta raíz de tu proyecto:

```powershell
cd C:\Users\Dani\Documents\Cudeca
```

Añadir los archivos actualizados:

```powershell
git add CudecaBE/railway.toml
git add CudecaBE/nixpacks.json
git commit -m "Fix: Corregir comando Maven en Railway (vn -> mvn)"
git push
```

### 2. Railway redesplegará automáticamente

Una vez hagas push, Railway detectará los cambios y:
- ✅ Usará la nueva configuración de `railway.toml`
- ✅ Ejecutará `mvn clean package -DskipTests` correctamente
- ✅ Compilará tu proyecto sin errores

### 3. Verificar el despliegue

1. Ve a Railway Dashboard
2. Click en tu servicio `cudeca-backend`
3. Ve a "Deployments"
4. Click en el nuevo deployment
5. Ver logs

**Deberías ver:**
```
✅ mvn clean package -DskipTests
✅ BUILD SUCCESS
✅ Started CudecaBeApplication
```

---

## 🔍 VERIFICACIÓN RÁPIDA

Después del redespliegue, verifica:

```
https://tu-backend.up.railway.app/api/eventos
```

Debería responder con JSON.

---

## 🆘 SI PERSISTE EL ERROR

**Opción 1: Limpiar caché de Railway**
1. En Railway → Settings del servicio
2. Scroll hasta "Danger Zone"
3. Click "Clear Build Cache"
4. Redesplegar manualmente

**Opción 2: Verificar Root Directory**
1. Settings → Build
2. Asegúrate de que Root Directory = `CudecaBE`
3. Guardar

**Opción 3: Forzar redespliegue**
```powershell
git commit --allow-empty -m "Trigger Railway rebuild"
git push
```

---

## ✅ ARCHIVOS MODIFICADOS

```
CudecaBE/
├── railway.toml      ← Actualizado con comando correcto
└── nixpacks.json     ← Nuevo (configuración explícita)
```

---

**Ejecuta los comandos git y dime cuando hayas hecho push.** 🚀

