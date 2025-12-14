package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import com.cudeca.cudecabe.model.Evento;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class EventoMapper {

    public Evento toEntity(EventoRequest request) {
        Evento evento = new Evento();
        evento.setNombre(request.getNombre());
        evento.setFecha(request.getFecha() != null ? request.getFecha() : LocalDate.now());
        evento.setDescripcion(request.getDescripcion());
        evento.setLugar(request.getLugar());
        evento.setTipo(request.getTipo());
        evento.setPrecio(request.getPrecio() != null ? request.getPrecio() : BigDecimal.ZERO);
        evento.setTotalRecaudado(request.getTotalRecaudado() != null ? request.getTotalRecaudado() : BigDecimal.ZERO);
        return evento;
    }

    public EventoResponse toResponse(Evento evento) {
        EventoResponse response = new EventoResponse();
        response.setId(evento.getId());
        response.setNombre(evento.getNombre());
        response.setFecha(evento.getFecha());
        response.setDescripcion(evento.getDescripcion());
        response.setLugar(evento.getLugar());
        response.setTipo(evento.getTipo());
        response.setPrecio(evento.getPrecio());
        response.setTotalRecaudado(evento.getTotalRecaudado());
        return response;
    }

    public void updateEntity(EventoRequest request, Evento evento) {
        if (request.getNombre() != null) {
            evento.setNombre(request.getNombre());
        }
        if (request.getFecha() != null) {
            evento.setFecha(request.getFecha());
        }
        if (request.getDescripcion() != null) {
            evento.setDescripcion(request.getDescripcion());
        }
        if (request.getLugar() != null) {
            evento.setLugar(request.getLugar());
        }
        if (request.getTipo() != null) {
            evento.setTipo(request.getTipo());
        }
        if (request.getPrecio() != null) {
            evento.setPrecio(request.getPrecio());
        }
        if (request.getTotalRecaudado() != null) {
            evento.setTotalRecaudado(request.getTotalRecaudado());
        }
    }
}

