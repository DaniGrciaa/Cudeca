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

### Error 3: "Maven build failed - exit code: 1"
```
RUN mvn clean package -DskipTests
ERROR: exit code: 1
```

### Error 4: "undefined variable 'jdk21'"
```
error: undefined variable 'jdk21'
at /app/.nixpacks/nixpkgs-5148520bfab61f99fd25fb9ff7bfbb50dad3c9db.nix:19:9
```

**Problema:** 
- El proyecto necesitaba una versión de Java estable
- Los paquetes `jdk21` y `jdk` causaban problemas en Nixpacks
- **Solución final:** Usar Java 17 LTS que tiene soporte estable en Railway

## ✅ SOLUCIÓN APLICADA

He configurado el proyecto para usar **Java 17 LTS** para mejor compatibilidad:

### 1. `pom.xml` (actualizado)
- Configurado `<java.version>17</java.version>`
- Java 17 es LTS y totalmente compatible con Spring Boot 3.x

### 2. `nixpacks.json` (actualizado)
- Configurado `"jdk17"` (paquete estable y confirmado en Nixpacks)
- Maven configurado correctamente

### 3. `railway.toml` (sin cambios)
- Configuración de deploy correcta

## 🚀 PASOS PARA APLICAR LA SOLUCIÓN

### Los cambios ya están aplicados. Solo haz commit y push:

```powershell
# Ir a la carpeta raíz del proyecto
cd C:\Users\Dani\Documents\Cudeca

# Ver los cambios realizados
git status

# Añadir los archivos modificados
git add CudecaBE/pom.xml
git add CudecaBE/nixpacks.json
git add CudecaBE/FIX_RAILWAY_MVN_ERROR.md

# Commit
git commit -m "Fix: Actualizar a Java 21 para Railway compatibility"

# Push (dispara redespliegue automático)
git push
```

---

## ⏱️ QUÉ ESPERAR DESPUÉS DEL PUSH

Railway redesplegará automáticamente y:

1. ✅ Instalará **JDK 17** (versión LTS estable)
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
✅ [nixpacks] Installing nixPkgs: jdk17, maven
✅ [maven] Running 'mvn clean package -DskipTests'
✅ [maven] BUILD SUCCESS
✅ [maven] Total time: X min
✅ Started CudecaBeApplication in X seconds (JVM running for X)
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
**Solución:** Railway debería instalar JDK 21 automáticamente. Si falla:
1. Settings → Environment
2. Añade variable: `NIXPACKS_JDK_VERSION=21`

### Error: "Source option X is no longer supported"
**Solución:** Verifica que `pom.xml` tenga:
```xml
<properties>
    <java.version>21</java.version>
</properties>
```

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
- JDK 21 (~120MB)
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

**Nota:** `jdk17` es la versión LTS estable y confirmada en Nixpacks.

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

### `pom.xml` (sección properties)
```xml
<properties>
    <java.version>17</java.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
</properties>
```

---

## ✅ RESUMEN

**Cambios aplicados:**
- ✅ Java configurado a **17 LTS** (versión estable)
- ✅ Configuración correcta de JDK 17 y Maven en nixpacks
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

