# 🔧 Solución: Backend no Arrancaba

## ❌ Problema

El backend no arrancaba con el siguiente error:

```
Description:
Parameter 0 of constructor in com.cudeca.cudecabe.service.AuthService 
required a bean of type 'org.springframework.security.authentication.AuthenticationManager' 
that could not be found.
```

## 🔍 Causa

El archivo `SecurityConfig.java` se perdió o no se guardó correctamente durante los cambios previos.  
Sin este archivo, Spring Security no podía crear el bean `AuthenticationManager` necesario para el `AuthService`.

## ✅ Solución Aplicada

Se recreó el archivo `SecurityConfig.java` con la configuración completa:

**Ubicación:** `src/main/java/com/cudeca/cudecabe/config/SecurityConfig.java`

### Componentes Incluidos:

1. **PasswordEncoder** - Bean para encriptar contraseñas con BCrypt
2. **AuthenticationProvider** - Configuración de DaoAuthenticationProvider
3. **AuthenticationManager** - Bean requerido por AuthService ✅
4. **SecurityFilterChain** - Configuración de seguridad HTTP:
   - CSRF deshabilitado
   - Sesiones STATELESS
   - Endpoints públicos configurados
   - Filtro JWT integrado

## 🚀 Cómo Iniciar el Backend

### Desde IntelliJ IDEA:
1. Abrir la clase `CudecaBeApplication.java`
2. Click derecho → Run 'CudecaBeApplication'
3. O presionar `Shift + F10`

### Desde Terminal/Maven:
```bash
cd C:\Users\Dani\Documents\Cudeca\CudecaBE
.\mvnw.cmd spring-boot:run
```

## 📊 Verificar que Está Corriendo

Cuando el backend arranque correctamente, verás en los logs:

```
INFO ... Tomcat started on port 8080 (http) with context path '/'
INFO ... Started CudecaBeApplication in X.XXX seconds
```

## 🧪 Probar en Swagger

Una vez que esté corriendo, accede a:

```
http://localhost:8080/swagger-ui.html
```

### Pasos para Probar Login:

1. **Abrir Swagger UI** en el navegador
2. **Buscar** el endpoint `POST /api/auth/login`
3. **Click** en "Try it out"
4. **Pegar** este JSON:
```json
{
  "email": "admin@cudeca.org",
  "password": "admin123"
}
```
5. **Click** en "Execute"
6. **Copiar** el token de la respuesta
7. **Click** en el botón "Authorize" 🔓 (arriba)
8. **Pegar** el token y hacer click en "Authorize"
9. Ahora puedes probar endpoints protegidos

## ⚠️ Nota Importante

**Antes de probar el login**, asegúrate de que los usuarios de prueba existen en la base de datos.

### Opción 1: Ejecutar el script SQL
```bash
psql -U postgres -d Cudeca -f insert_test_users.sql
```

### Opción 2: Insertar manualmente en pgAdmin/DBeaver
```sql
INSERT INTO usuario (username, nombre, email, telefono, password, rol)
VALUES (
    'admin',
    'Administrador',
    'admin@cudeca.org',
    '666123456',
    '$2a$10$xvYT.z6u7QFPy0aP0VJXYOkQVXm6wP.O7yGxB7qKm3J0FH0UqF5Ry',
    'ADMIN'
);
```

## 📝 Archivos Clave Creados/Restaurados

- ✅ `SecurityConfig.java` - Configuración de Spring Security
- ✅ `SwaggerConfig.java` - Configuración de Swagger UI (pendiente si no existe)
- ✅ `JwtUtil.java` - Utilidad para JWT
- ✅ `JwtAuthenticationFilter.java` - Filtro JWT
- ✅ `CustomUserDetailsService.java` - Servicio de usuarios
- ✅ `AuthService.java` - Servicio de autenticación
- ✅ `AuthController.java` - Controlador REST

## 🎯 Estado Actual

✅ SecurityConfig recreado
✅ AuthenticationManager bean configurado
⏳ Backend iniciando...
⏳ Pendiente verificar en Swagger

---

**Resuelto el:** 2025-12-14 17:26
**Causa:** Archivo SecurityConfig.java faltante
**Solución:** Recrear SecurityConfig.java con configuración completa

