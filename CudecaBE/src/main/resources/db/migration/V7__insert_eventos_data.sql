-- Insertar eventos de prueba para Cudeca

-- Limpiar eventos existentes primero (opcional, comentar si quieres mantener datos)
TRUNCATE TABLE evento RESTART IDENTITY CASCADE;

-- Eventos pasados (con recaudación)
INSERT INTO evento (nombre, fecha, descripcion, lugar, total_recaudado) VALUES
('Gala Benéfica Navideña 2024', '2024-12-15', 'Gala de Navidad para recaudar fondos con cena, música en vivo y subasta benéfica', 'Hotel Málaga Palacio', 15000.00),
('Concierto Solidario de Verano', '2024-07-20', 'Concierto al aire libre con artistas locales en apoyo a Cudeca', 'Auditorio Municipal de Benalmádena', 8500.00),
('Carrera Solidaria 10K', '2024-05-12', 'Carrera popular de 10 kilómetros con inscripción solidaria', 'Paseo Marítimo de Marbella', 12000.00);

-- Eventos próximos
INSERT INTO evento (nombre, fecha, descripcion, lugar, total_recaudado) VALUES
('Mercadillo Benéfico de Primavera', '2025-03-15', 'Mercadillo con productos artesanales, libros, ropa y objetos donados', 'Plaza de la Constitución, Málaga', 0.00),
('Torneo de Pádel Solidario', '2025-04-10', 'Torneo de pádel por equipos con inscripción a favor de Cudeca', 'Club de Pádel Costa del Sol', 0.00),
('Cena de Gala Anual 2025', '2025-06-22', 'Cena de gala anual con actuaciones, premios y reconocimientos a colaboradores', 'Gran Hotel Miramar', 0.00),
('Festival de Música Benéfico', '2025-07-15', 'Festival de música con bandas locales e internacionales', 'Recinto Ferial de Málaga', 0.00),
('Ruta Ciclista por la Costa', '2025-09-08', 'Ruta ciclista de 50km por la costa con salida en Fuengirola', 'Fuengirola - Nerja', 0.00),
('Conferencia sobre Cuidados Paliativos', '2025-10-05', 'Jornada formativa sobre cuidados paliativos para profesionales sanitarios', 'Hospital Regional de Málaga', 0.00),
('Maratón de Teatro Solidario', '2025-11-12', 'Maratón de representaciones teatrales benéficas durante todo el día', 'Teatro Cervantes, Málaga', 0.00),
('Gala Navideña 2025', '2025-12-18', 'Tradicional gala de Navidad con cena, sorteos y actuaciones especiales', 'Palacio de Ferias y Congresos', 0.00);

-- Eventos en diferentes ciudades
INSERT INTO evento (nombre, fecha, descripcion, lugar, total_recaudado) VALUES
('Jornada de Puertas Abiertas', '2025-02-20', 'Visita guiada a las instalaciones de Cudeca y charlas informativas', 'Cudeca Hospice, Benalmádena', 0.00),
('Subasta de Arte Benéfica', '2025-05-18', 'Subasta de obras de arte donadas por artistas locales', 'Museo Picasso Málaga', 0.00),
('Torneo de Golf Solidario', '2025-06-05', 'Torneo de golf benéfico con premios para los ganadores', 'La Cala Golf Resort, Mijas', 0.00),
('Fiesta Ibicenca Solidaria', '2025-08-10', 'Fiesta temática con música, bebidas y comida típica', 'Beach Club Nikki Beach, Marbella', 0.00);
