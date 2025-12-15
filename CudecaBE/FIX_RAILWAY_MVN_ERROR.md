# 🔧 SOLUCIÓN AL ERROR: Railway Build Failed

## ❌ ERRORES DETECTADOS

### Error 1: "vn: command not found"
```
RUN vn clean package -DskipTests
/bin/bash: line 1: vn: command not found
```

### Error 2: "Provider maven not found"
```
Error: Provider maven not found
```

**Problema:** Railway/Nixpacks tenía problemas detectando y ejecutando Maven correctamente.

## ✅ SOLUCIÓN APLICADA

He actualizado 2 archivos para configurar Railway correctamente:

### 1. `nixpacks.json` (corregido)
- Especifica JDK 17 y Maven como dependencias explícitas
- Define el comando de build correcto
- Configura el comando de inicio

### 2. `railway.toml` (corregido)
- Configuración limpia para Railway
- Healthcheck configurado
- Start command correcto

## 🚀 PASOS PARA APLICAR LA SOLUCIÓN

### Ejecuta estos comandos en PowerShell:

```powershell
# Ir a la carpeta raíz del proyecto
cd C:\Users\Dani\Documents\Cudeca

# Añadir los archivos corregidos
git add CudecaBE/railway.toml
git add CudecaBE/nixpacks.json
git add CudecaBE/FIX_RAILWAY_MVN_ERROR.md

# Commit
git commit -m "Fix: Configurar Railway con JDK17 y Maven explícitamente"

# Push (dispara redespliegue automático)
git push
```

---

## ⏱️ QUÉ ESPERAR DESPUÉS DEL PUSH

Railway redesplegará automáticamente y:

1. ✅ Instalará JDK 17
2. ✅ Instalará Maven
3. ✅ Ejecutará `mvn clean package -DskipTests` correctamente
4. ✅ Generará el JAR en `target/CudecaBE-0.0.1-SNAPSHOT.jar`
5. ✅ Iniciará la aplicación con `java -jar`

**Tiempo estimado:** 3-5 minutos

---

## 👀 MONITOREAR EL DESPLIEGUE

1. Ve a Railway Dashboard
2. Click en servicio `cudeca-backend`
3. Tab **"Deployments"**
4. Click en el deployment activo
5. **"View Logs"**

### Busca en los logs:

```
✅ Installing JDK 17
✅ Installing Maven
✅ [maven] Running 'mvn clean package -DskipTests'
✅ BUILD SUCCESS
✅ Total time: X min
✅ Started CudecaBeApplication in X seconds
```

---

## ✅ VERIFICACIÓN FINAL

Cuando el despliegue termine, verifica en tu navegador:

```
https://tu-backend-url.up.railway.app/api/eventos
```

**Deberías ver:** JSON con la lista de eventos ✅

---

## 🆘 SI AÚN HAY ERRORES

### Error: "Could not find Java"
**Solución:** Railway debería instalar JDK automáticamente. Si falla:
1. Settings → Environment
2. Añade variable: `NIXPACKS_JDK_VERSION=17`

### Error: "pom.xml not found"
**Solución:** Verifica Root Directory:
1. Settings → Build
2. Asegúrate: `Root Directory = CudecaBE`

### Error: Flyway migration failed
**Solución:** Verifica las variables de base de datos:
```
DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/railway
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
```

### Build muy lento (más de 10 minutos)
**Solución:** Es normal la primera vez. Railway descarga:
- JDK 17 (~100MB)
- Dependencias Maven (~200MB)
- Espera hasta 15 minutos la primera vez

---

## 📋 ARCHIVOS DE CONFIGURACIÓN

### `nixpacks.json`
```json
{
  "providers": [],
  "phases": {
    "setup": {
      "nixPkgs": ["jdk17", "maven"]
    },
    "build": {
      "cmds": [
        "mvn clean package -DskipTests"
      ]
    }
  },
  "start": {
    "cmd": "java -Dserver.port=$PORT -jar target/CudecaBE-0.0.1-SNAPSHOT.jar"
  }
}
```

### `railway.toml`
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "java -Dserver.port=$PORT -jar target/CudecaBE-0.0.1-SNAPSHOT.jar"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[deploy.healthcheck]
path = "/api/eventos"
timeout = 100
```

---

## ✅ RESUMEN

**Cambios aplicados:**
- ✅ Configuración explícita de JDK 17 y Maven
- ✅ Comando de build correcto
- ✅ Start command optimizado
- ✅ Healthcheck configurado

**Próximo paso:**
1. Ejecuta los comandos git arriba
2. Espera 3-5 minutos
3. Verifica la URL de tu backend
4. Si funciona, dime **"siguiente paso"** para continuar con el frontend

---

**¡Ejecuta los comandos ahora!** 🚀

