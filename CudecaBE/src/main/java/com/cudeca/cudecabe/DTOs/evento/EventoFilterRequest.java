package com.cudeca.cudecabe.DTOs.evento;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class EventoFilterRequest {

    // Filtro por nombre (búsqueda parcial)
    private String nombre;

    // Filtro por lugar (búsqueda parcial)
    private String lugar;

    // Filtro por fecha exacta
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fecha;

    // Filtro por rango de fechas
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaDesde;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaHasta;

    // Filtro por mes y año
    private Integer mes;
    private Integer anio;

    // Filtro por recaudación mínima
    private BigDecimal recaudacionMinima;

    // Filtro por recaudación máxima
    private BigDecimal recaudacionMaxima;

    // Filtro para eventos futuros/pasados
    private Boolean soloFuturos;
    private Boolean soloPasados;

    // Ordenamiento
    private String ordenarPor; // fecha, nombre, lugar, totalRecaudado
    private String direccion; // ASC, DESC
}

