-- Script de prueba para insertar compras de eventos de ejemplo
-- Ejecutar después de que la migración V24 se haya aplicado
-- NOTA: Ajusta los IDs según los usuarios y eventos existentes en tu base de datos

-- Verificar usuarios existentes
SELECT id_user, nombre, email FROM usuario LIMIT 5;

-- Verificar eventos existentes
SELECT id_evento, nombre, fecha, precio FROM evento LIMIT 5;

-- Ejemplo: Insertar compras de prueba
-- Reemplaza los IDs con los valores reales de tu base de datos

-- Usuario 1 compra Evento 1
INSERT INTO compra_evento (id_user, id_evento, cantidad_entradas, precio_total, estado)
VALUES (1, 1, 2, 50.00, 'COMPLETADO');

-- Usuario 1 compra Evento 2
INSERT INTO compra_evento (id_user, id_evento, cantidad_entradas, precio_total, estado)
VALUES (1, 2, 1, 25.00, 'COMPLETADO');

-- Usuario 2 compra Evento 1
INSERT INTO compra_evento (id_user, id_evento, cantidad_entradas, precio_total, estado)
VALUES (2, 1, 3, 75.00, 'COMPLETADO');

-- Usuario 2 compra Evento 3
INSERT INTO compra_evento (id_user, id_evento, cantidad_entradas, precio_total, estado)
VALUES (2, 3, 1, 30.00, 'COMPLETADO');

-- Compra en estado PENDIENTE
INSERT INTO compra_evento (id_user, id_evento, cantidad_entradas, precio_total, estado)
VALUES (3, 2, 2, 60.00, 'PENDIENTE');

-- Compra CANCELADA
INSERT INTO compra_evento (id_user, id_evento, cantidad_entradas, precio_total, estado)
VALUES (3, 1, 1, 25.00, 'CANCELADO');

-- Verificar las compras insertadas
SELECT
    ce.id_compra_evento,
    u.nombre AS usuario,
    u.email,
    e.nombre AS evento,
    ce.cantidad_entradas,
    ce.precio_total,
    ce.estado,
    ce.fecha_compra
FROM compra_evento ce
JOIN usuario u ON ce.id_user = u.id_user
JOIN evento e ON ce.id_evento = e.id_evento
ORDER BY ce.fecha_compra DESC;

-- Contar compras por usuario
SELECT
    u.nombre,
    u.email,
    COUNT(ce.id_compra_evento) AS total_compras,
    SUM(ce.precio_total) AS total_gastado
FROM usuario u
LEFT JOIN compra_evento ce ON u.id_user = ce.id_user
GROUP BY u.id_user, u.nombre, u.email
ORDER BY total_compras DESC;

-- Contar compradores por evento
SELECT
    e.nombre AS evento,
    e.fecha,
    COUNT(ce.id_compra_evento) AS total_compras,
    SUM(ce.cantidad_entradas) AS total_entradas_vendidas,
    SUM(ce.precio_total) AS total_recaudado
FROM evento e
LEFT JOIN compra_evento ce ON e.id_evento = ce.id_evento
GROUP BY e.id_evento, e.nombre, e.fecha
ORDER BY total_recaudado DESC;

-- Ver compras por estado
SELECT
    estado,
    COUNT(*) AS cantidad,
    SUM(precio_total) AS total
FROM compra_evento
GROUP BY estado;

