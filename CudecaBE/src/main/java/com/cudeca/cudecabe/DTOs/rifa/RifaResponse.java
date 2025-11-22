package com.cudeca.cudecabe.DTOs.rifa;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class RifaResponse {

    private Integer id;
    private BigDecimal precio;
    private Integer cantidad;
    private LocalDate fecha;

    // Información denormalizada del comprador
    private String nombreUsuario;
    private String emailUsuario;
}

