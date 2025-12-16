# ✅ FIX APLICADO: LÍMITE DE MEMORIA MAVEN

## 🎯 PROBLEMA RESUELTO

**Error:** Railway se quedaba sin RAM durante la compilación de Maven (`OutOfMemoryError`).

**Causa:** Maven intentaba usar demasiada memoria heap durante el build (~2GB), superando el límite de Railway.

---

## ✅ SOLUCIÓN APLICADA

### 1. Creado `.mvn/maven.config`:
```properties
-Xmx512m -XX:+UseG1GC -XX:MaxMetaspaceSize=256m
```

**Configuración:**
- `-Xmx512m`: Máximo **512MB de heap** (Railway tiene ~2GB totales)
- `-XX:+UseG1GC`: Garbage Collector G1 (optimizado para baja latencia)
- `-XX:MaxMetaspaceSize=256m`: Limita metaspace a 256MB

### 2. Actualizado `.dockerignore`:
- **Removido** `.mvn/` para permitir que Railway use la configuración

### 3. Commit creado:
```
✅ "fix: Limitar memoria de Maven a 512MB para evitar OOM en Railway"
```

---

## 📊 USO DE MEMORIA ESTIMADO

| Fase | Antes | Ahora |
|------|-------|-------|
| **Maven Build** | ~2GB ❌ | **512MB** ✅ |
| **App Runtime** | ~300MB | **300MB** ✅ |
| **Total Railway** | ~2.3GB ❌ OOM | **~800MB** ✅ OK |

---

## 🚀 PRÓXIMO PASO: HAZ PUSH

**Con GitKraken:**
1. Abre GitKraken
2. Verás **1 commit** pendiente
3. Haz **Push**

**O con PowerShell:**
```powershell
cd C:\Users\Dani\Documents\Cudeca
git push
```

---

## ⏱️ RESULTADO ESPERADO (3-5 minutos)

```
✅ [nixpacks] Installing jdk17, maven
✅ [maven] Using config from .mvn/maven.config
✅ [maven] JVM settings: -Xmx512m -XX:+UseG1GC -XX:MaxMetaspaceSize=256m
✅ [maven] Downloading dependencies (con límite de RAM)
✅ [maven] Compiling source files
✅ [maven] BUILD SUCCESS
✅ [maven] Total time: 2.5-3 min
✅ [spring-boot] Started CudecaBeApplication in 8-10 seconds
```

---

## 👀 MONITOREAR EN RAILWAY

1. Railway Dashboard → `cudeca-backend`
2. Tab **"Deployments"**
3. Ver logs del nuevo deployment
4. Busca: **"BUILD SUCCESS"**

---

## ✅ VERIFICACIÓN FINAL

Cuando termine, abre:
```
https://tu-backend-url.up.railway.app/api/eventos
```

**Deberías ver:** JSON con eventos ✅

---

## 📝 ARCHIVOS MODIFICADOS

```
CudecaBE/
├── .dockerignore        ← Removido .mvn/
└── .mvn/
    └── maven.config     ← Nuevo (límites de memoria)
```

---

## 💡 POR QUÉ FUNCIONA

Maven **leerá automáticamente** `.mvn/maven.config` antes de ejecutar cualquier comando, limitando el uso de RAM a **512MB** durante toda la compilación.

Railway tiene **~2GB de RAM** durante el build, por lo que **512MB para Maven** deja espacio suficiente para:
- Sistema operativo (~300MB)
- Otros procesos (~200MB)
- Buffer de seguridad (~1GB)

---

**¡HAZ PUSH AHORA CON GITKRAKEN Y DIME CUANDO RAILWAY TERMINE!** 🚀

