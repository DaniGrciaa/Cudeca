# Sistema de Direcciones - Documentación

## Cambios Realizados

### 1. Eliminación del campo `username`

**Antes**: Los usuarios tenían un campo `username` separado del email.

**Ahora**: Los usuarios se identifican únicamente por su **email**. El campo `username` ha sido eliminado de:
- Modelo `Usuario`
- DTOs (`UsuarioRequest`, `UsuarioResponse`)
- `LoginResponseDTO` (ahora usa `nombre`)
- Repositorio `UserRepository`
- Servicios y controladores

### 2. Nueva tabla `Direccion`

Se ha creado una tabla separada para almacenar las direcciones de los usuarios de forma normalizada.

#### Estructura de la tabla `direccion`:

```sql
CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id_user) ON DELETE CASCADE,
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

#### Ventajas:
- ✅ **Normalización**: Datos estructurados en campos separados
- ✅ **Múltiples direcciones**: Un usuario puede tener varias direcciones
- ✅ **Validación**: Cada campo puede validarse individualmente
- ✅ **Búsquedas**: Se pueden hacer búsquedas por ciudad, provincia, etc.
- ✅ **Internacionalización**: Soporte para diferentes formatos de dirección

---

## Estructura de Datos

### Modelo `Direccion`

```java
public class Direccion {
    private Integer id;
    private Integer idUsuario;
    private String calle;
    private String numero;
    private String piso;
    private String puerta;
    private String codigoPostal;
    private String ciudad;
    private String provincia;
    private String pais;
}
```

### Modelo `Usuario` (actualizado)

```java
public class Usuario {
    private Integer id;
    private String nombre;          // Se mantiene
    private String email;           // Identificador principal
    private String telefono;
    private String password;
    private String rol;
    private List<Direccion> direcciones;  // Relación OneToMany
    // username eliminado ❌
    // direccion (String) eliminado ❌
}
```

---

## API Endpoints

### Crear Usuario con Direcciones

**Endpoint**: `POST /api/usuarios`

**Request**:
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "666777888",
  "password": "password123",
  "rol": "USER",
  "direcciones": [
    {
      "calle": "Calle Mayor",
      "numero": "123",
      "piso": "3",
      "puerta": "A",
      "codigoPostal": "29001",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    },
    {
      "calle": "Avenida Principal",
      "numero": "456",
      "piso": null,
      "puerta": null,
      "codigoPostal": "29002",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  ]
}
```

**Response**: `201 Created`
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "666777888",
  "rol": "USER",
  "direcciones": [
    {
      "id": 1,
      "calle": "Calle Mayor",
      "numero": "123",
      "piso": "3",
      "puerta": "A",
      "codigoPostal": "29001",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    },
    {
      "id": 2,
      "calle": "Avenida Principal",
      "numero": "456",
      "piso": null,
      "puerta": null,
      "codigoPostal": "29002",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  ]
}
```

### Obtener Usuario por ID

**Endpoint**: `GET /api/usuarios/{id}`

**Response**: `200 OK`
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "666777888",
  "rol": "USER",
  "direcciones": [
    {
      "id": 1,
      "calle": "Calle Mayor",
      "numero": "123",
      "piso": "3",
      "puerta": "A",
      "codigoPostal": "29001",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  ]
}
```

### Obtener Usuario por Email

**Endpoint**: `GET /api/usuarios/email/{email}`

**Ejemplo**: `GET /api/usuarios/email/juan@example.com`

**Response**: `200 OK` (mismo formato que GET por ID)

### Actualizar Usuario con Direcciones

**Endpoint**: `PUT /api/usuarios/{id}`

**Request**:
```json
{
  "nombre": "Juan Pérez García",
  "telefono": "666777999",
  "direcciones": [
    {
      "calle": "Nueva Calle",
      "numero": "789",
      "piso": "1",
      "puerta": "B",
      "codigoPostal": "29003",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  ]
}
```

**Nota**: Al actualizar las direcciones, se eliminan las anteriores y se crean las nuevas.

### Listar Todos los Usuarios

**Endpoint**: `GET /api/usuarios`

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "666777888",
    "rol": "USER",
    "direcciones": [...]
  },
  {
    "id": 2,
    "nombre": "María García",
    "email": "maria@example.com",
    "telefono": "666888999",
    "rol": "ADMIN",
    "direcciones": [...]
  }
]
```

### Eliminar Usuario

**Endpoint**: `DELETE /api/usuarios/{id}`

**Response**: `204 No Content`

**Nota**: Al eliminar un usuario, sus direcciones también se eliminan automáticamente (CASCADE).

---

## Ejemplos de Uso

### Ejemplo 1: Crear usuario sin direcciones

```json
{
  "nombre": "Ana López",
  "email": "ana@example.com",
  "password": "ana123",
  "direcciones": []
}
```

### Ejemplo 2: Crear usuario con una dirección simple

```json
{
  "nombre": "Pedro Martínez",
  "email": "pedro@example.com",
  "password": "pedro123",
  "direcciones": [
    {
      "calle": "Calle Sol",
      "numero": "10",
      "codigoPostal": "29004",
      "ciudad": "Málaga",
      "pais": "España"
    }
  ]
}
```

### Ejemplo 3: Dirección completa con todos los campos

```json
{
  "calle": "Avenida de Andalucía",
  "numero": "25",
  "piso": "5",
  "puerta": "C",
  "codigoPostal": "29007",
  "ciudad": "Málaga",
  "provincia": "Málaga",
  "pais": "España"
}
```

---

## Login y Autenticación (Cambios)

### Login

**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "USER",
  "mensaje": "Login exitoso"
}
```

**Cambio importante**: ❌ Ya no se devuelve `username`, ahora se devuelve `nombre`.

---

## Migración de Datos

### Migración Flyway V16

La migración `V16__create_direccion_and_remove_username.sql` realiza:

1. ✅ Crea la tabla `direccion`
2. ✅ Elimina la columna `direccion` (String antiguo) de `usuario`
3. ✅ Elimina la columna `username` de `usuario`
4. ✅ Crea índice en `id_usuario` para mejorar rendimiento
5. ✅ Establece relación con CASCADE DELETE

### ¿Qué pasa con los datos existentes?

- **Username**: Se elimina. Los usuarios ahora se identifican solo por email.
- **Direccion (String antigua)**: Se elimina. Los usuarios tendrán que añadir sus direcciones de nuevo usando el nuevo formato estructurado.

---

## Validaciones

### UsuarioRequest

| Campo | Validación | Mensaje |
|-------|-----------|---------|
| nombre | @NotBlank, @Size(max=100) | "El nombre no puede estar vacío" |
| email | @NotBlank, @Email, @Size(max=150) | "El email es obligatorio" |
| password | @NotBlank, @Size(min=4, max=200) | "La contraseña es obligatoria" |
| telefono | @Size(max=20) | "El teléfono no puede exceder 20 caracteres" |
| rol | @Size(max=50) | "El rol no puede exceder 50 caracteres" |

### DireccionRequest

| Campo | Validación |
|-------|-----------|
| calle | @Size(max=200) |
| numero | @Size(max=50) |
| piso | @Size(max=10) |
| puerta | @Size(max=10) |
| codigoPostal | @Size(max=10) |
| ciudad | @Size(max=100) |
| provincia | @Size(max=100) |
| pais | @Size(max=100) |

**Nota**: Todos los campos de dirección son opcionales.

---

## Casos de Uso

### Caso 1: Aplicación de eventos (Cudeca)

Un usuario se registra para participar en eventos:

```json
{
  "nombre": "María González",
  "email": "maria@example.com",
  "telefono": "666123456",
  "password": "maria123",
  "direcciones": [
    {
      "calle": "Calle Principal",
      "numero": "50",
      "codigoPostal": "29005",
      "ciudad": "Málaga",
      "pais": "España"
    }
  ]
}
```

### Caso 2: Usuario con dirección de envío y facturación

```json
{
  "nombre": "Carlos Ruiz",
  "email": "carlos@example.com",
  "password": "carlos123",
  "direcciones": [
    {
      "calle": "Calle Trabajo",
      "numero": "100",
      "ciudad": "Málaga",
      "pais": "España"
    },
    {
      "calle": "Calle Casa",
      "numero": "200",
      "ciudad": "Marbella",
      "pais": "España"
    }
  ]
}
```

---

## Endpoints Eliminados

Los siguientes endpoints ya **NO están disponibles**:

- ❌ `GET /api/usuarios/username/{username}` - Eliminado (usar email)

---

## Testing

### Prueba con cURL

```bash
# Crear usuario con dirección
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@test.com",
    "password": "test123",
    "direcciones": [
      {
        "calle": "Test Street",
        "numero": "123",
        "ciudad": "Málaga",
        "pais": "España"
      }
    ]
  }'

# Obtener usuario por email
curl http://localhost:8080/api/usuarios/email/test@test.com

# Actualizar dirección
curl -X PUT http://localhost:8080/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "direcciones": [
      {
        "calle": "Nueva Calle",
        "numero": "456",
        "ciudad": "Málaga",
        "pais": "España"
      }
    ]
  }'
```

---

## Resumen de Cambios

| Antes | Después |
|-------|---------|
| `username` (String) | ❌ Eliminado |
| `direccion` (String) | ✅ Tabla `direccion` con campos separados |
| Un usuario = una dirección | ✅ Un usuario = múltiples direcciones |
| Identificación por username o email | ✅ Identificación solo por email |
| Dirección como texto libre | ✅ Dirección estructurada y validable |

---

## Próximos Pasos Sugeridos

1. **Frontend**: Actualizar formularios para capturar direcciones estructuradas
2. **Validación**: Agregar validación de códigos postales por país
3. **Geocoding**: Integrar API de Google Maps para validar direcciones
4. **Dirección principal**: Agregar campo `es_principal` para marcar dirección por defecto
5. **Histórico**: Mantener historial de direcciones anteriores

---

## Soporte

Para más información:
- Ver migración: `V16__create_direccion_and_remove_username.sql`
- Modelo: `Direccion.java`, `Usuario.java`
- DTOs: `DireccionRequest.java`, `DireccionResponse.java`
- Mapper: `DireccionMapper.java`

