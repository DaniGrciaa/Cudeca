package com.cudeca.cudecabe.DTOs.rifa;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class RifaRequest {

    @NotNull(message = "El precio es obligatorio")
    private BigDecimal precio;

    @NotNull(message = "La cantidad es obligatoria")
    private Integer cantidad;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotNull(message = "El ID de compra es obligatorio")
    private Integer idCompra;
}

