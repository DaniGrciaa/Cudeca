# Resumen de Cambios para Solucionar Error 401 y Usuario Undefined

## Problema Original

El error reportado era:
```
http://localhost:8080/api/usuarios/undefined/donar?cantidad=15 401 (Unauthorized)
```

### Causas Identificadas

1. **ID de usuario undefined**: El frontend no tenía forma de obtener el ID del usuario autenticado
2. **Error 401**: Posibles problemas con la autenticación JWT
3. **Falta de campo provider**: El sistema no exponía esta información al frontend

## Soluciones Implementadas

### 1. Campo `provider` Agregado a los DTOs

#### Archivos Modificados:
- `UsuarioRequest.java` - Agregado campo `provider`
- `UsuarioResponse.java` - Agregado campo `provider`
- `UsuarioMapper.java` - Actualizado para mapear el campo `provider` (por defecto "LOCAL")

**Beneficio**: El frontend ahora puede saber si un usuario se registró localmente o via OAuth2 (Google, Facebook, etc.)

### 2. Nuevo Endpoint `/api/usuarios/me`

#### Archivo Modificado:
- `UsuarioController.java`

#### Detalles del Endpoint:
```java
@GetMapping("/me")
public ResponseEntity<UsuarioResponse> obtenerUsuarioActual()
```

**Funcionalidad**:
- Extrae automáticamente el email del usuario desde el JWT token
- Busca y retorna la información completa del usuario autenticado
- Requiere autenticación (token JWT válido)

**Uso desde Frontend**:
```javascript
const usuario = await fetch('/api/usuarios/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const data = await usuario.json();
console.log(data.id); // Ya no será undefined
```

### 3. LoginResponseDTO Actualizado

#### Archivo Modificado:
- `LoginResponseDTO.java`

#### Nuevos Campos:
- `id` (Integer) - ID del usuario
- `provider` (String) - Proveedor de autenticación (LOCAL, GOOGLE, FACEBOOK)

**Antes**:
```json
{
  "token": "...",
  "refreshToken": "...",
  "nombre": "Juan",
  "email": "juan@example.com",
  "rol": "USER",
  "mensaje": "Login exitoso"
}
```

**Ahora**:
```json
{
  "token": "...",
  "refreshToken": "...",
  "id": 1,
  "nombre": "Juan",
  "email": "juan@example.com",
  "rol": "USER",
  "provider": "LOCAL",
  "mensaje": "Login exitoso"
}
```

### 4. AuthService Actualizado

#### Archivo Modificado:
- `AuthService.java`

**Métodos Actualizados**:
- `login()` - Ahora incluye `id` y `provider` en la respuesta
- `registrarConDireccion()` - Ahora incluye `id` y `provider` en la respuesta
- `refreshToken()` - Ahora incluye `id` y `provider` en la respuesta

### 5. OAuth2LoginSuccessHandler Mejorado

#### Archivo Modificado:
- `OAuth2LoginSuccessHandler.java`

**Mejora**: La redirección OAuth2 ahora incluye parámetros adicionales:
```
http://localhost:3000/oauth2/redirect?
  token=...&
  refreshToken=...&
  id=1&
  nombre=Juan&
  email=juan@example.com&
  rol=USER&
  provider=GOOGLE
```

### 6. SecurityConfig Actualizado

#### Archivo Modificado:
- `SecurityConfig.java`

**Cambio**: El endpoint `/api/usuarios/me` ahora requiere autenticación:
```java
.requestMatchers("/api/usuarios/me").authenticated()
```

## Cómo Usar los Cambios en el Frontend

### Opción 1: Usar el ID de la Respuesta de Login (Recomendado)

```javascript
// En el login
const response = await login(email, password);
const { token, refreshToken, id, nombre, email, rol, provider } = response;

// Guardar en localStorage
localStorage.setItem('token', token);
localStorage.setItem('refreshToken', refreshToken);
localStorage.setItem('userId', id); // ✅ Ahora disponible
localStorage.setItem('userName', nombre);
localStorage.setItem('userEmail', email);
localStorage.setItem('userRol', rol);
localStorage.setItem('userProvider', provider);

// Usar el ID para donaciones
const userId = localStorage.getItem('userId');
await incrementarDonacion(userId, 15);
```

### Opción 2: Usar el Endpoint `/api/usuarios/me`

```javascript
// Obtener usuario actual desde el backend
const obtenerUsuarioActual = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/usuarios/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) throw new Error('No autorizado');
  return await response.json();
};

// Uso
const usuario = await obtenerUsuarioActual();
await incrementarDonacion(usuario.id, 15);
```

### Opción 3: Usar un Context de React (Mejor Práctica)

```javascript
// UserContext.js
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/usuarios/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Uso en componentes
import { useContext } from 'react';
import { UserContext } from './UserContext';

function Donar() {
  const { user } = useContext(UserContext);
  
  const handleSubmit = async (cantidad) => {
    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }
    
    // ✅ user.id ya no será undefined
    await incrementarDonacion(user.id, cantidad);
  };
}
```

## Flujo Completo Actualizado

### Flujo de Registro/Login LOCAL:

1. Usuario se registra o inicia sesión
2. Backend responde con:
   ```json
   {
     "token": "jwt_token",
     "refreshToken": "refresh_token",
     "id": 1,
     "nombre": "Juan",
     "email": "juan@example.com",
     "rol": "USER",
     "provider": "LOCAL",
     "mensaje": "Login exitoso"
   }
   ```
3. Frontend guarda todo en localStorage/state
4. Usuario puede hacer donaciones usando `id`

### Flujo de Login con OAuth2 (Google):

1. Usuario hace clic en "Login con Google"
2. Redirigido a Google para autenticación
3. Google redirige de vuelta al backend
4. Backend procesa el usuario OAuth2 y redirige a:
   ```
   http://localhost:3000/oauth2/redirect?
     token=...&refreshToken=...&id=1&nombre=Juan&
     email=juan@gmail.com&rol=USER&provider=GOOGLE
   ```
5. Frontend extrae los parámetros de la URL y los guarda
6. Usuario puede hacer donaciones usando `id`

## Endpoints Actualizados

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/api/usuarios/me` | GET | ✅ Requerida | Obtener usuario actual desde JWT |
| `/api/usuarios/{id}/donar` | PATCH | ❌ Pública* | Incrementar donación |
| `/api/auth/login` | POST | ❌ Pública | Login tradicional (ahora con id y provider) |
| `/api/auth/register` | POST | ❌ Pública | Registro (ahora con id y provider) |
| `/api/auth/refresh` | POST | ❌ Pública | Refrescar token (ahora con id y provider) |

*Nota: El endpoint de donaciones es técnicamente público según la configuración actual, pero debería requerir autenticación en producción.

## Recomendaciones para el Frontend

1. **Guardar el ID del usuario** después del login/registro
2. **Usar el endpoint `/me`** si se pierde la información del usuario
3. **Implementar un Context/Redux** para gestión global del estado del usuario
4. **Manejar la expiración del token** y refrescarlo automáticamente
5. **Mostrar el provider** en el perfil del usuario para que sepa cómo inició sesión

## Testing

### Probar el Endpoint `/me`:

```bash
# 1. Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# 2. Copiar el token de la respuesta

# 3. Obtener usuario actual
curl http://localhost:8080/api/usuarios/me \
  -H "Authorization: Bearer {TOKEN_AQUI}"
```

### Verificar Login Response:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' | jq

# Debería incluir: token, refreshToken, id, nombre, email, rol, provider
```

## Migración V20 Creada (Opcional)

Se creó el archivo `V20__add_socio_rol_to_check.sql` que agrega el rol 'SOCIO' a la restricción CHECK. **No ejecutar** si el problema era solo del frontend.

Si necesitas el rol 'SOCIO', elimina y recrea la base de datos o ejecuta manualmente:

```sql
ALTER TABLE usuario DROP CONSTRAINT IF EXISTS chk_usuario_rol;
ALTER TABLE usuario ADD CONSTRAINT chk_usuario_rol
    CHECK (rol IN ('ADMIN', 'USER', 'ORGANIZADOR', 'PATROCINADOR', 'SOCIO'));
```

## Documentación Adicional

- Ver `ENDPOINT_USUARIO_ME_DOCUMENTATION.md` para detalles completos del nuevo endpoint

