-- Actualizacion de fechas de eventos para 2026
UPDATE evento SET fecha = '2026-02-20' WHERE nombre = 'Jornada de Puertas Abiertas';
UPDATE evento SET fecha = '2026-03-15' WHERE nombre = 'Mercadillo Benéfico de Primavera';
UPDATE evento SET fecha = '2026-04-10' WHERE nombre = 'Torneo de Pádel Solidario';
UPDATE evento SET fecha = '2026-05-18' WHERE nombre = 'Subasta de Arte Benéfica';
UPDATE evento SET fecha = '2026-06-05' WHERE nombre = 'Torneo de Golf Solidario';
UPDATE evento SET fecha = '2026-06-22' WHERE nombre = 'Cena de Gala Anual 2025';
UPDATE evento SET fecha = '2026-07-15' WHERE nombre = 'Festival de Música Benéfico';
UPDATE evento SET fecha = '2026-08-10' WHERE nombre = 'Fiesta Ibicenca Solidaria';
UPDATE evento SET fecha = '2026-09-08' WHERE nombre = 'Ruta Ciclista por la Costa';
UPDATE evento SET fecha = '2026-10-05' WHERE nombre = 'Conferencia sobre Cuidados Paliativos';
UPDATE evento SET fecha = '2026-11-12' WHERE nombre = 'Maratón de Teatro Solidario';
DELETE FROM evento WHERE nombre = 'Gala Navideña 2025';
DELETE FROM evento WHERE nombre = 'Gala Benéfica Navideña 2024';
DELETE FROM evento WHERE nombre = 'Carrera Solidaria 10k';
DELETE FROM evento WHERE nombre = 'Concierto Solidario de Verano';
