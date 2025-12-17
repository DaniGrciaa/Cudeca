# 🚀 Quick Start - Sistema de Compra de Eventos

## ✅ Archivos Creados

### Base de Datos
- ✅ `V24__create_compra_evento_relation.sql` - Migración Flyway

### Modelos
- ✅ `CompraEvento.java` - Entidad principal
- ✅ `Usuario.java` - Actualizado con relación
- ✅ `Evento.java` - Actualizado con relación

### Repository
- ✅ `CompraEventoRepository.java` - Repositorio JPA con queries personalizadas

### DTOs
- ✅ `CompraEventoRequest.java` - DTO para crear compras
- ✅ `CompraEventoResponse.java` - DTO de respuesta completa
- ✅ `EventoCompradoDTO.java` - DTO simplificado para frontend

### Mapper
- ✅ `CompraEventoMapper.java` - Conversiones entre entidades y DTOs

### Service
- ✅ `CompraEventoService.java` - Interface del servicio
- ✅ `CompraEventoServiceImpl.java` - Implementación completa

### Controller
- ✅ `CompraEventoController.java` - REST API completa

## 🔧 Pasos para Probar

### 1. Arrancar la Aplicación
```bash
# Si tienes Maven instalado:
mvn spring-boot:run

# O ejecuta directamente el JAR si ya está compilado:
java -jar target/CudecaBE-0.0.1-SNAPSHOT.jar
```

La migración Flyway V24 se ejecutará automáticamente y creará la tabla `compra_evento`.

### 2. Endpoints Principales

#### 🛒 Comprar un Evento (Usuario Autenticado)
```http
POST http://localhost:8080/api/compras-eventos
Authorization: Bearer {tu_token_jwt}
Content-Type: application/json

{
  "eventoId": 1,
  "cantidadEntradas": 2,
  "precioTotal": 50.00,
  "metodoPago": "TARJETA",
  "codigoTransaccion": "TXN123456789"
}
```

#### 📋 Ver Mis Eventos Comprados
```http
GET http://localhost:8080/api/compras-eventos/mis-eventos
Authorization: Bearer {tu_token_jwt}
```

Respuesta:
```json
[
  {
    "compraId": 1,
    "eventoId": 1,
    "eventoNombre": "Carrera Solidaria 5K",
    "eventoDescripcion": "Carrera benéfica...",
    "eventoLugar": "Parque Central",
    "eventoFecha": "2026-06-15",
    "eventoTipo": "DEPORTIVO",
    "fechaCompra": "2025-12-17T10:30:00",
    "cantidadEntradas": 2,
    "precioTotal": 50.00,
    "metodoPago": "TARJETA",
    "estado": "COMPLETADO",
    "codigoTransaccion": "TXN123456789"
  }
]
```

#### ✅ Verificar si Ya Compré un Evento
```http
GET http://localhost:8080/api/compras-eventos/verificar/evento/1
Authorization: Bearer {tu_token_jwt}
```

Respuesta:
```json
{
  "yaCompro": true
}
```

#### 📊 Total de Eventos Comprados
```http
GET http://localhost:8080/api/compras-eventos/mis-eventos/count
Authorization: Bearer {tu_token_jwt}
```

Respuesta:
```json
{
  "totalEventosComprados": 5
}
```

#### ❌ Cancelar una Compra
```http
POST http://localhost:8080/api/compras-eventos/1/cancelar
Authorization: Bearer {tu_token_jwt}
```

## 🔐 Autenticación

Todos los endpoints requieren autenticación JWT. Para obtener un token:

```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "tu_password"
}
```

## 📱 Ejemplo de Integración Frontend

### React/JavaScript
```javascript
// Obtener eventos comprados
const getMisEventos = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/compras-eventos/mis-eventos', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const eventos = await response.json();
  return eventos;
};

// Comprar un evento
const comprarEvento = async (eventoId, cantidad, precio) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/compras-eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      eventoId: eventoId,
      cantidadEntradas: cantidad,
      precioTotal: precio,
      metodoPago: 'TARJETA',
      codigoTransaccion: 'TXN' + Date.now()
    })
  });
  const compra = await response.json();
  return compra;
};
```

## 🎨 Ejemplo de UI

### Mostrar Eventos Comprados
```jsx
function MisEventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    getMisEventos().then(setEventos);
  }, []);

  return (
    <div>
      <h2>Mis Eventos Comprados</h2>
      {eventos.map(evento => (
        <div key={evento.compraId}>
          <h3>{evento.eventoNombre}</h3>
          <p>📅 {evento.eventoFecha}</p>
          <p>📍 {evento.eventoLugar}</p>
          <p>🎫 Entradas: {evento.cantidadEntradas}</p>
          <p>💰 Total: €{evento.precioTotal}</p>
          <p>✅ Estado: {evento.estado}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🧪 Pruebas con Postman

### Colección de Endpoints

1. **Login**
   - POST `/api/auth/login`
   - Guarda el token en variable de entorno

2. **Comprar Evento**
   - POST `/api/compras-eventos`
   - Headers: `Authorization: Bearer {{token}}`

3. **Mis Eventos**
   - GET `/api/compras-eventos/mis-eventos`
   - Headers: `Authorization: Bearer {{token}}`

4. **Verificar Compra**
   - GET `/api/compras-eventos/verificar/evento/1`
   - Headers: `Authorization: Bearer {{token}}`

## ⚠️ Estados de Compra

- **COMPLETADO**: Pago exitoso, evento adquirido
- **PENDIENTE**: Pago en proceso de verificación
- **CANCELADO**: Compra cancelada o reembolsada

## 📊 Endpoints para Administradores

### Ver Compradores de un Evento
```http
GET http://localhost:8080/api/compras-eventos/evento/1
Authorization: Bearer {admin_token}
```

### Total de Compradores de un Evento
```http
GET http://localhost:8080/api/compras-eventos/evento/1/count
Authorization: Bearer {admin_token}
```

### Compras de un Usuario Específico
```http
GET http://localhost:8080/api/compras-eventos/usuario/5
Authorization: Bearer {admin_token}
```

## 📝 Notas Importantes

1. **Flyway** ejecutará automáticamente la migración al arrancar
2. **No necesitas** crear manualmente las tablas
3. **Índices** están optimizados para consultas frecuentes
4. **Cascada** en borrado: si eliminas un usuario o evento, se borran sus compras
5. **Validaciones** automáticas en cantidad y precio

## 🐛 Troubleshooting

### Error: "Usuario no autenticado"
- Verifica que el token JWT sea válido
- Asegúrate de incluir el header `Authorization: Bearer {token}`

### Error: "Usuario no encontrado"
- El email del token debe existir en la base de datos

### Error: "Evento no encontrado"
- Verifica que el `eventoId` existe en la tabla `evento`

### Error: "Estado no válido"
- Los estados permitidos son: COMPLETADO, PENDIENTE, CANCELADO

## 📚 Documentación Completa

Para más detalles, consulta: `SISTEMA_COMPRA_EVENTOS_DOCUMENTATION.md`

