package com.cudeca.cudecabe.DTOs.compra;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CompraResponse {

    private Integer id;
    private LocalDate fechaCompra;
    private BigDecimal importeTotal;
    private String metodoPago;
    private Boolean estadoPago;
    private String tipoOperacion;
    private Integer cantidadElementos;
    private Boolean esDevolucion;

    // Si es devolución, ID de la compra original
    private Integer compraOriginalId;

    // Información denormalizada del usuario
    private String nombreUsuario;
    private String emailUsuario;
}

