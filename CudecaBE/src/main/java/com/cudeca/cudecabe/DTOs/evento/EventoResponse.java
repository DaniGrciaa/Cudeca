package com.cudeca.cudecabe.DTOs.evento;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class EventoResponse {

    private Integer id;
    private String nombre;
    private LocalDate fecha;
    private String descripcion;
    private String lugar;
    private BigDecimal totalRecaudado;
}

