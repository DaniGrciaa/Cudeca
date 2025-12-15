-- Refactorizar categorías de tipo de evento para mayor flexibilidad
-- Cambio de: CENA, CONCIERTO, MARCHA, RIFA
-- A: GASTRONOMICO, CULTURAL, DEPORTIVO, SORTEO, TALLER, MERCADILLO, OTROS

-- Mapeo de categorías antiguas a nuevas:
-- CENA -> GASTRONOMICO
UPDATE evento SET tipo = 'GASTRONOMICO' WHERE tipo = 'CENA';

-- CONCIERTO -> CULTURAL
UPDATE evento SET tipo = 'CULTURAL' WHERE tipo = 'CONCIERTO';

-- MARCHA -> DEPORTIVO (incluye carreras, ciclismo, torneos)
UPDATE evento SET tipo = 'DEPORTIVO' WHERE tipo = 'MARCHA';

-- RIFA -> Para rifas, sorteos; otros eventos van a OTROS
-- Primero identificamos rifas específicas (si las hay) y dejamos el resto como OTROS
UPDATE evento SET tipo = 'OTROS' WHERE tipo = 'RIFA';

-- Actualizar el comentario de la columna tipo con las nuevas categorías
COMMENT ON COLUMN evento.tipo IS 'Tipo de evento: GASTRONOMICO, CULTURAL, DEPORTIVO, SORTEO, TALLER, MERCADILLO, OTROS';

