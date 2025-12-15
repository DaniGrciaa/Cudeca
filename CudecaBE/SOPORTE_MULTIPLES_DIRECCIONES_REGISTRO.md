# Soporte para Múltiples Direcciones en el Registro

## 📋 Resumen de Cambios

Se ha actualizado el sistema de registro de usuarios para soportar **múltiples direcciones** durante el registro, respetando la relación `@OneToMany` entre `Usuario` y `Direccion`.

---

## 🔄 Cambios Realizados

### 1. **UsuarioRegisterRequest.java**

Se agregó soporte para un array de direcciones, manteniendo compatibilidad con el campo único existente:

```java
// Campo único (compatibilidad con código existente)
private DireccionRequest direccion;

// Nuevo campo para múltiples direcciones
@Valid
private List<DireccionRequest> direcciones;
```

**Comportamiento:**
- Si se envía `direcciones` (array), se procesan todas las direcciones
- Si se envía `direccion` (campo único), se procesa una sola dirección
- Si se envían ambos, `direcciones` tiene prioridad
- Si no se envía ninguno, el usuario se registra sin direcciones

---

### 2. **AuthService.java**

Se refactorizó el método `registrarConDireccion` para:

1. **Procesar múltiples direcciones:**
```java
if (registerRequest.getDirecciones() != null && !registerRequest.getDirecciones().isEmpty()) {
    for (var direccionRequest : registerRequest.getDirecciones()) {
        guardarDireccion(usuario, direccionRequest);
    }
}
```

2. **Mantener compatibilidad con dirección única:**
```java
else if (registerRequest.getDireccion() != null) {
    guardarDireccion(usuario, registerRequest.getDireccion());
}
```

3. **Método auxiliar `guardarDireccion`:**
- Evita duplicación de código
- Valida que la dirección tenga datos suficientes
- Asocia la dirección al usuario correctamente
- Retorna `true` si se guardó, `false` si no

---

### 3. **AuthController.java**

Se actualizó el log para mostrar correctamente el número de direcciones:

```java
if (registerRequest.getDirecciones() != null && !registerRequest.getDirecciones().isEmpty()) {
    System.out.println("  └─ Direcciones: " + registerRequest.getDirecciones().size() + " dirección(es)");
} else if (registerRequest.getDireccion() != null) {
    System.out.println("  └─ Dirección: 1 dirección (campo único)");
} else {
    System.out.println("  └─ Dirección: ninguna");
}
```

---

## 📦 Formato de JSON

### **Opción 1: Múltiples direcciones (nuevo)**

```json
{
  "nombre": "Juan",
  "apellidos": "García",
  "email": "juan@example.com",
  "telefono": "123456789",
  "password": "password123",
  "direcciones": [
    {
      "calle": "Calle Principal",
      "numero": "123",
      "piso": "2",
      "puerta": "A",
      "codigoPostal": "28001",
      "ciudad": "Madrid",
      "provincia": "Madrid",
      "pais": "España"
    },
    {
      "calle": "Avenida Secundaria",
      "numero": "456",
      "codigoPostal": "28002",
      "ciudad": "Madrid",
      "provincia": "Madrid",
      "pais": "España"
    }
  ]
}
```

### **Opción 2: Dirección única (compatible con código anterior)**

```json
{
  "nombre": "Juan",
  "apellidos": "García",
  "email": "juan@example.com",
  "telefono": "123456789",
  "password": "password123",
  "direccion": {
    "calle": "Calle Principal",
    "numero": "123",
    "piso": "2",
    "puerta": "A",
    "codigoPostal": "28001",
    "ciudad": "Madrid",
    "provincia": "Madrid",
    "pais": "España"
  }
}
```

### **Opción 3: Sin direcciones**

```json
{
  "nombre": "Juan",
  "apellidos": "García",
  "email": "juan@example.com",
  "telefono": "123456789",
  "password": "password123"
}
```

---

## ✅ Validaciones

- Las direcciones son **opcionales** durante el registro
- Se validan automáticamente con `@Valid` en el array de direcciones
- Solo se guardan direcciones que tengan al menos uno de estos campos: `calle`, `ciudad` o `codigoPostal`
- Todas las direcciones se asocian correctamente al usuario mediante la relación `@ManyToOne`

---

## 🔍 Logs del Sistema

El sistema ahora proporciona logs detallados:

```
📥 [REGISTER] Datos recibidos del frontend:
  ├─ Nombre: Juan
  ├─ Email: juan@example.com
  ├─ Teléfono: 123456789
  └─ Direcciones: 2 dirección(es)

🔍 [SERVICIO] Iniciando registro de usuario...
✅ [SERVICIO] Usuario guardado con ID: 1

📍 [SERVICIO] Múltiples direcciones detectadas en el request (2)
📍 [SERVICIO] Procesando dirección 1:
  ├─ Calle: Calle Principal
  ├─ Número: 123
  ├─ CP: 28001
  ├─ Ciudad: Madrid
  └─ País: España
  ✅ Dirección guardada con ID: 1

📍 [SERVICIO] Procesando dirección 2:
  ├─ Calle: Avenida Secundaria
  ├─ Número: 456
  ├─ CP: 28002
  ├─ Ciudad: Madrid
  └─ País: España
  ✅ Dirección guardada con ID: 2

✅ [SERVICIO] Total de direcciones guardadas: 2
✅ [SERVICIO] Registro completado exitosamente
```

---

## 🎯 Ventajas

1. ✅ **Respeta la relación OneToMany** entre Usuario y Dirección
2. ✅ **Compatibilidad con código existente** (dirección única sigue funcionando)
3. ✅ **Permite múltiples direcciones** durante el registro
4. ✅ **Validaciones automáticas** con Bean Validation
5. ✅ **Logs detallados** para debugging
6. ✅ **Transaccional** - si falla algo, todo se revierte

---

## 🧪 Pruebas

### **Prueba con cURL - Múltiples direcciones:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellidos": "García",
    "email": "juan@example.com",
    "telefono": "123456789",
    "password": "password123",
    "direcciones": [
      {
        "calle": "Calle Principal",
        "numero": "123",
        "codigoPostal": "28001",
        "ciudad": "Madrid",
        "pais": "España"
      },
      {
        "calle": "Avenida Secundaria",
        "numero": "456",
        "codigoPostal": "28002",
        "ciudad": "Barcelona",
        "pais": "España"
      }
    ]
  }'
```

### **Respuesta esperada:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "nombre": "Juan García",
  "email": "juan@example.com",
  "rol": "USER",
  "mensaje": "Usuario registrado exitosamente"
}
```

---

## 📚 Archivos Modificados

1. `src/main/java/com/cudeca/cudecabe/DTOs/usuario/UsuarioRegisterRequest.java`
2. `src/main/java/com/cudeca/cudecabe/service/AuthService.java`
3. `src/main/java/com/cudeca/cudecabe/controllers/AuthController.java`

---

## 🔗 Relación con la Base de Datos

La tabla `direccion` tiene una columna `id_usuario` que apunta al usuario:

```sql
CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuario(id_user),
    calle VARCHAR(200),
    numero VARCHAR(50),
    piso VARCHAR(10),
    puerta VARCHAR(10),
    codigo_postal VARCHAR(10),
    ciudad VARCHAR(100),
    provincia VARCHAR(100),
    pais VARCHAR(100)
);
```

Cada dirección guardada se asocia automáticamente al usuario mediante:
```java
direccion.setUsuario(usuario);
```

---

## 📝 Notas Adicionales

- El frontend puede enviar tantas direcciones como necesite
- No hay límite en el número de direcciones por usuario
- Las direcciones se guardan en orden en la base de datos
- Si una dirección falla, toda la transacción se revierte (comportamiento `@Transactional`)

