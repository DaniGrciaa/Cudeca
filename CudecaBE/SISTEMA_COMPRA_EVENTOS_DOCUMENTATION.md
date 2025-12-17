# Sistema de Compra de Eventos - Documentación Completa

## 📋 Resumen
Se ha implementado un sistema completo para relacionar usuarios con eventos comprados, incluyendo todos los componentes necesarios del backend.

## 🗄️ Base de Datos

### Nueva Migración Flyway
**Archivo:** `V24__create_compra_evento_relation.sql`

Se creó una tabla intermedia `compra_evento` con:
- **Campos principales:**
  - `id_compra_evento` (PK, SERIAL)
  - `id_user` (FK a usuario)
  - `id_evento` (FK a evento)
  - `fecha_compra` (TIMESTAMP con default CURRENT_TIMESTAMP)
  - `cantidad_entradas` (INT, mínimo 1)
  - `precio_total` (DECIMAL 10,2, no negativo)
  - `metodo_pago` (VARCHAR 50)
  - `estado` (VARCHAR 20, default 'COMPLETADO')
  - `codigo_transaccion` (VARCHAR 100)

- **Índices creados:**
  - `idx_compra_evento_usuario` (id_user)
  - `idx_compra_evento_evento` (id_evento)
  - `idx_compra_evento_fecha` (fecha_compra)
  - `idx_compra_evento_estado` (estado)

- **Restricciones:**
  - CASCADE en DELETE para usuario y evento
  - CHECK para cantidad_entradas > 0
  - CHECK para precio_total >= 0

## 🔧 Modelo de Entidad

### CompraEvento.java
Entidad JPA que representa la tabla `compra_evento`:
- Relación ManyToOne con Usuario
- Relación ManyToOne con Evento
- `@CreationTimestamp` para fecha_compra automática
- Validaciones con Jakarta Bean Validation

### Actualizaciones en Usuario.java
- Agregada relación `@OneToMany` con CompraEvento
- Campo: `List<CompraEvento> comprasEventos`
- CascadeType.ALL y orphanRemoval = true

### Actualizaciones en Evento.java
- Agregada relación `@OneToMany` con CompraEvento
- Campo: `List<CompraEvento> comprasEventos`
- CascadeType.ALL y orphanRemoval = true

## 📦 DTOs Creados

### 1. CompraEventoRequest
DTO para crear una nueva compra de evento:
```java
- eventoId: Integer (required)
- cantidadEntradas: Integer (required, min 1)
- precioTotal: BigDecimal (required, min 0)
- metodoPago: String (required, max 50)
- codigoTransaccion: String (optional, max 100)
```

### 2. CompraEventoResponse
DTO completo con toda la información de la compra:
```java
- id: Integer
- usuarioId: Integer
- usuarioNombre: String
- usuarioEmail: String
- evento: EventoResponse (objeto completo)
- fechaCompra: LocalDateTime
- cantidadEntradas: Integer
- precioTotal: BigDecimal
- metodoPago: String
- estado: String
- codigoTransaccion: String
```

### 3. EventoCompradoDTO
DTO simplificado para mostrar eventos comprados por un usuario:
```java
- compraId: Integer
- eventoId: Integer
- eventoNombre: String
- eventoDescripcion: String
- eventoLugar: String
- eventoFecha: LocalDate
- eventoTipo: String
- fechaCompra: LocalDateTime
- cantidadEntradas: Integer
- precioTotal: BigDecimal
- metodoPago: String
- estado: String
- codigoTransaccion: String
```

## 🗺️ Mapper

### CompraEventoMapper.java
Mapper con dos métodos principales:
- `toResponse()`: Convierte CompraEvento → CompraEventoResponse
- `toEventoCompradoDTO()`: Convierte CompraEvento → EventoCompradoDTO
- Usa EventoMapper para transformar el evento relacionado

## 🗄️ Repository

### CompraEventoRepository.java
Repository con múltiples métodos de consulta:

**Métodos básicos:**
- `findByUsuarioId()`: Compras de un usuario
- `findByEventoId()`: Compras de un evento
- `findByEstado()`: Compras por estado
- `findByUsuarioIdAndEstado()`: Compras de un usuario con estado específico

**Métodos de fecha:**
- `findByFechaCompraBetween()`: Compras en rango de fechas
- `findByUsuarioIdAndFechaCompraBetween()`: Compras de usuario en rango

**Queries personalizadas (JPQL):**
- `findEventosCompradosByUsuario()`: Con JOIN FETCH del evento
- `findUsuariosCompradoresByEvento()`: Con JOIN FETCH del usuario
- `countComprasByEvento()`: Total de compras de un evento
- `countComprasByUsuario()`: Total de compras de un usuario

**Validaciones:**
- `existsByUsuarioIdAndEventoId()`: Verificar si ya compró

## ⚙️ Service Layer

### CompraEventoService (Interface)
Define los métodos del servicio:
- CRUD de compras
- Consultas por usuario/evento
- Actualización de estados
- Contadores y verificaciones

### CompraEventoServiceImpl (Implementación)
Implementación completa con:
- Validaciones de existencia de usuario y evento
- Transacciones con `@Transactional`
- Manejo de errores con RuntimeException
- Validación de estados permitidos: COMPLETADO, PENDIENTE, CANCELADO
- Conversión entre entidades y DTOs usando mappers

**Métodos principales:**
1. `crearCompraEvento()`: Registra una nueva compra
2. `getComprasByUsuario()`: Lista todas las compras de un usuario
3. `getEventosCompradosByUsuario()`: Lista eventos comprados (simplificado)
4. `getComprasByEvento()`: Lista compradores de un evento
5. `getCompraById()`: Obtiene una compra específica
6. `actualizarEstadoCompra()`: Cambia el estado de una compra
7. `cancelarCompra()`: Marca una compra como CANCELADO
8. `usuarioYaComproEvento()`: Verifica si ya compró
9. `getComprasByFechaRange()`: Compras en rango de fechas
10. `countEventosCompradosByUsuario()`: Cuenta eventos comprados
11. `countUsuariosByEvento()`: Cuenta compradores de un evento

## 🎮 Controller

### CompraEventoController.java
REST Controller con endpoints completos:

#### Endpoints para Usuario Autenticado:
```
POST   /api/compras-eventos
       - Crear compra para el usuario autenticado
       - Body: CompraEventoRequest

GET    /api/compras-eventos/mis-compras
       - Obtener todas las compras del usuario
       - Response: List<CompraEventoResponse>

GET    /api/compras-eventos/mis-eventos
       - Obtener eventos comprados (versión simplificada)
       - Response: List<EventoCompradoDTO>

GET    /api/compras-eventos/verificar/evento/{eventoId}
       - Verificar si ya compró un evento
       - Response: { "yaCompro": boolean }

GET    /api/compras-eventos/mis-eventos/count
       - Total de eventos comprados
       - Response: { "totalEventosComprados": number }
```

#### Endpoints Administrativos:
```
POST   /api/compras-eventos/usuario/{userId}
       - Crear compra para un usuario específico
       - Body: CompraEventoRequest

GET    /api/compras-eventos/usuario/{userId}
       - Compras de un usuario específico
       - Response: List<CompraEventoResponse>

GET    /api/compras-eventos/usuario/{userId}/eventos
       - Eventos comprados por un usuario
       - Response: List<EventoCompradoDTO>

GET    /api/compras-eventos/evento/{eventoId}
       - Compradores de un evento
       - Response: List<CompraEventoResponse>

GET    /api/compras-eventos/evento/{eventoId}/count
       - Total de compradores de un evento
       - Response: { "totalCompradores": number }
```

#### Endpoints Generales:
```
GET    /api/compras-eventos/{compraId}
       - Obtener una compra específica
       - Response: CompraEventoResponse

PATCH  /api/compras-eventos/{compraId}/estado
       - Actualizar estado de una compra
       - Body: { "estado": "COMPLETADO|PENDIENTE|CANCELADO" }

POST   /api/compras-eventos/{compraId}/cancelar
       - Cancelar una compra
       - Response: CompraEventoResponse

GET    /api/compras-eventos/rango-fecha?inicio={datetime}&fin={datetime}
       - Compras en rango de fechas
       - Response: List<CompraEventoResponse>
```

## 🔐 Autenticación
El controller utiliza Spring Security Authentication:
- `authentication.getName()` obtiene el email del usuario
- `UserService.obtenerUsuarioPorEmail()` obtiene el usuario completo
- Método auxiliar `getUserIdFromAuthentication()` extrae el ID

## 📊 Flujo de Uso

### 1. Comprar un Evento (Usuario Final)
```
POST /api/compras-eventos
Authorization: Bearer {token}
Body:
{
  "eventoId": 1,
  "cantidadEntradas": 2,
  "precioTotal": 50.00,
  "metodoPago": "TARJETA",
  "codigoTransaccion": "TXN123456"
}
```

### 2. Ver Mis Eventos Comprados
```
GET /api/compras-eventos/mis-eventos
Authorization: Bearer {token}
```

### 3. Verificar si Ya Compré un Evento
```
GET /api/compras-eventos/verificar/evento/5
Authorization: Bearer {token}
```

## 🚀 Despliegue

### Pasos para Aplicar:
1. **Flyway ejecutará automáticamente** la migración V23 al arrancar la aplicación
2. **Compilar el proyecto:** `mvn clean package`
3. **Ejecutar:** `java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar`

### Variables de Entorno Necesarias:
Ninguna adicional - usa las mismas que ya tienes configuradas para PostgreSQL.

## 📝 Notas Importantes

### Estados Permitidos:
- `COMPLETADO`: Compra realizada exitosamente
- `PENDIENTE`: Pago en proceso
- `CANCELADO`: Compra cancelada

### Métodos de Pago Sugeridos:
- TARJETA
- PAYPAL
- TRANSFERENCIA
- EFECTIVO
- BIZUM

### Validaciones Automáticas:
- Usuario debe existir
- Evento debe existir
- Cantidad de entradas > 0
- Precio total >= 0
- Estado debe ser válido

## 🧪 Testing Frontend

### Ejemplo con Fetch API:
```javascript
// Comprar un evento
const comprarEvento = async (eventoId, cantidadEntradas, precioTotal) => {
  const response = await fetch('http://localhost:8080/api/compras-eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      eventoId,
      cantidadEntradas,
      precioTotal,
      metodoPago: 'TARJETA',
      codigoTransaccion: 'TXN' + Date.now()
    })
  });
  return await response.json();
};

// Obtener mis eventos
const getMisEventos = async () => {
  const response = await fetch('http://localhost:8080/api/compras-eventos/mis-eventos', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};
```

## ✅ Checklist de Implementación

- [✅] Migración Flyway creada (V23)
- [✅] Modelo CompraEvento creado
- [✅] Relaciones agregadas en Usuario y Evento
- [✅] Repository con métodos de consulta
- [✅] DTOs completos (Request, Response, EventoCompradoDTO)
- [✅] Mapper implementado
- [✅] Service interface y implementación
- [✅] Controller con todos los endpoints
- [✅] Autenticación integrada
- [✅] Validaciones implementadas
- [✅] Documentación completa

## 📌 Próximos Pasos Recomendados

1. **Testing:** Crear tests unitarios para el service
2. **Seguridad:** Agregar roles para endpoints administrativos
3. **Paginación:** Implementar paginación en listados grandes
4. **Notificaciones:** Enviar emails de confirmación de compra
5. **Reportes:** Crear endpoints para reportes y estadísticas
6. **Devoluciones:** Implementar sistema de reembolsos

