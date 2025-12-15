# Sistema Inteligente de Gestión de Perfiles OAuth2

## 📋 Resumen

Se ha implementado un **sistema inteligente** en el backend que distingue automáticamente entre usuarios nuevos y veteranos durante el login con OAuth2 (Google/Facebook). El sistema gestiona el estado del perfil del usuario (`profileCompleted`) para dirigir al frontend hacia la pantalla correcta.

---

## 🧠 Lógica Inteligente Implementada

### **Flujo de Autenticación OAuth2**

```
1. Usuario hace clic en "Login con Google"
        ↓
2. Google autentica y envía datos al Backend
        ↓
3. OAuth2LoginSuccessHandler recibe los datos
        ↓
4. OAuth2UserService procesa al usuario
        ↓
   ┌────────────────────────────────────┐
   │  ¿Usuario existe en BD?            │
   └────────────────────────────────────┘
         /                    \
      NO ✗                    SÍ ✓
        /                        \
   NUEVO USUARIO            USUARIO EXISTENTE
   ↓                               ↓
   Crear usuario                Verificar estado
   profileCompleted = false     del perfil
   ↓                               ↓
   Generar JWT               profileCompleted?
   ↓                          /            \
   Redirección            true ✓        false ✗
   con flag               ↓                ↓
        \                Dashboard      Completar
         \                  /            Perfil
          \________________/
                    ↓
          Frontend recibe:
          - token
          - refreshToken
          - profileCompleted (true/false)
```

---

## 🔧 Componentes Implementados

### **1. Modelo Usuario (`Usuario.java`)**

Se agregó el campo `profileCompleted`:

```java
@NotNull
@ColumnDefault("false")
@Column(name = "profile_completed", nullable = false)
private Boolean profileCompleted;
```

**Lógica:**
- `false` por defecto para usuarios OAuth2 nuevos
- `true` para usuarios que completaron su perfil o se registraron localmente

---

### **2. Migración de Base de Datos (`V21__add_profile_completed_to_usuario.sql`)**

```sql
-- Agregar columna
ALTER TABLE usuario ADD COLUMN profile_completed BOOLEAN DEFAULT false NOT NULL;

-- Usuarios LOCAL ya tienen perfil completo
UPDATE usuario SET profile_completed = true WHERE provider = 'LOCAL';

-- Usuarios OAuth2 con teléfono y dirección
UPDATE usuario u
SET profile_completed = true
WHERE u.provider IN ('GOOGLE', 'FACEBOOK')
  AND u.telefono IS NOT NULL
  AND EXISTS (SELECT 1 FROM direccion d WHERE d.id_usuario = u.id_user);
```

---

### **3. OAuth2UserService (`OAuth2UserService.java`)**

**Lógica inteligente implementada:**

```java
public Usuario processOAuth2User(OAuth2User oAuth2User, String provider) {
    String email = oAuth2User.getAttribute("email");
    String name = oAuth2User.getAttribute("name");

    return userRepository.findByEmail(email)
        .map(existingUser -> {
            // ✅ USUARIO EXISTENTE
            // Retorna con su estado actual de profileCompleted
            return existingUser;
        })
        .orElseGet(() -> {
            // 🆕 USUARIO NUEVO
            Usuario newUser = new Usuario();
            newUser.setEmail(email);
            newUser.setNombre(name);
            newUser.setProvider(provider);
            newUser.setProfileCompleted(false); // ⭐ NUEVO = PERFIL INCOMPLETO
            // ... otros campos ...
            return userRepository.save(newUser);
        });
}
```

**Logs detallados:**
```
🔍 [OAuth2] Procesando usuario de GOOGLE: juan@gmail.com
✅ [OAuth2] Usuario EXISTENTE encontrado
  ├─ ID: 5
  ├─ Provider: GOOGLE
  ├─ Teléfono: 123456789
  └─ Profile Completed: true
```

---

### **4. OAuth2LoginSuccessHandler (`OAuth2LoginSuccessHandler.java`)**

**Genera la redirección con información completa:**

```java
String redirectUrl = UriComponentsBuilder.fromUriString(frontendRedirectUri)
    .queryParam("token", token)
    .queryParam("refreshToken", refreshToken)
    .queryParam("profileCompleted", usuario.getProfileCompleted())
    .queryParam("isNewUser", !usuario.getProfileCompleted())
    .build()
    .toUriString();
```

**Ejemplo de URL de redirección:**
```
http://localhost:3000/oauth2/redirect?
  token=eyJhbGciOiJIUzI1NiIs...
  &refreshToken=eyJhbGciOiJIUzI1NiIs...
  &profileCompleted=false
  &isNewUser=true
```

---

### **5. Endpoint para Completar Perfil**

**Nuevo endpoint:** `POST /api/usuarios/complete-profile`

**Request:**
```json
{
  "telefono": "123456789",
  "nombre": "Juan García",
  "direcciones": [
    {
      "calle": "Calle Principal",
      "numero": "123",
      "codigoPostal": "28001",
      "ciudad": "Madrid",
      "provincia": "Madrid",
      "pais": "España"
    }
  ]
}
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "id": 5,
  "nombre": "Juan García",
  "email": "juan@gmail.com",
  "telefono": "123456789",
  "rol": "USER",
  "provider": "GOOGLE",
  "cantidadDonada": 0.00,
  "profileCompleted": true,
  "direcciones": [
    {
      "id": 10,
      "calle": "Calle Principal",
      "numero": "123",
      "codigoPostal": "28001",
      "ciudad": "Madrid",
      "provincia": "Madrid",
      "pais": "España"
    }
  ]
}
```

---

### **6. AuthService Actualizado**

Los usuarios que se registran **localmente** tienen `profileCompleted = true` automáticamente:

```java
usuario.setProfileCompleted(true); // ⭐ Registro LOCAL = Perfil completo
```

---

## 📊 Escenarios de Uso

### **Escenario 1: Usuario OAuth2 Nuevo (Primera Vez)**

1. Usuario hace clic en "Login con Google"
2. Google autentica exitosamente
3. Backend **crea** el usuario:
   - `provider = "GOOGLE"`
   - `profileCompleted = false`
4. Backend redirige con: `profileCompleted=false&isNewUser=true`
5. Frontend detecta `profileCompleted=false` → Muestra formulario de completar perfil
6. Usuario completa teléfono y dirección
7. Frontend llama: `POST /api/usuarios/complete-profile`
8. Backend marca: `profileCompleted = true`
9. Frontend redirige al dashboard

---

### **Escenario 2: Usuario OAuth2 Veterano (Perfil Completo)**

1. Usuario hace clic en "Login con Google"
2. Google autentica exitosamente
3. Backend **encuentra** el usuario existente:
   - `provider = "GOOGLE"`
   - `profileCompleted = true`
4. Backend redirige con: `profileCompleted=true&isNewUser=false`
5. Frontend detecta `profileCompleted=true` → Redirige directo al dashboard

---

### **Escenario 3: Usuario OAuth2 que Abandonó el Registro**

1. Usuario se registró antes con Google pero cerró la ventana sin completar el perfil
2. Usuario vuelve e intenta login con Google
3. Backend **encuentra** el usuario existente:
   - `provider = "GOOGLE"`
   - `profileCompleted = false` (no completó el perfil la primera vez)
4. Backend redirige con: `profileCompleted=false&isNewUser=false`
5. Frontend detecta `profileCompleted=false` → Muestra formulario de completar perfil
6. Usuario completa su perfil
7. Backend marca: `profileCompleted = true`

---

### **Escenario 4: Usuario LOCAL (Registro Tradicional)**

1. Usuario se registra con email/password
2. Backend crea el usuario:
   - `provider = "LOCAL"`
   - `profileCompleted = true` (ya completó todo en el registro)
3. Frontend redirige directo al dashboard

---

## 🎯 Ventajas del Sistema

✅ **Inteligencia automática**: El backend decide qué mostrar al usuario
✅ **Sin preguntas al usuario**: El sistema sabe si es nuevo o veterano
✅ **Recuperación de registro abandonado**: Si el usuario no completó el perfil, lo puede hacer después
✅ **Compatibilidad**: Funciona con Google, Facebook y registro LOCAL
✅ **Logs detallados**: Fácil de debuggear y monitorear
✅ **Escalable**: Fácil agregar más providers OAuth2

---

## 🔍 Logs del Sistema

### **Usuario Nuevo OAuth2:**
```
🔍 [OAuth2] Procesando usuario de GOOGLE: nuevo@gmail.com
🆕 [OAuth2] Usuario NUEVO - Primera vez que se registra
✅ [OAuth2] Usuario creado con ID: 10
  └─ Profile Completed: false (debe completar su perfil)

🔐 [OAuth2Handler] Autenticación exitosa con GOOGLE
📊 [OAuth2Handler] Estado del usuario:
  ├─ ID: 10
  ├─ Email: nuevo@gmail.com
  ├─ Nombre: Juan García
  ├─ Provider: GOOGLE
  └─ Profile Completed: false

🔄 [OAuth2Handler] Redirigiendo al frontend:
  └─ URL: http://localhost:3000/oauth2/redirect?token=...&profileCompleted=false&isNewUser=true
```

### **Usuario Existente OAuth2:**
```
🔍 [OAuth2] Procesando usuario de GOOGLE: veterano@gmail.com
✅ [OAuth2] Usuario EXISTENTE encontrado
  ├─ ID: 5
  ├─ Provider: GOOGLE
  ├─ Teléfono: 123456789
  └─ Profile Completed: true

🔐 [OAuth2Handler] Autenticación exitosa con GOOGLE
📊 [OAuth2Handler] Estado del usuario:
  ├─ ID: 5
  ├─ Email: veterano@gmail.com
  ├─ Nombre: Juan García
  ├─ Provider: GOOGLE
  └─ Profile Completed: true

🔄 [OAuth2Handler] Redirigiendo al frontend:
  └─ URL: http://localhost:3000/oauth2/redirect?token=...&profileCompleted=true&isNewUser=false
```

### **Completar Perfil:**
```
📥 [COMPLETE-PROFILE] Usuario autenticado: nuevo@gmail.com
📝 [SERVICIO] Completando perfil de usuario OAuth2: nuevo@gmail.com
  ├─ Usuario encontrado ID: 10
  ├─ Provider: GOOGLE
  └─ Profile Completed actual: false
  ✅ Teléfono actualizado: 123456789
  ✅ Nombre actualizado: Juan García
  📍 Guardando 1 direcciones
    ✅ Dirección guardada: Calle Principal
  ⭐ Profile Completed actualizado a: true
✅ [SERVICIO] Perfil completado exitosamente
```

---

## 🧪 Testing

### **Test con cURL - Completar Perfil:**

```bash
# 1. Obtener token (después de login OAuth2)
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# 2. Completar perfil
curl -X POST http://localhost:8080/api/usuarios/complete-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "telefono": "123456789",
    "nombre": "Juan García Completo",
    "direcciones": [
      {
        "calle": "Calle Principal",
        "numero": "123",
        "codigoPostal": "28001",
        "ciudad": "Madrid",
        "provincia": "Madrid",
        "pais": "España"
      }
    ]
  }'
```

---

## 📝 Archivos Modificados/Creados

1. ✅ `src/main/java/com/cudeca/cudecabe/model/Usuario.java` - Campo `profileCompleted`
2. ✅ `src/main/resources/db/migration/V21__add_profile_completed_to_usuario.sql` - Migración
3. ✅ `src/main/java/com/cudeca/cudecabe/service/OAuth2UserService.java` - Lógica inteligente
4. ✅ `src/main/java/com/cudeca/cudecabe/config/OAuth2LoginSuccessHandler.java` - Redirección con flags
5. ✅ `src/main/java/com/cudeca/cudecabe/DTOs/usuario/CompleteProfileRequest.java` - Nuevo DTO
6. ✅ `src/main/java/com/cudeca/cudecabe/DTOs/usuario/UsuarioResponse.java` - Campo `profileCompleted`
7. ✅ `src/main/java/com/cudeca/cudecabe/service/UserService.java` - Método `completarPerfil`
8. ✅ `src/main/java/com/cudeca/cudecabe/service/serviceImpl/UserServiceImpl.java` - Implementación
9. ✅ `src/main/java/com/cudeca/cudecabe/controllers/UsuarioController.java` - Endpoint `/complete-profile`
10. ✅ `src/main/java/com/cudeca/cudecabe/service/AuthService.java` - `profileCompleted = true` para LOCAL

---

## 🚀 Siguiente Paso: Frontend

El frontend debe manejar la redirección OAuth2:

```javascript
// En la ruta /oauth2/redirect
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const refreshToken = urlParams.get('refreshToken');
const profileCompleted = urlParams.get('profileCompleted') === 'true';

// Guardar tokens
localStorage.setItem('token', token);
localStorage.setItem('refreshToken', refreshToken);

if (!profileCompleted) {
  // Usuario nuevo o que no completó el perfil
  navigate('/complete-profile');
} else {
  // Usuario con perfil completo
  navigate('/dashboard');
}
```

---

## ⚙️ Configuración

En `application.properties`:

```properties
# URL de redirección del frontend (personalizable)
app.oauth2.redirect-uri=http://localhost:3000/oauth2/redirect
```

---

## 🎉 Conclusión

El sistema ahora es completamente **inteligente** y **automático**:

- ✅ Detecta automáticamente usuarios nuevos vs veteranos
- ✅ Gestiona el estado del perfil (`profileCompleted`)
- ✅ Redirige al frontend con la información necesaria
- ✅ Permite completar el perfil en cualquier momento
- ✅ Compatible con múltiples providers OAuth2
- ✅ Logs detallados para debugging

**El backend toma todas las decisiones**, el frontend solo necesita leer el flag `profileCompleted` y actuar en consecuencia.

