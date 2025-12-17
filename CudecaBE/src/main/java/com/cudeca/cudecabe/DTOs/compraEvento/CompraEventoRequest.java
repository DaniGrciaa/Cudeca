package com.cudeca.cudecabe.DTOs.compraEvento;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO para un solo item del carrito
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompraEventoRequest {

    @NotNull(message = "El ID del evento es obligatorio")
    private Integer eventoId;

    @NotNull(message = "La cantidad de entradas es obligatoria")
    @Min(value = 1, message = "Debe comprar al menos 1 entrada")
    private Integer cantidadEntradas;

    @NotNull(message = "El precio total es obligatorio")
    @Min(value = 0, message = "El precio no puede ser negativo")
    private BigDecimal precioTotal;
}

