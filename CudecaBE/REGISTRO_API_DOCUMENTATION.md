# API de Registro de Usuario con Dirección

## Endpoint de Registro

### POST `/api/auth/register`

Registra un nuevo usuario en el sistema con su información personal y dirección (opcional). Después del registro exitoso, el usuario recibe automáticamente tokens JWT para iniciar sesión.

#### Request Body

```json
{
  "nombre": "Juan",
  "apellidos": "García Pérez",
  "email": "juan.garcia@example.com",
  "telefono": "666777888",
  "password": "MiPassword123!",
  "direccion": {
    "calle": "Calle Mayor",
    "numero": "123",
    "piso": "2",
    "puerta": "A",
    "codigoPostal": "29001",
    "ciudad": "Málaga",
    "provincia": "Málaga",
    "pais": "España"
  }
}
```

#### Campos Obligatorios

- `nombre`: String (máximo 100 caracteres)
- `email`: String válido formato email (máximo 150 caracteres)
- `password`: String (mínimo 8 caracteres)

#### Campos Opcionales

- `apellidos`: String (máximo 100 caracteres)
- `telefono`: String con formato `999999999` (9 dígitos)
- `direccion`: Objeto completo (todos los campos son opcionales dentro del objeto)

#### Validaciones

- El **email debe ser único** en el sistema
- La **contraseña debe tener al menos 8 caracteres**
- El **teléfono debe tener exactamente 9 dígitos** (si se proporciona)
- El **nombre completo** se guarda concatenando nombre + apellidos

#### Response Exitoso (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
  "nombre": "Juan García Pérez",
  "email": "juan.garcia@example.com",
  "rol": "USER",
  "mensaje": "Usuario registrado exitosamente"
}
```

#### Response de Error (400 Bad Request)

```json
{
  "error": "El email ya está en uso"
}
```

## Comportamiento del Sistema

### 1. **Creación del Usuario**
- El usuario se crea con rol `USER` por defecto
- La contraseña se encripta automáticamente con BCrypt
- El nombre completo se guarda como `nombre + apellidos`

### 2. **Creación de la Dirección (Opcional)**
- La dirección solo se guarda si **al menos uno** de estos campos tiene valor:
  - `calle`
  - `ciudad`
  - `codigoPostal`
- Si no se envía el objeto `direccion` o está vacío, **no se crea ninguna dirección**
- Un usuario puede tener **múltiples direcciones** (relación OneToMany)

### 3. **Login Automático**
- Después del registro exitoso, el sistema genera:
  - **Access Token**: Para autenticar peticiones (duración corta ~5 horas)
  - **Refresh Token**: Para renovar el access token (duración larga ~7 días)
- El usuario queda **automáticamente logueado** tras el registro

## Ejemplos de Uso

### Registro Solo con Datos Básicos

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María",
    "email": "maria@example.com",
    "password": "Password123!"
  }'
```

### Registro con Dirección Completa

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos",
    "apellidos": "López Martínez",
    "email": "carlos.lopez@example.com",
    "telefono": "666123456",
    "password": "SecurePass2024!",
    "direccion": {
      "calle": "Avenida de Andalucía",
      "numero": "45",
      "piso": "1",
      "puerta": "B",
      "codigoPostal": "29002",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  }'
```

### Registro con Dirección Parcial

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana",
    "email": "ana@example.com",
    "password": "MyPassword456!",
    "direccion": {
      "ciudad": "Málaga",
      "codigoPostal": "29003"
    }
  }'
```

## Flujo Frontend

```javascript
// 1. Usuario completa el formulario de registro
const registrationData = {
  nombre: document.getElementById('nombre').value,
  apellidos: document.getElementById('apellidos').value,
  email: document.getElementById('email').value,
  telefono: document.getElementById('telefono').value,
  password: document.getElementById('password').value,
  direccion: {
    calle: document.getElementById('calle').value,
    numero: document.getElementById('numero').value,
    codigoPostal: document.getElementById('codigoPostal').value,
    ciudad: document.getElementById('ciudad').value,
    provincia: document.getElementById('provincia').value,
    pais: document.getElementById('pais').value
  }
};

// 2. Enviar al backend
fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(registrationData)
})
.then(response => response.json())
.then(data => {
  if (data.token) {
    // 3. Guardar tokens en localStorage
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    // 4. Redirigir al usuario a la página principal
    window.location.href = '/dashboard';
  } else {
    // Mostrar error
    alert(data.error);
  }
})
.catch(error => {
  console.error('Error:', error);
  alert('Error al registrar usuario');
});
```

## Base de Datos

### Tabla `usuario`
```sql
CREATE TABLE usuario (
    id_user SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    password VARCHAR(200) NOT NULL,
    rol VARCHAR(50) DEFAULT 'USER'
);
```

### Tabla `direccion`
```sql
CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_user),
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

## Notas Importantes

1. ✅ **Username eliminado**: Ya no se usa `username`, solo `email` para identificar usuarios
2. ✅ **Direcciones múltiples**: Un usuario puede tener varias direcciones en el futuro
3. ✅ **Seguridad**: Las contraseñas se encriptan con BCrypt antes de guardarse
4. ✅ **Transaccional**: Si falla algo (usuario o dirección), se revierte toda la operación
5. ✅ **Login automático**: El usuario recibe tokens JWT inmediatamente después del registro

## Códigos de Estado HTTP

- `201 Created`: Usuario registrado exitosamente
- `400 Bad Request`: Error en validación o email duplicado
- `500 Internal Server Error`: Error del servidor

