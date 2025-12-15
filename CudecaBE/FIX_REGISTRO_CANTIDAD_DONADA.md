# ✅ FIX: Error 400 - Campo cantidadDonada no debe ser nulo

## 🐛 Problema Original

```
POST http://localhost:8080/api/auth/register 400 (Bad Request)

Error del servidor: {
  "error": "Validation failed for classes [com.cudeca.cudecabe.model.Usuario] 
  during persist time for groups [jakarta.validation.groups.Default, ]
  List of constraint violations:[
    ConstraintViolationImpl{
      interpolatedMessage='no debe ser nulo', 
      propertyPath=cantidadDonada, 
      rootBeanClass=class com.cudeca.cudecabe.model.Usuario, 
      messageTemplate='{jakarta.validation.constraints.NotNull.message}'
    }
  ]"
}
```

## 🔍 Causa del Problema

En la entidad `Usuario`, el campo `cantidadDonada` tiene la anotación `@NotNull`:

```java
@NotNull
@ColumnDefault("0.00")
@Column(name = "cantidad_donada", nullable = false, precision = 10, scale = 2)
private BigDecimal cantidadDonada;
```

Sin embargo, en el servicio `AuthService`, al registrar un nuevo usuario, **NO se estaba estableciendo este campo**, causando que la validación fallara.

### Problema Adicional: Campo `provider`

Tampoco se estaba estableciendo el campo `provider`, que debería ser `"LOCAL"` para registros tradicionales (no OAuth2).

## ✅ Solución Aplicada

### 1. Modificado `AuthService.registrarConDireccion()`

**Antes**:
```java
usuario.setNombre(nombreCompleto);
usuario.setEmail(registerRequest.getEmail());
usuario.setTelefono(registerRequest.getTelefono());
usuario.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
usuario.setRol("USER"); // Rol por defecto

// Guardar el usuario
usuario = userRepository.save(usuario);
```

**Después** (✅ Arreglado):
```java
usuario.setNombre(nombreCompleto);
usuario.setEmail(registerRequest.getEmail());
usuario.setTelefono(registerRequest.getTelefono());
usuario.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
usuario.setRol("USER"); // Rol por defecto
usuario.setProvider("LOCAL"); // Provider LOCAL para registro tradicional ✅
usuario.setCantidadDonada(BigDecimal.ZERO); // Inicializar en 0 ✅

// Guardar el usuario
usuario = userRepository.save(usuario);
```

### 2. Modificado `AuthService.registrar()`

También arreglé el método `registrar()` para que establezca estos campos:

```java
// Establecer provider por defecto si no se especifica
if (usuario.getProvider() == null || usuario.getProvider().isEmpty()) {
    usuario.setProvider("LOCAL");
}

// Establecer cantidadDonada por defecto si no se especifica
if (usuario.getCantidadDonada() == null) {
    usuario.setCantidadDonada(BigDecimal.ZERO);
}
```

### 3. Añadido Import

```java
import java.math.BigDecimal;
```

## 📁 Archivos Modificados

1. **`src/main/java/com/cudeca/cudecabe/service/AuthService.java`**
   - Método `registrarConDireccion()`: Añadido `setProvider()` y `setCantidadDonada()`
   - Método `registrar()`: Añadidas validaciones para campos por defecto
   - Añadido import de `BigDecimal`

## 🧪 Prueba del Fix

### Antes (❌):
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellidos": "Pérez",
  "email": "juan@example.com",
  "telefono": "666555444",
  "password": "password123"
}

# Respuesta: 400 Bad Request
# Error: cantidadDonada no debe ser nulo
```

### Después (✅):
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellidos": "Pérez",
  "email": "juan@example.com",
  "telefono": "666555444",
  "password": "password123"
}

# Respuesta: 201 Created
# Usuario creado exitosamente con:
# - cantidadDonada: 0.00
# - provider: LOCAL
# - rol: USER
```

## 🎯 Verificación en la Base de Datos

Después de registrar un nuevo usuario, verifica que se haya guardado correctamente:

```sql
SELECT 
    id_user, 
    nombre, 
    email, 
    cantidad_donada, 
    provider, 
    rol 
FROM usuario 
WHERE email = 'juan@example.com';
```

Resultado esperado:
```
id_user | nombre      | email              | cantidad_donada | provider | rol
--------|-------------|--------------------|-----------------|---------|----- 
123     | Juan Pérez  | juan@example.com   | 0.00            | LOCAL   | USER
```

## 📊 Logs del Backend

Puedes ver en los logs que ahora se inserta correctamente:

```sql
insert into usuario 
  (cantidad_donada, email, nombre, password, provider, rol, telefono) 
values 
  (?, ?, ?, ?, ?, ?, ?)
```

Los valores insertados incluyen:
- `cantidad_donada`: 0.00 ✅
- `provider`: 'LOCAL' ✅

## ✅ Estado Actual

✅ **Registro de usuarios funciona correctamente**
✅ **Campo `cantidadDonada` se inicializa en 0.00**
✅ **Campo `provider` se establece como 'LOCAL'**
✅ **OAuth2 también establece estos campos correctamente**

## 🔄 Comparación: Registro LOCAL vs OAuth2

### Registro LOCAL (tradicional):
```java
usuario.setProvider("LOCAL");
usuario.setCantidadDonada(BigDecimal.ZERO);
```

### Registro OAuth2 (Google/Facebook):
```java
newUser.setProvider(provider); // "GOOGLE" o "FACEBOOK"
newUser.setCantidadDonada(BigDecimal.ZERO);
```

Ambos métodos ahora establecen correctamente todos los campos requeridos.

## 🎉 Resultado

El registro de usuarios ahora funciona perfectamente tanto para:
- ✅ Registro tradicional (email + password)
- ✅ Registro OAuth2 (Google, Facebook)

---

**Fix aplicado**: 2025-12-15 13:21  
**Archivo modificado**: `AuthService.java`  
**Problema resuelto**: Error 400 - cantidadDonada no debe ser nulo  
**Estado**: ✅ **FUNCIONANDO** (visible en los logs a las 13:21:24)

