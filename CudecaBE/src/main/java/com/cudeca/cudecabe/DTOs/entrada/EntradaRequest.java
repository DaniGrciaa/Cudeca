package com.cudeca.cudecabe.DTOs.entrada;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class EntradaRequest {

    @NotNull(message = "El tipo de entrada es obligatorio")
    private String tipo;

    @NotNull(message = "El precio es obligatorio")
    private BigDecimal precio;

    @NotNull(message = "La cantidad disponible es obligatoria")
    private Integer cantidadDisponible;

    @NotNull(message = "El ID del evento es obligatorio")
    private Integer idEvento;

    private Integer idCompra;

    private Integer idUser;
}

