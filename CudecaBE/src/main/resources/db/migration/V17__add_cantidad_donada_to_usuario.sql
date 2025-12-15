-- Añadir columna cantidad_donada a la tabla usuario
ALTER TABLE usuario
ADD COLUMN cantidad_donada DECIMAL(10, 2) DEFAULT 0.00;

-- Actualizar los usuarios existentes con valor por defecto 0.00
UPDATE usuario SET cantidad_donada = 0.00 WHERE cantidad_donada IS NULL;

-- Hacer la columna NOT NULL después de actualizar los valores existentes
ALTER TABLE usuario
ALTER COLUMN cantidad_donada SET NOT NULL;

