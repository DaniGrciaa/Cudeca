# Mejora de Seguridad: Gestión de Rol y Provider en el Backend

## Problema Anterior
Anteriormente, los campos `rol`, `provider` y `cantidadDonada` podían ser enviados por el cliente en las peticiones de registro y actualización de usuarios. Esto representaba un **grave problema de seguridad** ya que:

- Un usuario malicioso podría registrarse asignándose el rol de `ADMIN`
- Se podría manipular la cantidad donada
- Se podría cambiar el proveedor de autenticación

## Solución Implementada

### 1. Eliminación de campos del DTO `UsuarioRequest`
Se eliminaron los siguientes campos que no deben ser controlados por el cliente:
- `rol`
- `provider`
- `cantidadDonada`

### 2. Gestión en el Backend
El backend ahora asigna automáticamente estos valores de forma segura:

```java
// En UsuarioMapper.toEntity()
usuario.setRol("USER");              // Todos los nuevos usuarios son USER por defecto
usuario.setProvider("LOCAL");        // Provider LOCAL para registro tradicional
usuario.setCantidadDonada(BigDecimal.ZERO);  // Inicia en 0
```

### 3. Valores de Rol Permitidos
Según la restricción de base de datos en `V2__refactor_usuaio_y_mejoras.sql`:
- `USER` - Usuario estándar (valor por defecto)
- `ADMIN` - Administrador del sistema
- `ORGANIZADOR` - Organizador de eventos
- `PATROCINADOR` - Patrocinador
- `SOCIO` - Socio de Cudeca (agregado posteriormente)

### 4. Gestión Interna
Estos campos ahora solo pueden ser modificados:
- **Rol**: Solo por administradores mediante endpoints específicos (a implementar)
- **Provider**: Solo por el sistema durante autenticación OAuth2
- **CantidadDonada**: Solo por el sistema al procesar donaciones

## Request de Registro ANTES (INSEGURO ❌)
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "mipassword",
  "telefono": "+34 123456789",
  "rol": "ADMIN",           // ❌ El cliente podía hacerse ADMIN
  "provider": "LOCAL",
  "cantidadDonada": 9999.99  // ❌ El cliente podía manipular esto
}
```

## Request de Registro AHORA (SEGURO ✅)
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "mipassword",
  "telefono": "+34 123456789"
  // ✅ El backend asigna automáticamente:
  // - rol: "USER"
  // - provider: "LOCAL"
  // - cantidadDonada: 0.00
}
```

## Archivos Modificados
1. `DTOs/usuario/UsuarioRequest.java` - Eliminados campos inseguros
2. `mappers/UsuarioMapper.java` - Asignación automática de valores seguros
3. `UsuarioServiceTest.java` - Actualizados tests
4. `UsuarioControllerTest.java` - Actualizados tests

## Próximos Pasos Recomendados
1. Crear endpoint `/api/admin/usuarios/{id}/rol` para que ADMIN pueda cambiar roles
2. Implementar auditoría de cambios de rol
3. Crear sistema de incremento de `cantidadDonada` al procesar pagos
4. Implementar OAuth2 correctamente para gestionar `provider: GOOGLE`

## Beneficios de Seguridad
✅ No se pueden auto-asignar privilegios de administrador  
✅ No se puede manipular el historial de donaciones  
✅ El sistema de autenticación mantiene integridad  
✅ Cumple con principio de menor privilegio  
✅ Previene escalada de privilegios  

