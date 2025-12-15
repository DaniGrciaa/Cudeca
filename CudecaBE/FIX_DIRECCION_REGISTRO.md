# Fix: Guardar Direcciones al Registrar Usuario

## Problema Original
Cuando un usuario se registraba, se guardaba el usuario pero **su dirección no se estaba guardando** en la base de datos.

## Causa Raíz
1. **En `UsuarioMapper.toEntity()`**: No se estaban procesando las direcciones del `UsuarioRequest`
2. **Relación bidireccional incorrecta**: El modelo `Direccion` tenía un campo `idUsuario` duplicado que causaba conflictos con la relación `@ManyToOne`
3. **Error de mapeo**: No se establecía la relación bidireccional entre `Usuario` y `Direccion`

## Cambios Realizados

### 1. Modelo `Direccion.java`
**Antes:**
```java
@NotNull
@Column(name = "id_usuario", nullable = false)
private Integer idUsuario;

// ...

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_usuario", insertable = false, updatable = false)
private Usuario usuario;
```

**Después:**
```java
// Se eliminó el campo idUsuario duplicado

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_usuario", nullable = false)
private Usuario usuario;
```

### 2. `UsuarioMapper.toEntity()`
**Antes:**
```java
public Usuario toEntity(UsuarioRequest request) {
    Usuario usuario = new Usuario();
    usuario.setNombre(request.getNombre());
    usuario.setEmail(request.getEmail());
    // ... sin mapeo de direcciones
    return usuario;
}
```

**Después:**
```java
public Usuario toEntity(UsuarioRequest request) {
    Usuario usuario = new Usuario();
    usuario.setNombre(request.getNombre());
    usuario.setEmail(request.getEmail());
    // ... otros campos
    
    // Mapear direcciones si existen en el request
    if (request.getDirecciones() != null && !request.getDirecciones().isEmpty()) {
        List<Direccion> direcciones = request.getDirecciones().stream()
            .map(direccionRequest -> {
                Direccion direccion = new Direccion();
                direccion.setCalle(direccionRequest.getCalle());
                // ... otros campos
                direccion.setUsuario(usuario); // ✅ Relación bidireccional
                return direccion;
            })
            .collect(Collectors.toList());
        usuario.setDirecciones(direcciones);
    }
    
    return usuario;
}
```

### 3. `DireccionMapper.toEntity()`
**Antes:**
```java
public Direccion toEntity(DireccionRequest request, Integer idUsuario) {
    Direccion direccion = new Direccion();
    direccion.setIdUsuario(idUsuario); // ❌ Campo que ya no existe
    // ...
}
```

**Después:**
```java
public Direccion toEntity(DireccionRequest request, Usuario usuario) {
    Direccion direccion = new Direccion();
    direccion.setUsuario(usuario); // ✅ Relación correcta
    // ...
}
```

### 4. `AuthService.registrarConDireccion()`
Se actualizó para usar la nueva relación:
```java
Direccion direccion = new Direccion();
direccion.setUsuario(usuario); // ✅ En lugar de setIdUsuario()
// ...
direccionRepository.save(direccion);
```

## Cómo Funciona Ahora

### Opción 1: Usando el endpoint de registro con dirección (`/api/auth/register`)
```json
POST /api/auth/register
{
  "nombre": "Juan",
  "apellidos": "Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "telefono": "+34 123456789",
  "direccion": {
    "calle": "Calle Principal",
    "numero": "123",
    "codigoPostal": "29001",
    "ciudad": "Málaga",
    "provincia": "Málaga",
    "pais": "España"
  }
}
```
✅ Se guarda el usuario Y su dirección automáticamente

### Opción 2: Usando el endpoint de creación de usuario (`/api/usuarios`)
```json
POST /api/usuarios
{
  "nombre": "María García",
  "email": "maria@example.com",
  "password": "password123",
  "telefono": "+34 987654321",
  "direcciones": [
    {
      "calle": "Avenida de la Constitución",
      "numero": "45",
      "piso": "3",
      "puerta": "B",
      "codigoPostal": "29002",
      "ciudad": "Málaga",
      "provincia": "Málaga",
      "pais": "España"
    }
  ]
}
```
✅ Se guarda el usuario con múltiples direcciones gracias a `CascadeType.ALL`

## Ventajas de la Solución

1. ✅ **Relación bidireccional correcta**: JPA gestiona automáticamente las claves foráneas
2. ✅ **Cascade automático**: Con `@OneToMany(cascade = CascadeType.ALL)`, al guardar el usuario se guardan automáticamente las direcciones
3. ✅ **Orphan removal**: Si se elimina un usuario, sus direcciones también se eliminan
4. ✅ **Código más limpio**: No hay campos duplicados ni confusión entre `idUsuario` y la relación `usuario`
5. ✅ **Múltiples direcciones**: Un usuario puede tener varias direcciones

## Tests Actualizados
- ✅ `UsuarioMapperTest` - Todos los tests pasan
- ✅ `UsuarioServiceTest` - Actualizado sin referencias a `rol` en request
- ✅ `UsuarioControllerTest` - Actualizado sin referencias a `rol` en request

## Base de Datos
La migración `V16__create_direccion_and_remove_username.sql` ya tiene la estructura correcta:
```sql
CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    -- ... otros campos
    CONSTRAINT fk_direccion_usuario 
        FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_user) 
        ON DELETE CASCADE
);
```

## Próximos Pasos Recomendados
1. Crear endpoint `PUT /api/usuarios/{id}/direcciones` para gestionar direcciones
2. Implementar validación de que al menos una dirección tenga datos completos
3. Añadir campo `esPrincipal` a la tabla direccion para marcar la dirección principal
4. Crear tests de integración para verificar el guardado de direcciones

## Archivos Modificados
1. `model/Direccion.java` - Eliminado campo duplicado `idUsuario`
2. `mappers/UsuarioMapper.java` - Agregado mapeo de direcciones + import de List
3. `mappers/DireccionMapper.java` - Actualizado para usar relación Usuario
4. `service/AuthService.java` - Actualizado `setUsuario()` en lugar de `setIdUsuario()`
5. `test/UsuarioMapperTest.java` - Actualizados tests sin referencias a rol en request
6. `test/UsuarioServiceTest.java` - Actualizado setUp sin setRol
7. `test/UsuarioControllerTest.java` - Actualizado setUp sin setRol

