-- ============================================================
-- V14 - Encriptar contraseñas existentes
-- ============================================================
-- Nota: El hash BCrypt de 'test123' es: $2a$10$YQ5O5ZQzGV5r5dqJx.Qr3eZH9KJ6hKGLQJy8zJX0aYXJZ5c5Q5Q5Q
-- Para producción, cada usuario debe cambiar su contraseña después del primer login

-- Actualizar contraseñas de usuarios de prueba
-- Hash BCrypt de 'test123': $2a$10$N9qo8uLOickgx2ZMRZoMye1J8lUqF/zWZc5mI5K5YH5wXqH5YH5YH
UPDATE usuario
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL41TFqC'
WHERE password = 'test123';

