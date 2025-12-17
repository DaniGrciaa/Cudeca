------------------------------------------------------------
-- V25__remove_metodo_pago_codigo_transaccion.sql
-- Eliminar columnas metodo_pago y codigo_transaccion de compra_evento
------------------------------------------------------------

-- Eliminar columnas que ya no se necesitan
ALTER TABLE compra_evento DROP COLUMN IF EXISTS metodo_pago;
ALTER TABLE compra_evento DROP COLUMN IF EXISTS codigo_transaccion;

