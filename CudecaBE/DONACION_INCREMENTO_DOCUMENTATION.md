# Documentación - Incremento de Donaciones

## Descripción

Se ha implementado un nuevo endpoint para **incrementar** la cantidad donada de un usuario de forma automática, sumando la nueva donación al total acumulado.

## Endpoint

### PATCH `/api/usuarios/{id}/donar`

**Incrementa la cantidad donada de un usuario** sumando el monto al total existente.

## Parámetros

- **Path Parameter:**
  - `id` (Integer): ID del usuario que realiza la donación

- **Query Parameter:**
  - `cantidad` (BigDecimal): Cantidad a donar (debe ser mayor a 0)

## Comportamiento

### ✅ Suma Automática

Si un usuario tiene **5 euros donados** y realiza una nueva donación de **10 euros**, el sistema:
1. Lee el valor actual: 5.00
2. Suma la nueva cantidad: 5.00 + 10.00
3. Guarda el nuevo total: **15.00 euros**

### ✅ Validaciones

- La cantidad debe ser mayor a 0
- El usuario debe existir
- Si el usuario no tiene donaciones previas, se considera 0.00

## Ejemplos de Uso

### Ejemplo 1: Primera donación

**Request:**
```http
PATCH /api/usuarios/1/donar?cantidad=25.50
```

**Antes:** cantidadDonada = 0.00  
**Después:** cantidadDonada = 25.50

**Response:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "123456789",
  "rol": "USER",
  "cantidadDonada": 25.50,
  "direcciones": []
}
```

### Ejemplo 2: Donación adicional

**Request:**
```http
PATCH /api/usuarios/1/donar?cantidad=10.00
```

**Antes:** cantidadDonada = 25.50  
**Después:** cantidadDonada = 35.50

**Response:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "123456789",
  "rol": "USER",
  "cantidadDonada": 35.50,
  "direcciones": []
}
```

### Ejemplo 3: Error - Cantidad inválida

**Request:**
```http
PATCH /api/usuarios/1/donar?cantidad=0
```

**Response (Error):**
```json
{
  "error": "La cantidad a donar debe ser mayor a cero"
}
```

### Ejemplo 4: Error - Usuario no encontrado

**Request:**
```http
PATCH /api/usuarios/999/donar?cantidad=10.00
```

**Response (Error):**
```json
{
  "error": "Usuario no encontrado con id: 999"
}
```

## Comparación: PUT vs PATCH

### PUT `/api/usuarios/{id}` - Reemplaza el valor

```http
PUT /api/usuarios/1
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "cantidadDonada": 100.00
}
```
- **Antes:** 50.00
- **Después:** 100.00 (reemplaza completamente)

### PATCH `/api/usuarios/{id}/donar` - Suma al valor existente

```http
PATCH /api/usuarios/1/donar?cantidad=100.00
```
- **Antes:** 50.00
- **Después:** 150.00 (suma 50 + 100)

## Casos de Uso

### Flujo de Compra de Entrada/Producto
```java
// Cuando un usuario compra una entrada de 25 euros
PATCH /api/usuarios/123/donar?cantidad=25.00

// El sistema automáticamente suma al total
```

### Flujo de Donación Directa
```java
// Cuando un usuario hace una donación de 50 euros
PATCH /api/usuarios/123/donar?cantidad=50.00

// Se suma a sus donaciones anteriores
```

## Integración con Frontend

### JavaScript/Fetch
```javascript
async function registrarDonacion(usuarioId, cantidad) {
  const response = await fetch(
    `/api/usuarios/${usuarioId}/donar?cantidad=${cantidad}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Error al registrar la donación');
  }
  
  return await response.json();
}

// Uso
const usuario = await registrarDonacion(1, 25.50);
console.log(`Total donado: ${usuario.cantidadDonada}`);
```

### cURL
```bash
curl -X PATCH "http://localhost:8080/api/usuarios/1/donar?cantidad=25.50" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Notas Técnicas

- **Transaccional:** El método es transaccional, garantiza consistencia
- **Tipo de dato:** BigDecimal para precisión en cálculos monetarios
- **Thread-safe:** Spring gestiona la concurrencia automáticamente
- **Auditable:** Se puede extender para registrar historial de donaciones

## Recomendaciones

1. **Usar PATCH para donaciones:** Siempre que se registre una nueva donación/compra
2. **Usar PUT para correcciones:** Solo si necesitas corregir manualmente el total
3. **Validar en el frontend:** Verificar que la cantidad sea válida antes de enviar
4. **Registrar historial:** Considerar crear una tabla de historial de donaciones para auditoría

## Seguridad

- El endpoint requiere autenticación (según configuración de seguridad)
- Validar permisos: solo el usuario o un admin debería poder modificar donaciones
- Considerar añadir validación de monto máximo por seguridad

