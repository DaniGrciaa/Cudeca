# ✅ SISTEMA DE COMPRA DE EVENTOS - VERSIÓN FINAL SIMPLIFICADA

## 🎯 Cambios Aplicados

### ❌ Eliminado:
- ✅ Campo `metodoPago` (no necesario)
- ✅ Campo `codigoTransaccion` (no necesario)
- ✅ Múltiples endpoints confusos
- ✅ El frontend NO necesita saber el userId

### ✅ Implementado:
- ✅ **Un solo endpoint** para comprar eventos: `POST /api/compras-eventos`
- ✅ Recibe un **array de eventos** (puede ser 1 o muchos)
- ✅ El **userId se obtiene automáticamente del token JWT**
- ✅ Sistema de carrito simplificado

---

## 🚀 USO DESDE EL FRONTEND

### Ejemplo 1: Comprar UN solo evento

```javascript
const comprarUnEvento = async (eventoId, cantidad, precio) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:8080/api/compras-eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      eventos: [  // ← Array con UN solo evento
        {
          eventoId: eventoId,
          cantidadEntradas: cantidad,
          precioTotal: precio
        }
      ]
    })
  });
  
  return await response.json();
};

// Uso:
comprarUnEvento(1, 2, 50.00);
```

### Ejemplo 2: Comprar VARIOS eventos (carrito)

```javascript
const comprarCarrito = async (carrito) => {
  const token = localStorage.getItem('token');
  
  // carrito = [
  //   { eventoId: 1, cantidadEntradas: 2, precioTotal: 50.00 },
  //   { eventoId: 3, cantidadEntradas: 1, precioTotal: 25.00 },
  //   { eventoId: 5, cantidadEntradas: 3, precioTotal: 75.00 }
  // ]
  
  const response = await fetch('http://localhost:8080/api/compras-eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      eventos: carrito  // ← Array con VARIOS eventos
    })
  });
  
  return await response.json();
};

// Uso:
const miCarrito = [
  { eventoId: 1, cantidadEntradas: 2, precioTotal: 50.00 },
  { eventoId: 3, cantidadEntradas: 1, precioTotal: 25.00 }
];
comprarCarrito(miCarrito);
```

---

## 📦 REQUEST - Lo que envía el frontend

```json
{
  "eventos": [
    {
      "eventoId": 1,
      "cantidadEntradas": 2,
      "precioTotal": 50.00
    },
    {
      "eventoId": 3,
      "cantidadEntradas": 1,
      "precioTotal": 25.00
    }
  ]
}
```

**Nota:** El array `eventos` puede tener 1 elemento o muchos. **NO se envía el userId**.

---

## 📨 RESPONSE - Lo que devuelve el backend

```json
{
  "totalEventos": 2,
  "totalEntradas": 3,
  "precioTotal": 75.00,
  "mensaje": "Carrito procesado exitosamente. Se compraron 2 eventos.",
  "compras": [
    {
      "id": 1,
      "usuarioId": 5,
      "usuarioNombre": "Juan Pérez",
      "usuarioEmail": "juan@example.com",
      "evento": {
        "id": 1,
        "nombre": "Carrera Solidaria 5K",
        "fecha": "2026-06-15",
        "lugar": "Parque Central",
        "tipo": "DEPORTIVO",
        "precio": 25.00
      },
      "fechaCompra": "2025-12-17T10:30:00",
      "cantidadEntradas": 2,
      "precioTotal": 50.00,
      "estado": "COMPLETADO"
    },
    {
      "id": 2,
      "usuarioId": 5,
      "usuarioNombre": "Juan Pérez",
      "usuarioEmail": "juan@example.com",
      "evento": {
        "id": 3,
        "nombre": "Gala Benéfica",
        "fecha": "2026-07-20",
        "lugar": "Teatro Principal",
        "tipo": "CULTURAL",
        "precio": 25.00
      },
      "fechaCompra": "2025-12-17T10:30:01",
      "cantidadEntradas": 1,
      "precioTotal": 25.00,
      "estado": "COMPLETADO"
    }
  ]
}
```

---

## 🔐 Autenticación - Cómo se obtiene el usuario

```
1. Usuario hace login → Recibe token JWT
2. Token contiene el email del usuario
3. Frontend envía token en header: Authorization: Bearer {token}
4. Backend extrae email del token
5. Backend busca usuario en BD por email
6. Backend usa el ID del usuario encontrado
7. Se crean las compras asociadas a ese usuario
```

**✅ El frontend NUNCA necesita saber o enviar el userId**

---

## 🏗️ Estructura de Datos

### CarritoCompraRequest.java
```java
{
  "eventos": [
    {
      "eventoId": Integer,
      "cantidadEntradas": Integer,
      "precioTotal": BigDecimal
    }
  ]
}
```

### CarritoCompraResponse.java
```java
{
  "totalEventos": Integer,
  "totalEntradas": Integer,
  "precioTotal": BigDecimal,
  "compras": List<CompraEventoResponse>,
  "mensaje": String
}
```

---

## 📋 Endpoints Disponibles

### Comprar Eventos (Principal)
```
POST /api/compras-eventos
Headers: Authorization: Bearer {token}
Body: { "eventos": [ {...}, {...} ] }
```

### Obtener Mis Eventos Comprados
```
GET /api/compras-eventos/mis-eventos
Headers: Authorization: Bearer {token}
```

### Verificar si Ya Compré un Evento
```
GET /api/compras-eventos/verificar/evento/{eventoId}
Headers: Authorization: Bearer {token}
```

### Contar Mis Eventos
```
GET /api/compras-eventos/mis-eventos/count
Headers: Authorization: Bearer {token}
```

### Cancelar una Compra
```
POST /api/compras-eventos/{compraId}/cancelar
Headers: Authorization: Bearer {token}
```

---

## 🎨 Ejemplo Completo React

```jsx
import { useState } from 'react';

function CompraEventos() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (evento, cantidad) => {
    setCarrito([...carrito, {
      eventoId: evento.id,
      cantidadEntradas: cantidad,
      precioTotal: evento.precio * cantidad
    }]);
  };

  const procesarCompra = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:8080/api/compras-eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventos: carrito })
      });
      
      const resultado = await response.json();
      
      alert(`✅ ${resultado.mensaje}`);
      alert(`Total pagado: €${resultado.precioTotal}`);
      
      setCarrito([]); // Vaciar carrito
    } catch (error) {
      alert('❌ Error al procesar la compra');
    }
  };

  return (
    <div>
      <h2>Carrito ({carrito.length} eventos)</h2>
      <button onClick={procesarCompra}>
        Comprar Todo (€{carrito.reduce((sum, item) => sum + item.precioTotal, 0)})
      </button>
    </div>
  );
}
```

---

## 🗄️ Base de Datos

### Tabla: compra_evento
```sql
CREATE TABLE compra_evento (
    id_compra_evento    SERIAL PRIMARY KEY,
    id_user             INT NOT NULL,         -- Se obtiene del token
    id_evento           INT NOT NULL,         -- Enviado por el frontend
    fecha_compra        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad_entradas   INT NOT NULL,         -- Enviado por el frontend
    precio_total        DECIMAL(10,2) NOT NULL, -- Enviado por el frontend
    estado              VARCHAR(20) DEFAULT 'COMPLETADO'
);
```

---

## ✅ Ventajas de este Diseño

1. **Simple:** Un solo endpoint para todo
2. **Flexible:** Compra 1 o muchos eventos con el mismo endpoint
3. **Seguro:** El usuario no puede falsificar el userId
4. **Escalable:** Fácil de mantener y extender
5. **Intuitivo:** El frontend solo piensa en "eventos a comprar"

---

## 🚀 Para Arrancar

```bash
cd C:\Users\Dani\Documents\Cudeca\CudecaBE
mvn spring-boot:run
```

**¡Listo! Sistema completamente funcional y simplificado.** 🎉

