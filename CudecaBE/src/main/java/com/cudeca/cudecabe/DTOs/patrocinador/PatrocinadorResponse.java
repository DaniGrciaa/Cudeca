package com.cudeca.cudecabe.DTOs.patrocinador;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PatrocinadorResponse {

    private Integer id;
    private String nombre;
    private BigDecimal cantidadAportada;
    private String tipoAportacion;

    // Información denormalizada del evento
    private String nombreEvento;
    private LocalDate fechaEvento;
    private String lugarEvento;
}

