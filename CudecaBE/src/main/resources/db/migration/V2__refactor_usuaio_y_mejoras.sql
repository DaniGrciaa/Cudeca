------------------------------------------------------------
-- V2__refactor_usuario_y_mejoras.sql
-- Mejoras tras V1 ejecutado (PostgreSQL)
------------------------------------------------------------

-------------------------------
-- 1. Añadir USERNAME a USUARIO
-------------------------------
ALTER TABLE usuario
    ADD COLUMN username VARCHAR(100) UNIQUE;

-- Asignar username temporal si ya existen usuarios (evita errores NOT NULL)
UPDATE usuario
SET username = CONCAT('user_', id_user)
WHERE username IS NULL;

-- Hacerlo NOT NULL tras rellenarlo
ALTER TABLE usuario
    ALTER COLUMN username SET NOT NULL;

------------------------------------------
-- 2. Añadir CHECK para el campo "rol"
------------------------------------------
ALTER TABLE usuario
    ADD CONSTRAINT chk_usuario_rol
        CHECK (rol IN ('ADMIN', 'USER', 'ORGANIZADOR', 'PATROCINADOR'));

------------------------------------------
-- 3. CHECK para tipo_operacion en COMPRA
------------------------------------------
ALTER TABLE compra
    ADD CONSTRAINT chk_compra_tipo_operacion
        CHECK (tipo_operacion IN ('COMPRA', 'DONACION', 'DEVOLUCION'));

---------------------------------------------------
-- 4. Índices recomendados (mejora rendimiento)
---------------------------------------------------

-- Búsqueda rápida por email
CREATE INDEX idx_usuario_email ON usuario(email);

-- Búsqueda rápida por id_user en compra
CREATE INDEX idx_compra_user ON compra(id_user);

-- Búsqueda rápida por id_evento en entrada
CREATE INDEX idx_entrada_evento ON entrada(id_evento);

-- Búsqueda rápida por id_compra en entrada
CREATE INDEX idx_entrada_compra ON entrada(id_compra);

-- Búsqueda rápida por id_compra en factura
CREATE INDEX idx_factura_compra ON factura(id_compra);

-- Búsqueda rápida por id_evento en patrocinador
CREATE INDEX idx_patrocinador_evento ON patrocinador(id_evento);

-- Búsqueda rápida por id_compra en rifa
CREATE INDEX idx_rifa_compra ON rifa(id_compra);

-----------------------------------------------------
-- 5. (Opcional pero recomendado) Fechas auto por defecto
-----------------------------------------------------

ALTER TABLE compra
    ALTER COLUMN fecha_compra SET DEFAULT CURRENT_DATE;

ALTER TABLE factura
    ALTER COLUMN fecha_emision SET DEFAULT CURRENT_DATE;

ALTER TABLE evento
    ALTER COLUMN fecha SET DEFAULT CURRENT_DATE;

-----------------------------------------------------
-- FIN DE MIGRACIÓN V2
-----------------------------------------------------
