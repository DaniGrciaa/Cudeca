package com.cudeca.cudecabe.DTOs.compra;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CompraRequest {

    private LocalDate fechaCompra;

    @NotNull(message = "El importe total es obligatorio")
    private BigDecimal importeTotal;

    @Size(max = 50, message = "El método de pago no puede exceder 50 caracteres")
    @NotNull(message = "El método de pago es obligatorio")
    private String metodoPago;

    private Boolean estadoPago;

    @Size(max = 50, message = "El tipo de operación no puede exceder 50 caracteres")
    @NotNull(message = "El tipo de operación es obligatorio")
    private String tipoOperacion;

    @Size(max = 100, message = "El código de transacción no puede exceder 100 caracteres")
    private String codigoTransaccion;

    @NotNull(message = "La cantidad de elementos es obligatoria")
    private Integer cantidadElementos;

    private Boolean esDevolucion;

    private Integer idCompraOriginal;

    @NotNull(message = "El ID de usuario es obligatorio")
    private Integer idUser;
}

