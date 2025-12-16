-- =========================================================
-- V22__drop_unused_tables.sql
-- Eliminar tablas no utilizadas: Factura, Rifa, Entrada, Compra
-- =========================================================

-- Eliminar tabla FACTURA (depende de COMPRA)
DROP TABLE IF EXISTS factura CASCADE;

-- Eliminar tabla RIFA (depende de COMPRA)
DROP TABLE IF EXISTS rifa CASCADE;

-- Eliminar tabla ENTRADA (depende de COMPRA y EVENTO)
DROP TABLE IF EXISTS entrada CASCADE;

-- Eliminar tabla COMPRA (depende de USUARIO)
DROP TABLE IF EXISTS compra CASCADE;

