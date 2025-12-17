package com.cudeca.cudecabe.DTOs.compraEvento;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO simplificado para mostrar solo información relevante del evento comprado
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoCompradoDTO {

    private Integer compraId;
    private Integer eventoId;
    private String eventoNombre;
    private String eventoDescripcion;
    private String eventoLugar;
    private LocalDate eventoFecha;
    private String eventoTipo;
    private LocalDateTime fechaCompra;
    private Integer cantidadEntradas;
    private BigDecimal precioTotal;
    private String estado;
}

