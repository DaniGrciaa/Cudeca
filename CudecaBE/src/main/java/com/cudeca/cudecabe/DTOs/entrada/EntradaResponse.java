package com.cudeca.cudecabe.DTOs.entrada;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class EntradaResponse {

    private Integer id;
    private String tipo;
    private BigDecimal precio;
    private Integer cantidadDisponible;

    // Información denormalizada del evento
    private String nombreEvento;
    private LocalDate fechaEvento;
    private String lugarEvento;

    // Información denormalizada del usuario (si está asignada)
    private String nombreUsuario;
}

