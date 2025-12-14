# Ejemplos de peticiones HTTP para el sistema de autenticación

## 1. Login con usuario admin

### Request
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
    "email": "admin@cudeca.org",
    "password": "admin123"
}
```

### Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzOTU4MjQwMCwiZXhwIjoxNjM5NjE4NDAwfQ...",
    "username": "admin",
    "email": "admin@cudeca.org",
    "rol": "ADMIN",
    "mensaje": "Login exitoso"
}
```

### Response (401 Unauthorized)
```json
{
    "error": "Credenciales incorrectas"
}
```

---

## 2. Login con usuario normal

### Request
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
    "email": "usuario@cudeca.org",
    "password": "user123"
}
```

---

## 3. Validar token

### Request
```http
GET http://localhost:8080/api/auth/validate
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzOTU4MjQwMCwiZXhwIjoxNjM5NjE4NDAwfQ...
```

### Response (200 OK)
```json
{
    "mensaje": "Token válido"
}
```

---

## 4. Acceder a un endpoint protegido (ejemplo: listar usuarios)

### Request
```http
GET http://localhost:8080/api/usuarios
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzOTU4MjQwMCwiZXhwIjoxNjM5NjE4NDAwfQ...
```

### Response (200 OK)
```json
[
    {
        "id": 1,
        "username": "admin",
        "nombre": "Administrador",
        "email": "admin@cudeca.org",
        "rol": "ADMIN"
    }
]
```

### Response sin token (401 Unauthorized)
```json
{
    "timestamp": "2024-01-20T10:30:00.000+00:00",
    "status": 401,
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "path": "/api/usuarios"
}
```

---

## 5. Acceder a un endpoint público (no requiere token)

### Request
```http
GET http://localhost:8080/api/eventos
```

### Response (200 OK)
```json
[
    {
        "id": 1,
        "nombre": "Concierto Benéfico",
        "fecha": "2024-06-15",
        "tipo": "CONCIERTO",
        "precio": 25.00
    }
]
```

---

## Colección Postman

Para importar en Postman, guarda este archivo como `Cudeca_Auth.postman_collection.json`:

```json
{
    "info": {
        "name": "Cudeca Auth API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Login",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"admin@cudeca.org\",\n    \"password\": \"admin123\"\n}"
                },
                "url": {
                    "raw": "http://localhost:8080/api/auth/login",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8080",
                    "path": ["api", "auth", "login"]
                }
            }
        },
        {
            "name": "Validate Token",
            "request": {
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}"
                    }
                ],
                "url": {
                    "raw": "http://localhost:8080/api/auth/validate",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8080",
                    "path": ["api", "auth", "validate"]
                }
            }
        },
        {
            "name": "Get Usuarios (Protected)",
            "request": {
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}"
                    }
                ],
                "url": {
                    "raw": "http://localhost:8080/api/usuarios",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8080",
                    "path": ["api", "usuarios"]
                }
            }
        },
        {
            "name": "Get Eventos (Public)",
            "request": {
                "method": "GET",
                "url": {
                    "raw": "http://localhost:8080/api/eventos",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8080",
                    "path": ["api", "eventos"]
                }
            }
        }
    ]
}
```

---

## Notas

1. **Guardar el token**: Después del login exitoso, guarda el token JWT de la respuesta
2. **Incluir en headers**: Para endpoints protegidos, incluye el header: `Authorization: Bearer <tu-token>`
3. **Token expira**: Los tokens expiran después de 10 horas (configurable en `application.properties`)
4. **Formato del header**: El formato debe ser exactamente `Bearer <token>` (con espacio entre Bearer y el token)

---

## Endpoints Públicos (no requieren token)

- `POST /api/auth/login`
- `GET /api/eventos/**`
- `GET /api/patrocinadores/**`
- `GET /swagger-ui/**`
- `GET /v3/api-docs/**`

## Endpoints Protegidos (requieren token)

- Todos los demás endpoints de la API
- `GET /api/auth/validate` (para validar el token)

