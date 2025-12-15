# Configuración OAuth2 con Google - Guía Completa

## ✅ Pasos Completados

### 1. Google Cloud Console
- ✅ Proyecto creado en Google Cloud Console
- ✅ Credenciales OAuth2 configuradas:
  - **Client ID**: `50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com`
  - **Client Secret**: `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`
  - **Redirect URI**: `http://localhost:8080/login/oauth2/code/google`

### 2. Configuración Backend (application.properties)
```properties
# OAuth2 - Google
spring.security.oauth2.client.registration.google.client-id=50906100394-sfimu6jl2opeqgavc15va8aq3pqob2pi.apps.googleusercontent.com
spring.security.oauth2.client.registration.google.client-secret=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
spring.security.oauth2.client.registration.google.scope=email,profile
spring.security.oauth2.client.registration.google.redirect-uri={baseUrl}/login/oauth2/code/{registrationId}

# Redirección al frontend después del login OAuth2
app.oauth2.redirect-uri=http://localhost:3000/oauth2/redirect
```

### 3. Componentes Implementados
- ✅ `OAuth2LoginSuccessHandler`: Maneja el éxito del login OAuth2
- ✅ `OAuth2UserService`: Procesa y registra usuarios de Google
- ✅ `SecurityConfig`: Configuración de seguridad con OAuth2
- ✅ Modelo `Usuario`: Campo `provider` añadido (LOCAL, GOOGLE, FACEBOOK)

## 🚀 Cómo Funciona el Flujo OAuth2

### Flujo Completo:

1. **Usuario hace clic en "Login con Google"** en el frontend
   ```
   http://localhost:8080/oauth2/authorization/google
   ```

2. **Spring Security redirige a Google** para autenticación

3. **Usuario autoriza la aplicación** en Google

4. **Google redirige de vuelta** al backend:
   ```
   http://localhost:8080/login/oauth2/code/google?code=XXXXX
   ```

5. **Backend intercambia el código** por los datos del usuario

6. **`OAuth2UserService` procesa el usuario**:
   - Si el email ya existe → retorna usuario existente
   - Si no existe → crea nuevo usuario con provider="GOOGLE"

7. **`OAuth2LoginSuccessHandler` genera JWT** y redirige al frontend:
   ```
   http://localhost:3000/oauth2/redirect?token=JWT_TOKEN&refreshToken=REFRESH_TOKEN
   ```

8. **Frontend guarda los tokens** y autentica al usuario

## 📋 URLs Importantes

### Backend Endpoints:
- **Iniciar login con Google**: `http://localhost:8080/oauth2/authorization/google`
- **Callback de Google**: `http://localhost:8080/login/oauth2/code/google` (automático)
- **Login tradicional**: `POST http://localhost:8080/api/auth/login`
- **Registro**: `POST http://localhost:8080/api/auth/register`

### Frontend:
- **Página de redirección OAuth2**: `http://localhost:3000/oauth2/redirect`

## 🔧 Configuración en Google Cloud Console

### URIs de Redireccionamiento Autorizadas:
Asegúrate de tener configuradas estas URLs en Google Cloud Console:

```
http://localhost:8080/login/oauth2/code/google
http://localhost:3000/oauth2/redirect
```

### Orígenes JavaScript Autorizados:
```
http://localhost:3000
http://localhost:8080
```

## 💻 Implementación en el Frontend (React)

### 1. Botón de Login con Google

```jsx
// LoginPage.jsx
function LoginPage() {
  const handleGoogleLogin = () => {
    // Redirige al endpoint de OAuth2 de Spring Boot
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div>
      <h1>Login</h1>
      
      {/* Login tradicional */}
      <form onSubmit={handleTraditionalLogin}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      {/* Separador */}
      <div>--- O ---</div>

      {/* Login con Google */}
      <button onClick={handleGoogleLogin}>
        🔐 Login con Google
      </button>
    </div>
  );
}
```

### 2. Página de Redirección OAuth2

```jsx
// OAuth2RedirectHandler.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extraer tokens de la URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      // Guardar tokens en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirigir al dashboard o home
      navigate('/dashboard');
    } else {
      // Error en la autenticación
      navigate('/login?error=oauth2');
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Procesando autenticación con Google...</p>
    </div>
  );
}

export default OAuth2RedirectHandler;
```

### 3. Configurar Rutas en React Router

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 🧪 Pruebas

### Probar el Login con Google:

1. **Inicia el backend**:
   ```bash
   mvn spring-boot:run
   ```

2. **Inicia el frontend** (en otra terminal):
   ```bash
   npm start
   ```

3. **Abre el navegador** y ve a:
   ```
   http://localhost:3000/login
   ```

4. **Haz clic en "Login con Google"**

5. **Verifica el flujo**:
   - Deberías ser redirigido a Google
   - Autoriza la aplicación
   - Serás redirigido de vuelta a tu frontend con los tokens
   - El usuario debería estar autenticado

### Probar manualmente desde el navegador:

```
http://localhost:8080/oauth2/authorization/google
```

Esto iniciará el flujo OAuth2 directamente.

## 🔍 Verificar Usuario en la Base de Datos

Después del login con Google, verifica que el usuario se haya creado:

```sql
SELECT id_user, nombre, email, provider, rol 
FROM usuario 
WHERE provider = 'GOOGLE';
```

## ⚠️ Importante: Seguridad

### Para Producción:

1. **Nunca commits las credenciales** en Git:
   ```properties
   # Usa variables de entorno
   spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
   spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
   ```

2. **Configura las URLs de producción** en Google Cloud Console:
   ```
   https://tu-dominio.com/login/oauth2/code/google
   https://tu-dominio.com
   ```

3. **Actualiza el redirect-uri** en production:
   ```properties
   app.oauth2.redirect-uri=https://tu-dominio.com/oauth2/redirect
   ```

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solución**: Verifica que la URL de redirección en Google Cloud Console coincida exactamente con:
```
http://localhost:8080/login/oauth2/code/google
```

### Error: "invalid_client"
**Solución**: Verifica que el Client ID y Client Secret sean correctos en `application.properties`.

### Usuario no se crea en la BD
**Solución**: Verifica los logs del backend y asegúrate de que:
- La tabla `usuario` tenga la columna `provider`
- Flyway haya ejecutado las migraciones correctamente

### Tokens no llegan al frontend
**Solución**: Verifica que `app.oauth2.redirect-uri` apunte a tu frontend:
```properties
app.oauth2.redirect-uri=http://localhost:3000/oauth2/redirect
```

## 📚 Próximos Pasos

1. ✅ OAuth2 con Google configurado
2. ⏳ Implementar OAuth2 con Facebook (similar a Google)
3. ⏳ Añadir botón de "Desconectar cuenta de Google"
4. ⏳ Manejar caso donde usuario LOCAL quiere vincular cuenta Google
5. ⏳ Añadir tests de integración para OAuth2

## 🎉 ¡Listo!

Tu aplicación ahora soporta login con Google. Los usuarios pueden:
- Registrarse/Login con email y contraseña (LOCAL)
- Login con su cuenta de Google (GOOGLE)
- Ambos métodos usan JWT para la autenticación posterior

---

**Fecha de configuración**: 2025-01-15
**Configurado por**: GitHub Copilot

