package com.cudeca.cudecabe.DTOs.evento;

import com.cudeca.cudecabe.model.TipoEvento;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class EventoRequest {

    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    @NotNull(message = "El nombre del evento es obligatorio")
    private String nombre;

    @NotNull(message = "La fecha del evento es obligatoria")
    private LocalDate fecha;

    private String descripcion;

    @Size(max = 200, message = "El lugar no puede exceder 200 caracteres")
    private String lugar;

    private TipoEvento tipo;

    private BigDecimal precio;

    private BigDecimal totalRecaudado;
}

