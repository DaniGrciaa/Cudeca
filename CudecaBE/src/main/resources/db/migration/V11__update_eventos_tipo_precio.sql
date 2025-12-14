-- Actualizar tipos y precios de los eventos existentes

-- TIPO: CENA - Eventos de gala y cenas (precio más alto)
UPDATE evento SET tipo = 'CENA', precio = 85.00 WHERE nombre = 'Gala Benéfica Navideña 2024' AND tipo IS NULL;
UPDATE evento SET tipo = 'CENA', precio = 90.00 WHERE nombre = 'Cena de Gala Anual 2025' AND tipo IS NULL;
UPDATE evento SET tipo = 'CENA', precio = 95.00 WHERE nombre = 'Gala Navideña 2025' AND tipo IS NULL;
UPDATE evento SET tipo = 'CENA', precio = 45.00 WHERE nombre = 'Fiesta Ibicenca Solidaria' AND tipo IS NULL;

-- TIPO: CONCIERTO - Conciertos y festivales
UPDATE evento SET tipo = 'CONCIERTO', precio = 25.00 WHERE nombre = 'Concierto Solidario de Verano' AND tipo IS NULL;
UPDATE evento SET tipo = 'CONCIERTO', precio = 35.00 WHERE nombre = 'Festival de Música Benéfico' AND tipo IS NULL;

-- TIPO: MARCHA - Carreras, rutas deportivas y eventos deportivos
UPDATE evento SET tipo = 'MARCHA', precio = 15.00 WHERE nombre = 'Carrera Solidaria 10K' AND tipo IS NULL;
UPDATE evento SET tipo = 'MARCHA', precio = 20.00 WHERE nombre = 'Ruta Ciclista por la Costa' AND tipo IS NULL;
UPDATE evento SET tipo = 'MARCHA', precio = 40.00 WHERE nombre = 'Torneo de Pádel Solidario' AND tipo IS NULL;
UPDATE evento SET tipo = 'MARCHA', precio = 75.00 WHERE nombre = 'Torneo de Golf Solidario' AND tipo IS NULL;

-- TIPO: RIFA - Eventos varios (teatro, mercadillo, conferencias, subastas, etc.)
UPDATE evento SET tipo = 'RIFA', precio = 18.00 WHERE nombre = 'Maratón de Teatro Solidario' AND tipo IS NULL;
UPDATE evento SET tipo = 'RIFA', precio = 30.00 WHERE nombre = 'Subasta de Arte Benéfica' AND tipo IS NULL;
UPDATE evento SET tipo = 'RIFA', precio = 0.00 WHERE nombre = 'Mercadillo Benéfico de Primavera' AND tipo IS NULL;
UPDATE evento SET tipo = 'RIFA', precio = 0.00 WHERE nombre = 'Jornada de Puertas Abiertas' AND tipo IS NULL;
UPDATE evento SET tipo = 'RIFA', precio = 0.00 WHERE nombre = 'Conferencia sobre Cuidados Paliativos' AND tipo IS NULL;

