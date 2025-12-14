-- Script para crear usuario de prueba con contraseña encriptada
-- Contraseña: admin123
-- Hash BCrypt de "admin123": $2a$10$xvYT.z6u7QFPy0aP0VJXYOkQVXm6wP.O7yGxB7qKm3J0FH0UqF5Ry

-- Insertar usuario admin de prueba
INSERT INTO usuario (username, nombre, email, telefono, password, rol)
VALUES (
    'admin',
    'Administrador',
    'admin@cudeca.org',
    '666123456',
    '$2a$10$xvYT.z6u7QFPy0aP0VJXYOkQVXm6wP.O7yGxB7qKm3J0FH0UqF5Ry',
    'ADMIN'
)
ON CONFLICT (email) DO NOTHING;

-- Insertar usuario normal de prueba
-- Contraseña: user123
-- Hash BCrypt de "user123": $2a$10$1Qx.K8JZ7.YC8X2fVQKY9eUJZxqH3X3N2F.XoK5M8L.9QR7S8T9Ua

INSERT INTO usuario (username, nombre, email, telefono, password, rol)
VALUES (
    'usuario1',
    'Usuario Prueba',
    'usuario@cudeca.org',
    '666654321',
    '$2a$10$1Qx.K8JZ7.YC8X2fVQKY9eUJZxqH3X3N2F.XoK5M8L.9QR7S8T9Ua',
    'USER'
)
ON CONFLICT (email) DO NOTHING;

-- Verificar los usuarios insertados
SELECT id_user, username, nombre, email, rol
FROM usuario
WHERE username IN ('admin', 'usuario1');

