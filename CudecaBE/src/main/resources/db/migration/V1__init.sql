------------------------------------------------------------
-- V1__init.sql
-- Creación de tablas según tu modelo Entidad–Relación
------------------------------------------------------------

-- =========================================================
-- 1. TABLA USUARIO
-- =========================================================
CREATE TABLE usuario (
                         id_user          SERIAL PRIMARY KEY,
                         nombre           VARCHAR(100) NOT NULL,
                         email            VARCHAR(150) NOT NULL UNIQUE,
                         telefono         VARCHAR(20),
                         password         VARCHAR(200) NOT NULL,     -- añadida por necesidad del sistema
                         rol              VARCHAR(50) DEFAULT 'USER' -- ADMIN | USER | ORGANIZADOR | PATROCINADOR
);

-- =========================================================
-- 2. TABLA EVENTO
-- =========================================================
CREATE TABLE evento (
                        id_evento        SERIAL PRIMARY KEY,
                        nombre           VARCHAR(150) NOT NULL,
                        fecha            DATE NOT NULL,
                        descripcion      TEXT,
                        lugar            VARCHAR(200),
                        total_recaudado  DECIMAL(10,2) DEFAULT 0
);

-- =========================================================
-- 3. TABLA COMPRA
-- =========================================================
CREATE TABLE compra (
                        id_compra            SERIAL PRIMARY KEY,
                        fecha_compra         DATE NOT NULL,
                        importe_total        DECIMAL(10,2) NOT NULL,
                        metodo_pago          VARCHAR(50) NOT NULL,  -- enum simulado como texto
                        estado_pago          BOOLEAN DEFAULT TRUE,
                        tipo_operacion       VARCHAR(50) NOT NULL,  -- compra / donación / devolución
                        codigo_transaccion   VARCHAR(100),
                        cantidad_elementos   INT NOT NULL,
                        es_devolucion        BOOLEAN DEFAULT FALSE,
                        id_compra_original   INT,                  -- FK opcional para devoluciones
                        id_user              INT NOT NULL,

                        CONSTRAINT fk_compra_usuario
                            FOREIGN KEY (id_user) REFERENCES usuario (id_user)
                                ON DELETE CASCADE,

                        CONSTRAINT fk_compra_original
                            FOREIGN KEY (id_compra_original) REFERENCES compra (id_compra)
                                ON DELETE SET NULL
);

-- =========================================================
-- 4. TABLA ENTRADA
-- =========================================================
CREATE TABLE entrada (
                         id_entrada          SERIAL PRIMARY KEY,
                         tipo                CHAR(1) NOT NULL,
                         precio              DECIMAL(10,2) NOT NULL,
                         cantidad_disponible INT NOT NULL,

                         id_evento           INT NOT NULL,
                         id_compra           INT,
                         id_user             INT,

                         CONSTRAINT fk_entrada_evento
                             FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
                                 ON DELETE CASCADE,

                         CONSTRAINT fk_entrada_compra
                             FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
                                 ON DELETE SET NULL,

                         CONSTRAINT fk_entrada_usuario
                             FOREIGN KEY (id_user) REFERENCES usuario(id_user)
                                 ON DELETE SET NULL
);

-- =========================================================
-- 5. TABLA FACTURA
-- =========================================================
CREATE TABLE factura (
                         id_factura      SERIAL PRIMARY KEY,
                         fecha_emision   DATE NOT NULL,
                         importe         DECIMAL(10,2) NOT NULL,
                         iva             DECIMAL(10,2) NOT NULL,
                         datos_usuario   TEXT NOT NULL,

                         id_compra       INT NOT NULL,

                         CONSTRAINT fk_factura_compra
                             FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
                                 ON DELETE CASCADE
);

-- =========================================================
-- 6. TABLA PATROCINADOR
-- =========================================================
CREATE TABLE patrocinador (
                              id_patrocinador     SERIAL PRIMARY KEY,
                              nombre              VARCHAR(150) NOT NULL,
                              cantidad_aportada   DECIMAL(10,2) NOT NULL,
                              tipo_aportacion     VARCHAR(100),

                              id_evento           INT NOT NULL,

                              CONSTRAINT fk_patro_evento
                                  FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
                                      ON DELETE CASCADE
);

-- =========================================================
-- 7. TABLA RIFA
-- =========================================================
CREATE TABLE rifa (
                      id_rifa         SERIAL PRIMARY KEY,
                      precio          DECIMAL(10,2) NOT NULL,
                      cantidad        INT NOT NULL,
                      fecha           DATE NOT NULL,

                      id_compra       INT NOT NULL,

                      CONSTRAINT fk_rifa_compra
                          FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
                              ON DELETE CASCADE
);
