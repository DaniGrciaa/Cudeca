# Configuración de OAuth2 con Google y Facebook

## ✅ Implementación Completada

Se ha implementado OAuth2 con Google y Facebook en tu aplicación. Los cambios incluyen:

### Archivos Creados:
1. **OAuth2UserService.java** - Servicio que procesa usuarios OAuth2
2. **OAuth2LoginSuccessHandler.java** - Handler que maneja el éxito del login OAuth2
3. **V19__add_provider_to_usuario.sql** - Migración de base de datos

### Archivos Modificados:
1. **pom.xml** - Agregada dependencia `spring-boot-starter-oauth2-client`
2. **Usuario.java** - Agregado campo `provider` (LOCAL, GOOGLE, FACEBOOK)
3. **SecurityConfig.java** - Configurado OAuth2 login
4. **application.properties** - Agregada configuración OAuth2

---

## 🔧 Pasos para Configurar

### 1. Obtener Credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Credentials**
4. Click en **Create Credentials** > **OAuth 2.0 Client ID**
5. Configura la pantalla de consentimiento si es necesario
6. Selecciona **Web application** como tipo de aplicación
7. Agrega las URIs de redirección autorizadas:
   - `http://localhost:8080/login/oauth2/code/google`
   - `https://tu-dominio.com/login/oauth2/code/google` (para producción)
8. Copia el **Client ID** y **Client Secret**

### 2. Obtener Credenciales de Facebook

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Click en **My Apps** > **Create App**
3. Selecciona **Consumer** como tipo de app
4. Completa los detalles de la aplicación
5. En el dashboard, ve a **Settings** > **Basic**
6. Copia el **App ID** y **App Secret**
7. Ve a **Facebook Login** > **Settings**
8. Agrega las URIs de redirección OAuth válidas:
   - `http://localhost:8080/login/oauth2/code/facebook`
   - `https://tu-dominio.com/login/oauth2/code/facebook` (para producción)

### 3. Configurar Variables de Entorno

**Opción A: Variables de entorno del sistema**

En Windows (PowerShell):
```powershell
$env:GOOGLE_CLIENT_ID="tu-google-client-id"
$env:GOOGLE_CLIENT_SECRET="tu-google-client-secret"
$env:FACEBOOK_CLIENT_ID="tu-facebook-app-id"
$env:FACEBOOK_CLIENT_SECRET="tu-facebook-app-secret"
```

**Opción B: Archivo application.properties** (Solo para desarrollo local)

Edita `src/main/resources/application.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=TU_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=TU_GOOGLE_CLIENT_SECRET
spring.security.oauth2.client.registration.facebook.client-id=TU_FACEBOOK_APP_ID
spring.security.oauth2.client.registration.facebook.client-secret=TU_FACEBOOK_APP_SECRET
```

⚠️ **IMPORTANTE**: Nunca subas tus credenciales a Git. Usa variables de entorno en producción.

### 4. Ejecutar Migraciones de Base de Datos

Al iniciar la aplicación, Flyway ejecutará automáticamente la migración V19 que agrega la columna `provider` a la tabla `usuario`.

---

## 🚀 Uso de OAuth2

### Endpoints OAuth2 Disponibles:

**Iniciar sesión con Google:**
```
GET http://localhost:8080/oauth2/authorization/google
```

**Iniciar sesión con Facebook:**
```
GET http://localhost:8080/oauth2/authorization/facebook
```

### Flujo de Autenticación:

1. El usuario hace click en "Iniciar sesión con Google/Facebook" en tu frontend
2. El frontend redirige a: `http://localhost:8080/oauth2/authorization/{provider}`
3. El usuario se autentica en Google/Facebook
4. OAuth2 redirige de vuelta a tu backend
5. El backend crea/actualiza el usuario en la base de datos
6. El backend genera tokens JWT
7. El backend redirige al frontend con los tokens: 
   ```
   http://localhost:3000/oauth2/redirect?token=JWT_TOKEN&refreshToken=REFRESH_TOKEN
   ```

### Integración en el Frontend (React ejemplo):

```jsx
// Componente de Login
const LoginButtons = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>
        Iniciar sesión con Google
      </button>
      <button onClick={handleFacebookLogin}>
        Iniciar sesión con Facebook
      </button>
    </div>
  );
};

// Página de redirección OAuth2
// Ruta: /oauth2/redirect
const OAuth2Redirect = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    
    if (token && refreshToken) {
      // Guardar tokens en localStorage o context
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Redirigir a la página principal
      window.location.href = '/dashboard';
    }
  }, []);

  return <div>Procesando autenticación...</div>;
};
```

---

## 🔍 Verificar la Implementación

### 1. Compilar el proyecto:
```bash
mvn clean install
```

### 2. Iniciar la aplicación:
```bash
mvn spring-boot:run
```

### 3. Probar OAuth2:

Abre en tu navegador:
- Google: `http://localhost:8080/oauth2/authorization/google`
- Facebook: `http://localhost:8080/oauth2/authorization/facebook`

### 4. Verificar la base de datos:

Después del login, verifica que el usuario se creó con el provider correcto:
```sql
SELECT id_user, nombre, email, provider FROM usuario;
```

---

## 📝 Estructura de la Base de Datos

Campo `provider` en tabla `usuario`:
- `LOCAL` - Usuario registrado con email/password tradicional
- `GOOGLE` - Usuario registrado con Google OAuth2
- `FACEBOOK` - Usuario registrado con Facebook OAuth2

Los usuarios OAuth2 tienen una contraseña aleatoria encriptada (no la usarán).

---

## 🛡️ Seguridad

- Los tokens JWT se generan después del login OAuth2
- Los usuarios OAuth2 no necesitan contraseña (se genera una aleatoria)
- Si un usuario ya existe con el mismo email, se actualiza el provider
- Los tokens tienen la misma duración configurada en `application.properties`

---

## 🐛 Troubleshooting

**Error: redirect_uri_mismatch**
- Verifica que las URIs en Google/Facebook coincidan exactamente con tu configuración
- Formato correcto: `http://localhost:8080/login/oauth2/code/{provider}`

**Usuario no se crea en la base de datos**
- Verifica que Flyway ejecutó la migración V19
- Revisa los logs de la aplicación

**Tokens no se generan**
- Verifica que JwtUtil esté correctamente configurado
- Revisa que `jwt.secret` esté configurado en `application.properties`

**Frontend no recibe los tokens**
- Verifica la configuración de `app.oauth2.redirect-uri` en `application.properties`
- Asegúrate de que tu frontend tiene una ruta `/oauth2/redirect`

---

## 📚 Recursos Adicionales

- [Spring Security OAuth2 Login](https://docs.spring.io/spring-security/reference/servlet/oauth2/login/index.html)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)

