package com.cudeca.cudecabe.DTOs.evento;

import com.cudeca.cudecabe.model.TipoEvento;
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
    private TipoEvento tipo;
    private BigDecimal precio;
    private BigDecimal totalRecaudado;
}

