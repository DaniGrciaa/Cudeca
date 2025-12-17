package com.cudeca.cudecabe.DTOs.compraEvento;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de respuesta después de procesar un carrito de compra
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoCompraResponse {

    private Integer totalEventos;
    private Integer totalEntradas;
    private BigDecimal precioTotal;
    private List<CompraEventoResponse> compras;
    private String mensaje;
}

