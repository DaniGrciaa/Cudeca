# Resumen de Cambios - Seguridad y Direcciones

## 📋 Cambios Realizados

### 1. ✅ Mejora de Seguridad: Gestión de Rol y Provider
**Problema:** Los campos `rol`, `provider` y `cantidadDonada` podían ser enviados por el cliente, permitiendo que usuarios maliciosos se asignaran privilegios de administrador.

**Solución:**
- ✅ Eliminados `rol`, `provider` y `cantidadDonada` de `UsuarioRequest`
- ✅ El backend asigna automáticamente:
  - `rol = "USER"`
  - `provider = "LOCAL"`
  - `cantidadDonada = 0.00`
- ✅ Estos campos NO se pueden modificar desde requests normales

**Archivos modificados:**
- `DTOs/usuario/UsuarioRequest.java`
- `mappers/UsuarioMapper.java`
- Tests: `UsuarioServiceTest.java`, `UsuarioControllerTest.java`, `UsuarioMapperTest.java`

**Documentación:** `SEGURIDAD_ROL_PROVIDER.md`

---

### 2. ✅ Fix: Guardar Direcciones al Registrar Usuario
**Problema:** Cuando un usuario se registraba, se guardaba el usuario pero su dirección NO se estaba guardando.

**Solución:**
- ✅ Eliminado campo duplicado `idUsuario` del modelo `Direccion`
- ✅ Corregida relación bidireccional `@ManyToOne` / `@OneToMany`
- ✅ Implementado mapeo de direcciones en `UsuarioMapper.toEntity()`
- ✅ Establecida relación bidireccional correcta `direccion.setUsuario(usuario)`
- ✅ Aprovechado `CascadeType.ALL` para guardar automáticamente

**Archivos modificados:**
- `model/Direccion.java`
- `mappers/UsuarioMapper.java` (agregado import de List)
- `mappers/DireccionMapper.java`
- `service/AuthService.java`

**Documentación:** `FIX_DIRECCION_REGISTRO.md`

---

## 🎯 Resultado Final

### Request de Registro ANTES (INSEGURO ❌)
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "mipassword",
  "rol": "ADMIN",           // ❌ Podía hacerse admin
  "cantidadDonada": 9999.99  // ❌ Podía manipular donaciones
}
```

### Request de Registro AHORA (SEGURO ✅)
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "mipassword",
  "telefono": "+34 123456789",
  "direcciones": [
    {
      "calle": "Calle Principal",
      "numero": "123",
      "codigoPostal": "29001",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  ]
}
```

**Asignaciones automáticas del backend:**
- ✅ `rol = "USER"`
- ✅ `provider = "LOCAL"`
- ✅ `cantidadDonada = 0.00`
- ✅ Dirección guardada correctamente con relación bidireccional

---

## 🧪 Tests

Todos los tests compilados y pasando correctamente:
- ✅ `UsuarioMapperTest` - 7 tests pasados
- ✅ `UsuarioServiceTest` - Actualizado
- ✅ `UsuarioControllerTest` - Actualizado
- ✅ Compilación exitosa: `BUILD SUCCESS`

---

## 📚 Documentación Creada

1. **SEGURIDAD_ROL_PROVIDER.md**
   - Explicación del problema de seguridad
   - Solución implementada
   - Comparación antes/después
   - Próximos pasos recomendados

2. **FIX_DIRECCION_REGISTRO.md**
   - Causa raíz del problema
   - Cambios en modelos y mappers
   - Cómo funciona ahora
   - Ejemplos de uso

---

## 🔒 Beneficios de Seguridad

✅ **No auto-asignación de privilegios** - Los usuarios no pueden hacerse administradores  
✅ **Integridad de donaciones** - No se puede manipular el historial de donaciones  
✅ **Sistema de autenticación robusto** - El provider se gestiona correctamente  
✅ **Principio de menor privilegio** - Todos empiezan como USER  
✅ **Prevención de escalada de privilegios** - Solo el backend gestiona roles  

---

## 🚀 Funcionalidades que Funcionan Ahora

### 1. Registro con Dirección Única (AuthService)
```bash
POST /api/auth/register
```
✅ Guarda usuario + 1 dirección + genera tokens JWT

### 2. Crear Usuario con Múltiples Direcciones
```bash
POST /api/usuarios
```
✅ Guarda usuario + N direcciones via cascade

---

## 🔧 Próximos Pasos Sugeridos

1. **Gestión de Roles por Admin**
   - Crear endpoint `PUT /api/admin/usuarios/{id}/rol`
   - Solo accesible para usuarios con rol ADMIN
   - Implementar auditoría de cambios de rol

2. **Sistema de Donaciones**
   - Implementar incremento automático de `cantidadDonada`
   - Crear endpoint para procesar pagos
   - Registrar historial de donaciones

3. **OAuth2 Completo**
   - Gestionar correctamente `provider = "GOOGLE"`
   - Implementar flujo OAuth2 con Google
   - Sincronizar datos del proveedor OAuth

4. **Gestión de Direcciones**
   - Endpoint `GET /api/usuarios/{id}/direcciones`
   - Endpoint `POST /api/usuarios/{id}/direcciones`
   - Endpoint `PUT /api/usuarios/{id}/direcciones/{idDireccion}`
   - Endpoint `DELETE /api/usuarios/{id}/direcciones/{idDireccion}`
   - Agregar campo `esPrincipal` para marcar dirección principal

---

## ✅ Checklist de Completado

- [x] Eliminados campos inseguros de UsuarioRequest
- [x] Backend asigna valores por defecto seguros
- [x] Corregida relación bidireccional Usuario-Direccion
- [x] Direcciones se guardan correctamente
- [x] Todos los tests actualizados y pasando
- [x] Compilación exitosa sin errores
- [x] Documentación completa creada
- [x] AuthService actualizado correctamente

---

**Estado:** ✅ **COMPLETADO EXITOSAMENTE**

**Fecha:** 2025-12-15  
**Version:** Backend v1.1.0

