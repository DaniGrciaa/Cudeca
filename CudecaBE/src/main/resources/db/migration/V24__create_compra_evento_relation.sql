------------------------------------------------------------
-- V23__create_compra_evento_relation.sql
-- Tabla intermedia para relacionar usuarios con eventos comprados
------------------------------------------------------------

CREATE TABLE compra_evento (
    id_compra_evento    SERIAL PRIMARY KEY,
    id_user             INT NOT NULL,
    id_evento           INT NOT NULL,
    fecha_compra        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad_entradas   INT NOT NULL DEFAULT 1,
    precio_total        DECIMAL(10,2) NOT NULL,
    estado              VARCHAR(20) DEFAULT 'COMPLETADO', -- COMPLETADO, PENDIENTE, CANCELADO

    CONSTRAINT fk_compra_evento_usuario
        FOREIGN KEY (id_user) REFERENCES usuario (id_user)
            ON DELETE CASCADE,

    CONSTRAINT fk_compra_evento_evento
        FOREIGN KEY (id_evento) REFERENCES evento (id_evento)
            ON DELETE CASCADE,

    CONSTRAINT chk_cantidad_entradas_positiva
        CHECK (cantidad_entradas > 0),

    CONSTRAINT chk_precio_total_positivo
        CHECK (precio_total >= 0)
);

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_compra_evento_usuario ON compra_evento(id_user);
CREATE INDEX idx_compra_evento_evento ON compra_evento(id_evento);
CREATE INDEX idx_compra_evento_fecha ON compra_evento(fecha_compra);
CREATE INDEX idx_compra_evento_estado ON compra_evento(estado);

