-- ============================================================
-- V3 - Datos de prueba iniciales
-- ============================================================

-- USUARIOS ----------------------------------------------------
INSERT INTO usuario (id_user, nombre, email, telefono, password, username)
VALUES
    (1, 'Bernardo', 'bernardo@example.com', '600111222', 'test123', 'bernardo'),
    (2, 'Ana Torres', 'ana@example.com', '611222333', 'test123', 'ana.torres'),
    (3, 'Carlos Ruiz', 'carlos@example.com', '622333444', 'test123', 'carlos.ruiz');

-- EVENTOS -----------------------------------------------------
INSERT INTO evento (id_evento, nombre, fecha, descripcion, lugar, total_recaudado)
VALUES
    (1, 'Gala Benéfica CUDECA', '2025-12-18', 'Evento solidario anual', 'Auditorio Municipal', 0),
    (2, 'Concierto Solidario', '2025-10-05', 'Actuación de varios artistas', 'Palacio de Congresos', 0);

-- PATROCINADORES ---------------------------------------------
INSERT INTO patrocinador (id_patrocinador, nombre, cantidad_aportada, tipo_aportacion, id_evento)
VALUES
    (1, 'Fundación Vida', 1500.00, 'Económica', 1),
    (2, 'Café Aroma', 500.00, 'Material', 1),
    (3, 'EnergyCo', 2000.00, 'Económica', 2);

-- ENTRADAS ----------------------------------------------------
-- Evento 1
INSERT INTO entrada (id_entrada, tipo, precio, cantidad_disponible, id_evento, id_compra, id_user)
VALUES
    (1, 'G', 15.00, 100, 1, NULL, NULL),
    (2, 'P', 30.00, 50, 1, NULL, NULL),
    (3, 'V', 50.00, 10, 1, NULL, NULL),

-- Evento 2
    (4, 'G', 20.00, 150, 2, NULL, NULL),
    (5, 'P', 40.00, 80, 2, NULL, NULL);


-- COMPRAS -----------------------------------------------------
INSERT INTO compra (id_compra, fecha_compra, importe_total, metodo_pago, estado_pago, tipo_operacion,
                    codigo_transaccion, cantidad_elementos, es_devolucion, id_compra_original, id_user)
VALUES
    (1, '2025-11-01', 30.00, 'TARJETA', TRUE, 'COMPRA', 'TXN001', 2, FALSE, NULL, 1),
    (2, '2025-11-02', 50.00, 'PAYPAL', TRUE, 'COMPRA', 'TXN002', 1, FALSE, NULL, 2),
    (3, '2025-11-03', 30.00, 'TARJETA', FALSE, 'DEVOLUCION', 'TXN003', 1, TRUE, 1, 1);

-- ASIGNAR ENTRADAS A COMPRAS ---------------------------------
UPDATE entrada SET id_compra = 1, id_user = 1 WHERE id_entrada IN (1, 2);  -- Dos entradas compradas por Bernardo
UPDATE entrada SET id_compra = 2, id_user = 2 WHERE id_entrada = 4;       -- Entrada comprada por Ana

-- FACTURAS ----------------------------------------------------
INSERT INTO factura (id_factura, fecha_emision, importe, IVA, datos_usuario, id_compra)
VALUES
    (1, '2025-11-01', 30.00, 6.30, 'Bernardo, bernardo@example.com', 1),
    (2, '2025-11-02', 50.00, 10.50, 'Ana Torres, ana@example.com', 2);

-- RIFAS -------------------------------------------------------
INSERT INTO rifa (id_rifa, precio, cantidad, fecha, id_compra)
VALUES
    (1, 5.00, 2, '2025-11-01', 1),
    (2, 5.00, 1, '2025-11-02', 2);
