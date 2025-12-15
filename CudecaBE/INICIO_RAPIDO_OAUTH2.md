# 🚀 Inicio Rápido - OAuth2 con Google

## ⚡ Prueba Rápida (2 minutos)

### Opción 1: Script Automático (Recomendado)

```powershell
# 1. Inicia el backend (en una terminal)
.\mvnw.cmd spring-boot:run

# 2. Espera 30 segundos a que inicie

# 3. En otra terminal, ejecuta el script de prueba
.\test-oauth2.ps1
```

El script verificará que OAuth2 esté configurado y abrirá el navegador automáticamente.

---

### Opción 2: Prueba Manual

#### Paso 1: Inicia el backend
```powershell
.\mvnw.cmd spring-boot:run
```

#### Paso 2: Espera a que inicie (verás este mensaje)
```
Started CudecaBeApplication in X.XXX seconds
```

#### Paso 3: Abre tu navegador en:
```
http://localhost:8080/oauth2/authorization/google
```

#### Paso 4: Autoriza con Google
- Selecciona tu cuenta de Google
- Acepta los permisos
- Serás redirigido con los tokens

#### Paso 5: Verifica la redirección
Deberías ver una URL como:
```
http://localhost:3000/oauth2/redirect?token=eyJhbGc...&refreshToken=eyJhbGc...
```

✅ **¡Funciona!** Los tokens están ahí, OAuth2 está configurado correctamente.

---

## 📍 URLs Útiles

| Descripción | URL |
|------------|-----|
| Estado OAuth2 | http://localhost:8080/api/test/oauth2-status |
| Login con Google | http://localhost:8080/oauth2/authorization/google |
| API Login tradicional | POST http://localhost:8080/api/auth/login |
| API Registro | POST http://localhost:8080/api/auth/register |

---

## 🔍 Verificar en la Base de Datos

Después de hacer login con Google:

```sql
SELECT id_user, nombre, email, provider, rol 
FROM usuario 
WHERE provider = 'GOOGLE'
ORDER BY id_user DESC 
LIMIT 5;
```

---

## 📚 Documentación Completa

- **[RESUMEN_OAUTH2_COMPLETADO.md](./RESUMEN_OAUTH2_COMPLETADO.md)** - Resumen completo de la configuración
- **[OAUTH2_GOOGLE_SETUP.md](./OAUTH2_GOOGLE_SETUP.md)** - Guía detallada paso a paso
- **[FRONTEND_OAUTH2_EXAMPLES.jsx](./FRONTEND_OAUTH2_EXAMPLES.jsx)** - Ejemplos de código para React

---

## 🎯 Siguiente Paso: Implementar en el Frontend

Ve al archivo `FRONTEND_OAUTH2_EXAMPLES.jsx` para ver ejemplos completos de:
- Botón de "Login con Google"
- Página de redirección OAuth2
- Configuración de rutas en React
- Estilos CSS
- Servicio de autenticación

---

## 🆘 Problemas?

### Backend no inicia
```powershell
# Verifica que PostgreSQL esté corriendo
# Verifica application.properties (usuario/contraseña BD)
```

### Error "redirect_uri_mismatch"
- Verifica en Google Cloud Console que la URI sea exactamente:
  `http://localhost:8080/login/oauth2/code/google`

### Usuario no se crea en BD
```sql
-- Verifica que la columna provider exista
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'usuario' AND column_name = 'provider';
```

---

## ✅ Checklist

- [x] Google Cloud Console configurado
- [x] Client ID y Secret en application.properties
- [x] Backend configurado con OAuth2
- [x] Servicios y handlers implementados
- [x] CORS configurado
- [x] Campo `provider` en tabla Usuario
- [ ] Frontend implementado (próximo paso)
- [ ] Probar flujo completo

---

**¿Listo para probar?** → Ejecuta `.\test-oauth2.ps1` 🚀

