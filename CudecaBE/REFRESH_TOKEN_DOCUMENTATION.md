# Sistema de Refresh Token - Documentación

## ¿Qué es un Refresh Token?

Un **Refresh Token** es un token de larga duración que permite obtener nuevos Access Tokens sin necesidad de que el usuario vuelva a introducir sus credenciales.

## Configuración

### Tiempos de expiración configurados:

- **Access Token**: 10 horas (36000000 ms)
- **Refresh Token**: 7 días (604800000 ms)

Puedes modificar estos valores en `application.properties`:

```properties
jwt.expiration=36000000
jwt.refresh.expiration=604800000
```

## Flujo de Autenticación

### 1. Login inicial

**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "usuario123",
  "email": "usuario@example.com",
  "rol": "USER",
  "mensaje": "Login exitoso"
}
```

### 2. Usar el Access Token

Incluye el token en el header `Authorization` de tus peticiones:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Cuando el Access Token expira

Si recibes un error **401 Unauthorized**, usa el refresh token para obtener nuevos tokens.

**Endpoint**: `POST /api/auth/refresh`

**Request**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "usuario123",
  "email": "usuario@example.com",
  "rol": "USER",
  "mensaje": "Token refrescado exitosamente"
}
```

## Implementación en Frontend

### Ejemplo con JavaScript/Fetch

```javascript
// Guardar tokens después del login
function saveTokens(loginResponse) {
  localStorage.setItem('accessToken', loginResponse.token);
  localStorage.setItem('refreshToken', loginResponse.refreshToken);
  localStorage.setItem('userData', JSON.stringify({
    nombre: loginResponse.nombre,
    email: loginResponse.email,
    rol: loginResponse.rol
  }));
}

// Función para hacer peticiones con manejo automático de refresh
async function fetchWithAuth(url, options = {}) {
  // Agregar token al header
  const accessToken = localStorage.getItem('accessToken');
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`
  };

  let response = await fetch(url, options);

  // Si el token expiró (401), intentar refrescar
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    
    // Intentar refrescar el token
    const refreshResponse = await fetch('http://localhost:8080/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    if (refreshResponse.ok) {
      const newTokens = await refreshResponse.json();
      saveTokens(newTokens);
      
      // Reintentar la petición original con el nuevo token
      options.headers['Authorization'] = `Bearer ${newTokens.token}`;
      response = await fetch(url, options);
    } else {
      // Si el refresh también falla, redirigir al login
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Sesión expirada');
    }
  }

  return response;
}

// Ejemplo de uso
async function getEventos() {
  try {
    const response = await fetchWithAuth('http://localhost:8080/api/eventos');
    const eventos = await response.json();
    console.log(eventos);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Ejemplo con Axios

```javascript
import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Interceptor para agregar el token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar errores 401 y refrescar el token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Si es 401 y no hemos intentado refrescar aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8080/api/auth/refresh', {
          refreshToken
        });

        const { token, refreshToken: newRefreshToken } = response.data;
        
        // Guardar nuevos tokens
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Actualizar el header y reintentar
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, limpiar storage y redirigir
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

## Ejemplo con React

```jsx
import { useState, useEffect } from 'react';
import api from './api'; // Tu instancia de axios con interceptores

function App() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // La petición automáticamente usará el interceptor
    api.get('/eventos')
      .then(response => setEventos(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {/* Tu componente */}
    </div>
  );
}
```

## Pruebas con cURL

### 1. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### 2. Usar el access token
```bash
curl http://localhost:8080/api/usuarios \
  -H "Authorization: Bearer TU_ACCESS_TOKEN"
```

### 3. Refrescar el token
```bash
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"TU_REFRESH_TOKEN"}'
```

## Pruebas con Postman

### 1. Login
- Método: `POST`
- URL: `http://localhost:8080/api/auth/login`
- Body (JSON):
```json
{
  "email": "test@test.com",
  "password": "test123"
}
```

### 2. Guardar tokens en variables
Después del login, en la pestaña "Tests" de Postman:
```javascript
const response = pm.response.json();
pm.environment.set("accessToken", response.token);
pm.environment.set("refreshToken", response.refreshToken);
```

### 3. Usar el token en otras peticiones
En el header de tus peticiones:
```
Authorization: Bearer {{accessToken}}
```

### 4. Refresh token
- Método: `POST`
- URL: `http://localhost:8080/api/auth/refresh`
- Body (JSON):
```json
{
  "refreshToken": "{{refreshToken}}"
}
```

## Seguridad

### Buenas prácticas:

1. **Nunca guardes tokens en cookies sin httpOnly**: Usa `localStorage` o `sessionStorage`
2. **HTTPS en producción**: Los tokens deben enviarse solo por conexiones seguras
3. **Logout**: Implementa un endpoint de logout que invalide los tokens
4. **Rotación de refresh tokens**: Cada vez que se usa un refresh token, se genera uno nuevo
5. **Tiempo de expiración**: Ajusta los tiempos según tus necesidades de seguridad

### Mejoras futuras sugeridas:

- [ ] Guardar refresh tokens en base de datos para poder revocarlos
- [ ] Implementar logout que invalide los refresh tokens
- [ ] Agregar blacklist de tokens revocados
- [ ] Implementar límite de refresh tokens activos por usuario
- [ ] Agregar información de dispositivo/IP en los tokens

## Manejo de errores

### Errores comunes:

| Error | Causa | Solución |
|-------|-------|----------|
| 401 Unauthorized | Access token expirado | Usar refresh token |
| 401 en /refresh | Refresh token expirado | Hacer login nuevamente |
| Token inválido | Token malformado o manipulado | Hacer login nuevamente |

## Logs

Los logs te ayudarán a debuggear:

```
2025-12-15T09:24:08 WARN - Token JWT expirado. Se requiere refrescar el token.
```

Esto es normal y significa que el sistema está funcionando correctamente.

