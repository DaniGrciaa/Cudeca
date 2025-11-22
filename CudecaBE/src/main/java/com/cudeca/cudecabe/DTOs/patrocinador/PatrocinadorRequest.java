package com.cudeca.cudecabe.DTOs.patrocinador;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PatrocinadorRequest {

    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    @NotNull(message = "El nombre del patrocinador es obligatorio")
    private String nombre;

    @NotNull(message = "La cantidad aportada es obligatoria")
    private BigDecimal cantidadAportada;

    @Size(max = 100, message = "El tipo de aportación no puede exceder 100 caracteres")
    private String tipoAportacion;

    @NotNull(message = "El ID del evento es obligatorio")
    private Integer idEvento;
}

