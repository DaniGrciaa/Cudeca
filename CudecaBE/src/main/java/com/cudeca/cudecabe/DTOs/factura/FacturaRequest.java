package com.cudeca.cudecabe.DTOs.factura;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FacturaRequest {

    private LocalDate fechaEmision;

    @NotNull(message = "El importe es obligatorio")
    private BigDecimal importe;

    @NotNull(message = "El IVA es obligatorio")
    private BigDecimal iva;

    @NotNull(message = "Los datos del usuario son obligatorios")
    private String datosUsuario;

    @NotNull(message = "El ID de compra es obligatorio")
    private Integer idCompra;
}

