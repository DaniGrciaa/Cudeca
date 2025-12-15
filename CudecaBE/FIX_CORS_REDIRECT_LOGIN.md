# FIX: Error CORS - "Response to preflight request doesn't pass access control check"

## 🐛 Problema

```
Access to fetch at 'http://localhost:8080/login' (redirected from 'http://localhost:8080/api/usuarios/undefined') 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🔍 Causa del Problema

El error ocurría porque:

1. **Spring Security redirigía a `/login`**: Cuando había un problema de autenticación, Spring Security (por defecto) redirigía a `/login` en lugar de devolver un error JSON.

2. **La redirección no tenía headers CORS**: La redirección a `/login` no incluía los headers CORS necesarios (`Access-Control-Allow-Origin`), causando que el navegador bloqueara la respuesta.

3. **APIs REST deben devolver JSON, no redireccionar**: Para APIs REST que consumen frontends como React, las respuestas deben ser JSON, no redirecciones HTML.

## ✅ Solución Aplicada

### 1. Añadido Manejo de Excepciones en SecurityConfig

Se configuró Spring Security para que devuelva respuestas JSON en lugar de redireccionar:

```java
.exceptionHandling(exceptions -> exceptions
    // Devolver 401 en JSON en lugar de redirigir
    .authenticationEntryPoint((request, response, authException) -> {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"error\":\"No autorizado\",\"message\":\"" 
            + authException.getMessage() + "\"}");
    })
    // Devolver 403 en JSON
    .accessDeniedHandler((request, response, accessDeniedException) -> {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("{\"error\":\"Acceso denegado\",\"message\":\"" 
            + accessDeniedException.getMessage() + "\"}");
    })
)
```

### 2. Comportamiento Anterior vs Nuevo

#### ❌ Antes (Problema):
```
Frontend solicita: GET /api/usuarios/123
Backend detecta error → Redirige a: /login
Navegador bloquea por CORS
```

#### ✅ Ahora (Solucionado):
```
Frontend solicita: GET /api/usuarios/123
Backend detecta error → Devuelve: 401 {"error":"No autorizado",...}
Frontend recibe la respuesta JSON y puede manejarla
```

## 📋 Archivos Modificados

### `SecurityConfig.java`
- ✅ Añadido `authenticationEntryPoint` personalizado (para 401)
- ✅ Añadido `accessDeniedHandler` personalizado (para 403)
- ✅ Añadido import `jakarta.servlet.http.HttpServletResponse`

## 🧪 Cómo Probar el Fix

### 1. Reinicia el backend
```powershell
.\mvnw.cmd spring-boot:run
```

### 2. Prueba desde el frontend
El error de CORS debería desaparecer. Ahora verás uno de estos comportamientos:

#### Si el endpoint es público (`/api/usuarios/**`):
```javascript
// Debería funcionar sin token
fetch('http://localhost:8080/api/usuarios/123')
  .then(res => res.json())
  .then(data => console.log(data))
```

#### Si el endpoint requiere autenticación:
```javascript
// Sin token: Recibe 401 JSON (no redirección)
fetch('http://localhost:8080/api/usuarios/123')
  .then(res => {
    if (res.status === 401) {
      console.log('No autorizado');
    }
    return res.json();
  })
```

#### Con token válido:
```javascript
// Con token: Funciona correctamente
fetch('http://localhost:8080/api/usuarios/123', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
```

## 🔧 Otros Problemas Potenciales

### Problema: `/api/usuarios/undefined`

El error menciona `/api/usuarios/undefined`, lo que indica que estás intentando acceder a un usuario con ID `undefined`. Esto es un problema del frontend:

#### Causa:
```javascript
// El userId es undefined
const userId = undefined;
fetch(`http://localhost:8080/api/usuarios/${userId}`); // ❌
```

#### Solución en Frontend:
```javascript
// Verificar que el userId existe antes de hacer la petición
const userId = localStorage.getItem('userId') || getUserIdFromToken();

if (!userId) {
  console.error('No hay usuario autenticado');
  return;
}

fetch(`http://localhost:8080/api/usuarios/${userId}`); // ✅
```

### Problema: Token no se está enviando

Si tienes un token pero no se envía en las peticiones:

#### Verificar en Frontend:
```javascript
// Asegúrate de incluir el Authorization header
const token = localStorage.getItem('token');

fetch('http://localhost:8080/api/usuarios/123', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

## 📝 Notas Adicionales

### Endpoints Públicos vs Protegidos

Según tu configuración actual en `SecurityConfig`:

#### ✅ Endpoints PÚBLICOS (no requieren token):
- `/api/auth/**` - Login, registro, refresh
- `/api/test/**` - Endpoints de prueba
- `/oauth2/**`, `/login/oauth2/**` - OAuth2
- `/api/eventos/**` - Eventos
- `/api/patrocinadores/**` - Patrocinadores
- **`/api/usuarios/**`** - Usuarios (público)
- `/api/compras/**` - Compras (público)

#### 🔒 Endpoints PROTEGIDOS (requieren token):
- Cualquier otro endpoint no listado arriba

### ⚠️ IMPORTANTE: Seguridad

Actualmente tienes `/api/usuarios/**` como público. Esto significa que **cualquiera puede acceder a la información de todos los usuarios sin autenticación**.

#### Recomendación:
Si quieres proteger los datos de usuario, deberías:

1. **Hacer el endpoint protegido**:
```java
.requestMatchers("/api/usuarios/**").authenticated() // Requiere token
```

2. **Verificar en el controller que el usuario solo acceda a sus propios datos**:
```java
@GetMapping("/{id}")
public ResponseEntity<?> getUsuario(@PathVariable Integer id, Authentication auth) {
    String emailAutenticado = auth.getName();
    Usuario usuario = usuarioService.findById(id);
    
    // Verificar que el usuario solo acceda a sus propios datos
    if (!usuario.getEmail().equals(emailAutenticado)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(new ErrorResponse("No puedes acceder a datos de otro usuario"));
    }
    
    return ResponseEntity.ok(usuario);
}
```

## ✅ Checklist de Verificación

- [x] Backend devuelve JSON en lugar de redireccionar
- [x] CORS configurado correctamente
- [ ] Frontend maneja el token correctamente
- [ ] Frontend envía Authorization header
- [ ] Frontend verifica que el userId no sea undefined
- [ ] Considerar proteger endpoints sensibles

---

## 🎉 Resultado Esperado

Después de aplicar este fix:

✅ No más errores de CORS por redirección a `/login`
✅ El backend devuelve respuestas JSON claras
✅ El frontend puede manejar errores 401/403 adecuadamente
✅ Las peticiones fluyen correctamente entre frontend y backend

---

**Fix aplicado el**: 2025-12-15  
**Archivos modificados**: `SecurityConfig.java`  
**Problema resuelto**: Error CORS por redirección a `/login`

