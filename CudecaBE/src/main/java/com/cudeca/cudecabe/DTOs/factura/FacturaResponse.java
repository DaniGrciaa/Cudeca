package com.cudeca.cudecabe.DTOs.factura;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FacturaResponse {

    private Integer id;
    private LocalDate fechaEmision;
    private BigDecimal importe;
    private BigDecimal iva;
    private BigDecimal importeTotal;
    private String datosUsuario;

    // Información denormalizada de la compra
    private LocalDate fechaCompra;
    private String metodoPago;
}

