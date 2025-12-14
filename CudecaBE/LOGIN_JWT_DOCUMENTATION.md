# Sistema de Login con JWT - Documentación

## Resumen de Implementación

Se ha implementado un sistema completo de autenticación con JWT (JSON Web Tokens) para la aplicación CudecaBE.

## Componentes Implementados

### 1. Dependencias (pom.xml)
- **jjwt-api** (v0.12.5): API principal de JWT
- **jjwt-impl** (v0.12.5): Implementación de JWT
- **jjwt-jackson** (v0.12.5): Serialización JSON para JWT
- **spring-boot-starter-security**: Framework de seguridad de Spring

### 2. Configuración (application.properties)
```properties
jwt.secret=CudecaSecretKeyForJWTTokenGenerationAndValidation2024MustBeAtLeast256BitsLongForHS256Algorithm
jwt.expiration=36000000  # 10 horas en milisegundos
```

### 3. Componentes de Seguridad

#### SecurityConfig.java
- Configura **BCryptPasswordEncoder** para encriptar contraseñas
- Configura **AuthenticationManager** para manejar la autenticación
- Configura **SecurityFilterChain** con:
  - CSRF deshabilitado (para APIs REST)
  - Sesiones STATELESS (sin sesiones en servidor)
  - Endpoints públicos:
    - `/api/auth/**` (login y registro)
    - `/swagger-ui/**` (documentación)
    - `/api/eventos/**` (eventos públicos)
    - `/api/patrocinadores/**` (patrocinadores públicos)
  - Todos los demás endpoints requieren autenticación

#### JwtUtil.java
Clase utilitaria para manejar tokens JWT:
- `generateToken(UserDetails)`: Genera un token JWT
- `extractUsername(String)`: Extrae el username del token
- `validateToken(String, UserDetails)`: Valida el token
- `extractExpiration(String)`: Extrae la fecha de expiración

#### JwtAuthenticationFilter.java
Filtro que intercepta todas las peticiones HTTP:
- Extrae el token del header `Authorization`
- Valida el token
- Establece la autenticación en el SecurityContext
- Se ejecuta antes de `UsernamePasswordAuthenticationFilter`

#### CustomUserDetailsService.java
Implementación de `UserDetailsService`:
- Carga usuarios desde la base de datos
- Login únicamente por **email**
- Convierte el rol del usuario en `GrantedAuthority`

### 4. DTOs

#### LoginRequestDTO.java
```java
{
    "email": "string",     // email del usuario
    "password": "string"   // contraseña
}
```

#### LoginResponseDTO.java
```java
{
    "token": "string",      // JWT token
    "username": "string",
    "email": "string",
    "rol": "string",
    "mensaje": "string"
}
```

### 5. Servicios

#### AuthService.java
Servicio de autenticación:
- **login(LoginRequestDTO)**: Autentica al usuario y genera el token
- **registrar(Usuario)**: Registra un nuevo usuario (encripta la contraseña)

### 6. Controladores

#### AuthController.java
Endpoints REST para autenticación:
- **POST /api/auth/login**: Endpoint de login
  - Request: `LoginRequestDTO`
  - Response: `LoginResponseDTO` con el token JWT
  - Status 200: Login exitoso
  - Status 401: Credenciales incorrectas
  
- **GET /api/auth/validate**: Valida si el token es válido
  - Requiere header: `Authorization: Bearer <token>`
  - Response: `{"mensaje": "Token valido"}`

## Flujo de Autenticación

### Login
1. Cliente envía credenciales a `POST /api/auth/login`
2. AuthService verifica las credenciales con AuthenticationManager
3. Si son correctas, se carga el usuario desde la base de datos
4. JwtUtil genera un token JWT
5. Se devuelve el token y la información del usuario

### Peticiones Autenticadas
1. Cliente incluye el token en el header: `Authorization: Bearer <token>`
2. JwtAuthenticationFilter intercepta la petición
3. Extrae y valida el token
4. Si es válido, carga el usuario y lo establece en el SecurityContext
5. La petición continúa con el usuario autenticado

## Uso con Postman/Insomnia

### 1. Login
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
    "email": "admin@cudeca.org",
    "password": "admin123"
}
```

### 2. Usar el token en peticiones protegidas
```http
GET http://localhost:8080/api/usuarios
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Seguridad

### Contraseñas
- Se encriptan con **BCryptPasswordEncoder**
- Nunca se almacenan en texto plano
- El hash es de una sola vía (no se puede desencriptar)

### Tokens JWT
- Firmados con HMAC SHA-256
- Expiran después de 10 horas
- Contienen el username del usuario
- No se almacenan en el servidor (stateless)

### Recomendaciones para Producción
1. **Cambiar la clave secreta** `jwt.secret`:
   - Usar una clave más larga y compleja
   - Almacenarla en variables de entorno
   - No subirla al control de versiones

2. **Reducir el tiempo de expiración** según necesidades

3. **Implementar refresh tokens** para renovar tokens expirados

4. **Añadir rate limiting** para prevenir ataques de fuerza bruta

5. **Usar HTTPS** en producción

## Testing

Para probar el sistema:

1. Asegúrate de tener usuarios en la base de datos con contraseñas encriptadas
2. Usa el endpoint de login para obtener un token
3. Incluye el token en las peticiones protegidas

## Próximos Pasos

- [ ] Implementar endpoint de registro público
- [ ] Añadir refresh tokens
- [ ] Implementar recuperación de contraseña
- [ ] Añadir roles y permisos granulares
- [ ] Implementar logout (blacklist de tokens)
- [ ] Añadir logs de auditoría de accesos

