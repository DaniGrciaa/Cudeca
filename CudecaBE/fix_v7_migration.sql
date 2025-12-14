-- Script para limpiar la migración fallida V7
-- Ejecutar este script en pgAdmin o tu herramienta de PostgreSQL

-- 1. Eliminar el registro de la migración fallida
DELETE FROM flyway_schema_history WHERE version = '7';

-- 2. Verificar que se eliminó
SELECT * FROM flyway_schema_history ORDER BY installed_rank;
