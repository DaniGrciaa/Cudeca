# 🔧 SOLUCIÓN - Error jwt.secret

## ❌ Problema
```
java.lang.IllegalArgumentException: Could not resolve placeholder 'jwt.secret' in value "${jwt.secret}"
```

## ✅ Causa
El directorio `target/` tenía archivos compilados antiguos que no incluían las propiedades actualizadas.

## 🔨 Solución Aplicada

1. ✅ Limpiado completamente el directorio `target/`
2. ✅ Las propiedades JWT están correctamente configuradas en `application-dev.properties`

## 🚀 PASOS PARA ARRANCAR

### Opción 1: Desde IntelliJ IDEA (Recomendado)

1. **Limpiar proyecto:**
   - Menú: `Build` → `Clean Project`
   - Espera a que termine

2. **Recompilar:**
   - Menú: `Build` → `Rebuild Project`
   - Espera a que termine

3. **Ejecutar:**
   - Click derecho en `CudecaBeApplication.java`
   - `Run 'CudecaBeApplication'`

### Opción 2: Desde Maven (Terminal)

```powershell
# Navegar al proyecto
cd C:\Users\Dani\Documents\Cudeca\CudecaBE

# Limpiar y compilar
mvn clean compile

# Ejecutar
mvn spring-boot:run
```

### Opción 3: Compilar JAR y Ejecutar

```powershell
# Compilar
mvn clean package -DskipTests

# Ejecutar
java -jar target\CudecaBE-0.0.1-SNAPSHOT.jar
```

## ✅ Verificación de Propiedades

Las siguientes propiedades están configuradas en `application-dev.properties`:

```properties
# JWT Configuration
jwt.secret=CudecaSecretKeyForJWTTokenGenerationAndValidation2024MustBeAtLeast256BitsLongForHS256Algorithm
jwt.expiration=36000000
jwt.refresh.expiration=604800000

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/Cudeca
spring.datasource.username=postgres
spring.datasource.password=1234

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true

# Server
server.port=8080
```

## 🎯 Al Arrancar Deberías Ver

```
🟢 Flyway migration V24 applied successfully
🟢 Started CudecaBeApplication in X.XXX seconds
🟢 Tomcat started on port(s): 8080
```

## ⚠️ Si Sigue Fallando

### 1. Verificar que PostgreSQL esté corriendo
```powershell
# Verificar servicio PostgreSQL
Get-Service postgresql*
```

### 2. Verificar conexión a base de datos
- Host: localhost
- Puerto: 5432
- Database: Cudeca
- Usuario: postgres
- Password: 1234

### 3. Crear la base de datos si no existe
```sql
CREATE DATABASE "Cudeca";
```

### 4. Si el error persiste, eliminar caché de Maven
```powershell
Remove-Item -Path "$env:USERPROFILE\.m2\repository\com\cudeca" -Recurse -Force
mvn clean install -DskipTests
```

## 📋 Checklist Pre-Arranque

- [ ] PostgreSQL corriendo
- [ ] Base de datos "Cudeca" existe
- [ ] Directorio `target/` limpio
- [ ] Maven actualizado
- [ ] Perfil activo: `dev` (en application.properties)

## ✅ Sistema Listo

Una vez que arranque correctamente:

### Endpoints Disponibles:
```
POST   /api/compras-eventos              - Comprar eventos (carrito)
GET    /api/compras-eventos/mis-eventos  - Ver mis eventos
POST   /api/auth/login                   - Login
```

### Ejemplo de Compra:
```bash
# 1. Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"password"}'

# 2. Comprar eventos (guarda el token del login)
curl -X POST http://localhost:8080/api/compras-eventos \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "eventos": [
      { "eventoId": 1, "cantidadEntradas": 2, "precioTotal": 50.00 }
    ]
  }'
```

## 🎉 ¡Listo para Usar!

El sistema debería arrancar sin problemas ahora.

