package com.cudeca.cudecabe.DTOs.compraEvento;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO para comprar múltiples eventos a la vez (carrito)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoCompraRequest {

    @NotEmpty(message = "El carrito no puede estar vacío")
    @Valid
    private List<CompraEventoRequest> eventos;
}

