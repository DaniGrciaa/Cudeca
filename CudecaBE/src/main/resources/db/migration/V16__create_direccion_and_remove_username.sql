-- V16: Crear tabla direccion y eliminar campos username y direccion de usuario

-- 1. Crear tabla direccion
CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    calle VARCHAR(200),
    numero VARCHAR(50),
    piso VARCHAR(10),
    puerta VARCHAR(10),
    codigo_postal VARCHAR(10),
    ciudad VARCHAR(100),
    provincia VARCHAR(100),
    pais VARCHAR(100),
    CONSTRAINT fk_direccion_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_user) ON DELETE CASCADE
);

-- 2. Crear índice para mejorar consultas
CREATE INDEX idx_direccion_usuario ON direccion(id_usuario);

-- 3. Eliminar columna direccion de usuario (campo antiguo)
ALTER TABLE usuario DROP COLUMN IF EXISTS direccion;

-- 4. Eliminar columna username de usuario
ALTER TABLE usuario DROP COLUMN IF EXISTS username;

-- 5. Comentarios para documentación
COMMENT ON TABLE direccion IS 'Tabla que almacena las direcciones de los usuarios';
COMMENT ON COLUMN direccion.id_direccion IS 'Identificador único de la dirección';
COMMENT ON COLUMN direccion.id_usuario IS 'Referencia al usuario propietario de la dirección';
COMMENT ON COLUMN direccion.calle IS 'Nombre de la calle';
COMMENT ON COLUMN direccion.numero IS 'Número de portal';
COMMENT ON COLUMN direccion.piso IS 'Número de piso';
COMMENT ON COLUMN direccion.puerta IS 'Letra o número de puerta';
COMMENT ON COLUMN direccion.codigo_postal IS 'Código postal';
COMMENT ON COLUMN direccion.ciudad IS 'Ciudad';
COMMENT ON COLUMN direccion.provincia IS 'Provincia';
COMMENT ON COLUMN direccion.pais IS 'País';

