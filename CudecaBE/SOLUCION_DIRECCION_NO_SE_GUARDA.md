# Solución: La dirección no se guarda desde React

## 🔍 Problema Identificado

El **backend de Spring Boot** espera recibir `direccion` (singular, como objeto), pero **React está enviando** `direcciones` (plural, como array).

### Backend Java (Correcto)
```java
// UsuarioRegisterRequest.java
public class UsuarioRegisterRequest {
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
    private String password;
    private DireccionRequest direccion; // ✅ SINGULAR, OBJETO
}
```

### React (Incorrecto)
```javascript
{
  nombre: "JF Robles Fortes",
  email: "jf@example.com",
  password: "12345678",
  telefono: "722630108",
  rol: "SOCIO",
  cantidadDonada: 15,
  direcciones: [{ // ❌ PLURAL, ARRAY
    calle: "C/ José Sanchez Rando N2 B3",
    numero: "2",
    // ...
  }]
}
```

---

## ✅ Solución en React

### Opción 1: Cambiar de `direcciones` a `direccion` (RECOMENDADO)

Busca en tu código de React donde construyes el objeto de registro y cambia:

```javascript
// ❌ ANTES (Incorrecto)
const usuarioData = {
  nombre: formData.nombre,
  email: formData.email,
  password: formData.password,
  telefono: formData.telefono,
  rol: formData.rol,
  cantidadDonada: formData.cantidadDonada,
  direcciones: [{ // Array
    calle: formData.calle,
    numero: formData.numero,
    piso: formData.piso,
    puerta: formData.puerta,
    codigoPostal: formData.codigoPostal,
    ciudad: formData.ciudad,
    provincia: formData.provincia,
    pais: formData.pais
  }]
};

// ✅ DESPUÉS (Correcto)
const usuarioData = {
  nombre: formData.nombre,
  apellidos: formData.apellidos, // Opcional
  email: formData.email,
  password: formData.password,
  telefono: formData.telefono,
  direccion: { // Objeto singular, sin array
    calle: formData.calle,
    numero: formData.numero,
    piso: formData.piso,
    puerta: formData.puerta,
    codigoPostal: formData.codigoPostal,
    ciudad: formData.ciudad,
    provincia: formData.provincia,
    pais: formData.pais
  }
};
```

### Opción 2: Extraer el primer elemento del array

Si no quieres cambiar mucho código:

```javascript
const usuarioData = {
  nombre: formData.nombre,
  email: formData.email,
  password: formData.password,
  telefono: formData.telefono,
  direccion: direcciones[0] // Extraer el primer elemento
};
```

---

## 🔧 Cómo Verificar el JSON Enviado

### En el navegador (F12):

1. Abre **DevTools** (F12)
2. Ve a la pestaña **Network** (Red)
3. Filtra por **Fetch/XHR**
4. Haz el registro
5. Busca la petición POST a `/api/auth/register`
6. Haz clic en la petición
7. Ve a **Payload** o **Request**
8. Verifica que diga `direccion: { ... }` y NO `direcciones: [{ ... }]`

### Ejemplo de JSON correcto:
```json
{
  "nombre": "JF Robles Fortes",
  "email": "jf@example.com",
  "password": "12345678",
  "telefono": "722630108",
  "direccion": {
    "calle": "C/ José Sanchez Rando N2 B3",
    "numero": "2",
    "piso": "3",
    "puerta": "F",
    "codigoPostal": "29620",
    "ciudad": "Torremolinos",
    "provincia": "Málaga",
    "pais": "España"
  }
}
```

---

## 📝 Campos Opcionales

Según el backend, estos campos son **opcionales**:
- `apellidos` (si no lo envías, solo se guarda el nombre)
- `direccion` (toda la dirección es opcional, pero si la envías debe estar bien formada)
- `rol` - El backend asigna `"USER"` por defecto (no envíes `"SOCIO"` si no está configurado en el backend)
- `cantidadDonada` - El backend asigna `0` por defecto

---

## 🎯 Cambios Recomendados en React

### 1. No envíes `rol` ni `cantidadDonada` desde el frontend

El backend ya los maneja automáticamente:
```javascript
const usuarioData = {
  nombre: formData.nombre,
  apellidos: formData.apellidos,
  email: formData.email,
  password: formData.password,
  telefono: formData.telefono,
  direccion: {
    calle: formData.calle,
    // ...resto de campos
  }
  // ❌ NO envíes rol ni cantidadDonada
};
```

### 2. Valida que el teléfono tenga 9 dígitos

El backend espera exactamente 9 dígitos:
```javascript
// En tu validación de formulario
if (!/^[0-9]{9}$/.test(formData.telefono)) {
  setError("El teléfono debe tener 9 dígitos");
  return;
}
```

---

## 🧪 Prueba con Swagger vs React

### Swagger (Funciona) ✅
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "12345678",
  "telefono": "123456789",
  "direccion": {
    "calle": "Calle Principal",
    "numero": "123"
  }
}
```

### React Actual (No funciona) ❌
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "12345678",
  "telefono": "123456789",
  "direcciones": [{  // ❌ Plural y array
    "calle": "Calle Principal",
    "numero": "123"
  }]
}
```

La única diferencia es `direccion` vs `direcciones` y objeto vs array.

---

## 📂 Archivos a Modificar en tu Proyecto React

Busca estos archivos (nombres aproximados):
- `src/components/Register.jsx` o `src/pages/Register.jsx`
- `src/context/AuthContext.jsx`
- `src/services/authService.js` o `src/api/auth.js`

Y asegúrate de que el objeto que envías tenga `direccion` (singular, objeto).

---

## ✅ Resumen

| Campo | Backend Espera | React Envía | Solución |
|-------|----------------|-------------|----------|
| direccion | Objeto singular | Array plural | Cambiar a objeto singular |
| rol | No necesario (auto) | "SOCIO" | No enviar |
| cantidadDonada | No necesario (auto) | 15 | No enviar |
| apellidos | Opcional | ❓ | Añadir si lo tienes |

---

## 🐛 Debug Adicional

Si después de corregir sigue sin funcionar, añade logs en el backend:

```java
@PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody UsuarioRegisterRequest registerRequest) {
    System.out.println("📥 Datos recibidos: " + registerRequest);
    System.out.println("📍 Dirección: " + registerRequest.getDireccion());
    
    try {
        LoginResponseDTO response = authService.registrarConDireccion(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (Exception e) {
        e.printStackTrace(); // Ver el error completo
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getMessage()));
    }
}
```

Y en el servicio:

```java
@Transactional
public LoginResponseDTO registrarConDireccion(UsuarioRegisterRequest registerRequest) {
    System.out.println("🔍 Procesando registro...");
    System.out.println("📧 Email: " + registerRequest.getEmail());
    System.out.println("📍 Dirección recibida: " + registerRequest.getDireccion());
    
    // ...resto del código
    
    if (registerRequest.getDireccion() != null) {
        System.out.println("✅ Guardando dirección...");
        // ...
    } else {
        System.out.println("⚠️ No hay dirección para guardar");
    }
}
```

Esto te mostrará en la consola de IntelliJ exactamente qué está recibiendo el backend.

