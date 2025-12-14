-- Añadir columnas tipo y precio a la tabla evento

-- Añadir columna tipo (si no existe)
ALTER TABLE evento ADD COLUMN IF NOT EXISTS tipo VARCHAR(20);

-- Añadir comentario a la columna tipo
COMMENT ON COLUMN evento.tipo IS 'Tipo de evento: CENA, CONCIERTO, MARCHA, RIFA';

-- Añadir columna precio (si no existe)
ALTER TABLE evento ADD COLUMN IF NOT EXISTS precio NUMERIC(10, 2) DEFAULT 0;

-- Añadir comentario a la columna precio
COMMENT ON COLUMN evento.precio IS 'Precio del evento';

