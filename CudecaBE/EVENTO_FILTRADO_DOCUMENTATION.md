# 📋 Sistema de Filtrado de Eventos - Documentación

## ✅ Implementación Completada

Se ha implementado un **sistema de filtrado avanzado** para eventos que permite a los usuarios buscar y filtrar eventos según múltiples criterios.

---

## 🎯 Funcionalidades del Sistema de Filtrado

### **1. Filtros Disponibles**

#### **Por Fecha:**
- ✅ Fecha exacta
- ✅ Rango de fechas (desde - hasta)
- ✅ Mes y año específico
- ✅ Solo eventos futuros
- ✅ Solo eventos pasados

#### **Por Ubicación:**
- ✅ Búsqueda parcial por lugar (case-insensitive)

#### **Por Nombre:**
- ✅ Búsqueda parcial por nombre (case-insensitive)

#### **Por Recaudación:**
- ✅ Recaudación mínima
- ✅ Recaudación máxima
- ✅ Rango de recaudación

#### **Ordenamiento:**
- ✅ Por fecha (ASC/DESC)
- ✅ Por nombre (ASC/DESC)
- ✅ Por lugar (ASC/DESC)
- ✅ Por total recaudado (ASC/DESC)

---

## 🔌 Endpoints REST Disponibles

### **Base URL:** `/api/eventos`

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/api/eventos/futuros` | Eventos futuros ordenados por fecha | - |
| `GET` | `/api/eventos/pasados` | Eventos pasados ordenados por fecha desc | - |
| `GET` | `/api/eventos/lugar` | Filtrar por lugar | `?lugar={texto}` |
| `GET` | `/api/eventos/mes-anio` | Filtrar por mes y año | `?mes={1-12}&anio={año}` |
| `POST` | `/api/eventos/filtrar` | Filtrado avanzado con múltiples criterios | JSON Body |

---

## 📝 Ejemplos de Uso

### **1. Obtener Eventos Futuros**
```http
GET /api/eventos/futuros
```

**Respuesta:** Lista de eventos con fecha posterior a hoy, ordenados por fecha ascendente.

---

### **2. Obtener Eventos Pasados**
```http
GET /api/eventos/pasados
```

**Respuesta:** Lista de eventos con fecha anterior a hoy, ordenados por fecha descendente.

---

### **3. Filtrar por Lugar**
```http
GET /api/eventos/lugar?lugar=Málaga
```

**Respuesta:** Todos los eventos cuyo lugar contenga "Málaga" (case-insensitive).

---

### **4. Filtrar por Mes y Año**
```http
GET /api/eventos/mes-anio?mes=12&anio=2025
```

**Respuesta:** Todos los eventos de diciembre 2025.

---

### **5. Filtrado Avanzado (Combinado)**
```http
POST /api/eventos/filtrar
Content-Type: application/json

{
  "nombre": "Gala",
  "lugar": "Málaga",
  "fechaDesde": "2025-01-01",
  "fechaHasta": "2025-12-31",
  "recaudacionMinima": 1000.00,
  "ordenarPor": "fecha",
  "direccion": "ASC"
}
```

**Respuesta:** Eventos que:
- Contengan "Gala" en el nombre
- Se realicen en Málaga
- Sean entre enero y diciembre 2025
- Tengan recaudación mínima de 1000€
- Ordenados por fecha ascendente

---

## 🔍 Estructura del EventoFilterRequest

```java
{
  // Filtros de texto (búsqueda parcial)
  "nombre": "string",              // Opcional
  "lugar": "string",               // Opcional
  
  // Filtros de fecha
  "fecha": "2025-12-25",          // Fecha exacta (opcional)
  "fechaDesde": "2025-01-01",     // Desde (opcional)
  "fechaHasta": "2025-12-31",     // Hasta (opcional)
  "mes": 12,                      // Mes (1-12, opcional)
  "anio": 2025,                   // Año (opcional)
  
  // Filtros de recaudación
  "recaudacionMinima": 1000.00,   // Opcional
  "recaudacionMaxima": 50000.00,  // Opcional
  
  // Filtros especiales
  "soloFuturos": true,            // Solo eventos futuros (opcional)
  "soloPasados": false,           // Solo eventos pasados (opcional)
  
  // Ordenamiento
  "ordenarPor": "fecha",          // fecha, nombre, lugar, totalRecaudado (opcional)
  "direccion": "ASC"              // ASC o DESC (opcional)
}
```

---

## 💡 Casos de Uso Prácticos

### **Caso 1: Usuario busca eventos de Navidad en Málaga**
```json
POST /api/eventos/filtrar
{
  "nombre": "Navidad",
  "lugar": "Málaga",
  "soloFuturos": true
}
```

### **Caso 2: Usuario busca eventos del verano 2025**
```json
POST /api/eventos/filtrar
{
  "fechaDesde": "2025-06-21",
  "fechaHasta": "2025-09-22",
  "ordenarPor": "fecha",
  "direccion": "ASC"
}
```

### **Caso 3: Ver eventos más exitosos (mayor recaudación)**
```json
POST /api/eventos/filtrar
{
  "recaudacionMinima": 10000.00,
  "ordenarPor": "totalRecaudado",
  "direccion": "DESC"
}
```

### **Caso 4: Eventos de diciembre 2025**
```http
GET /api/eventos/mes-anio?mes=12&anio=2025
```

### **Caso 5: Próximos eventos en Marbella**
```json
POST /api/eventos/filtrar
{
  "lugar": "Marbella",
  "soloFuturos": true,
  "ordenarPor": "fecha",
  "direccion": "ASC"
}
```

---

## 🗄️ Datos de Prueba (Migración V5)

Se han agregado **15 eventos de ejemplo** en diferentes fechas y lugares:

### **Eventos Pasados (2024):**
1. Gala Benéfica Navideña 2024 - Hotel Málaga Palacio (15.000€)
2. Concierto Solidario de Verano - Auditorio Benalmádena (8.500€)
3. Carrera Solidaria 10K - Paseo Marítimo Marbella (12.000€)

### **Eventos Futuros (2025):**
1. Mercadillo Benéfico de Primavera - Málaga (Marzo)
2. Torneo de Pádel Solidario - Costa del Sol (Abril)
3. Cena de Gala Anual 2025 - Gran Hotel Miramar (Junio)
4. Festival de Música Benéfico - Málaga (Julio)
5. Ruta Ciclista por la Costa - Fuengirola-Nerja (Septiembre)
6. Conferencia Cuidados Paliativos - Hospital Málaga (Octubre)
7. Maratón de Teatro Solidario - Teatro Cervantes (Noviembre)
8. Gala Navideña 2025 - Palacio de Ferias (Diciembre)

### **Eventos Adicionales:**
- Jornada de Puertas Abiertas - Cudeca Benalmádena
- Subasta de Arte - Museo Picasso Málaga
- Torneo de Golf - La Cala Golf Resort
- Fiesta Ibicenca - Nikki Beach Marbella

---

## 🏗️ Arquitectura Técnica

### **Repository Layer:**
- Métodos JPA derivados: `findByLugarContainingIgnoreCase`, `findByFechaAfter`, etc.
- Query personalizada con `@Query` para filtros combinados
- Soporte para valores NULL en filtros opcionales

### **Service Layer:**
- Lógica de negocio para combinar filtros
- Ordenamiento dinámico con Comparators
- Manejo de casos especiales (futuros/pasados, mes-año)

### **Controller Layer:**
- Endpoints RESTful con diferentes estrategias de filtrado
- Soporte para query params y request body
- Validación de fechas con `@DateTimeFormat`

---

## 📊 Ventajas del Sistema

1. ✅ **Flexible** - Múltiples criterios combinables
2. ✅ **Eficiente** - Queries optimizadas en base de datos
3. ✅ **Intuitivo** - API clara y fácil de usar
4. ✅ **Extensible** - Fácil agregar nuevos filtros
5. ✅ **Performante** - Índices en campos de búsqueda
6. ✅ **Completo** - Cubre todos los casos de uso comunes

---

## 🚀 Estado del Sistema

```
✅ Filtrado por fecha (múltiples variantes)
✅ Filtrado por lugar
✅ Filtrado por nombre
✅ Filtrado por recaudación
✅ Ordenamiento dinámico
✅ 15 eventos de prueba insertados
✅ Endpoints REST implementados
✅ Compilación exitosa
✅ Listo para usar
```

---

## 📦 Archivos Creados/Modificados

### **Creados:**
1. ✅ `EventoFilterRequest.java` - DTO para filtros
2. ✅ `V5__insert_eventos_data.sql` - Migración con datos

### **Modificados:**
1. ✅ `EventoRepository.java` - Métodos de filtrado
2. ✅ `EventoService.java` - Interface con nuevos métodos
3. ✅ `EventoServiceImpl.java` - Implementación de filtros
4. ✅ `EventoController.java` - Endpoints de filtrado

---

**Proyecto:** CudecaBE  
**Fecha:** 2025-11-22  
**Estado:** ✅ Sistema de Filtrado de Eventos COMPLETADO

