package com.cudeca.cudecabe.DTOs.compraEvento;

import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompraEventoResponse {

    private Integer id;
    private Integer usuarioId;
    private String usuarioNombre;
    private String usuarioEmail;
    private EventoResponse evento;
    private LocalDateTime fechaCompra;
    private Integer cantidadEntradas;
    private BigDecimal precioTotal;
    private String estado;
}

