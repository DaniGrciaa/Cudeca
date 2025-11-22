package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.evento.EventoFilterRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;

import java.time.LocalDate;
import java.util.List;

public interface EventoService {
    EventoResponse createEvento(EventoRequest request);
    EventoResponse getEventoById(Integer id);
    List<EventoResponse> getAllEventos();
    EventoResponse updateEvento(Integer id, EventoRequest request);
    void deleteEvento(Integer id);
    List<EventoResponse> getEventosByFecha(LocalDate fecha);
    List<EventoResponse> searchEventosByNombre(String nombre);
    List<EventoResponse> getEventosByFechaRange(LocalDate fechaInicio, LocalDate fechaFin);

    // Nuevos métodos de filtrado
    List<EventoResponse> getEventosByLugar(String lugar);
    List<EventoResponse> getEventosFuturos();
    List<EventoResponse> getEventosPasados();
    List<EventoResponse> getEventosByMesYAnio(Integer mes, Integer anio);
    List<EventoResponse> filtrarEventos(EventoFilterRequest filtros);
}

