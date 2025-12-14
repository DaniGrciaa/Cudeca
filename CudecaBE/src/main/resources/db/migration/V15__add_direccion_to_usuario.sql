-- ============================================================
-- V15 - Agregar campo dirección al usuario
-- ============================================================

ALTER TABLE usuario
ADD COLUMN direccion VARCHAR(255);

