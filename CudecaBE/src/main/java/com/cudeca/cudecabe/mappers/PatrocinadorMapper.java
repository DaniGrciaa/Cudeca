package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorRequest;
import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorResponse;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.model.Patrocinador;
import org.springframework.stereotype.Component;

@Component
public class PatrocinadorMapper {

    public Patrocinador toEntity(PatrocinadorRequest request) {
        Patrocinador patrocinador = new Patrocinador();
        patrocinador.setNombre(request.getNombre());
        patrocinador.setCantidadAportada(request.getCantidadAportada());
        patrocinador.setTipoAportacion(request.getTipoAportacion());

        Evento evento = new Evento();
        evento.setId(request.getIdEvento());
        patrocinador.setIdEvento(evento);

        return patrocinador;
    }

    public PatrocinadorResponse toResponse(Patrocinador patrocinador) {
        PatrocinadorResponse response = new PatrocinadorResponse();
        response.setId(patrocinador.getId());
        response.setNombre(patrocinador.getNombre());
        response.setCantidadAportada(patrocinador.getCantidadAportada());
        response.setTipoAportacion(patrocinador.getTipoAportacion());

        if (patrocinador.getIdEvento() != null) {
            response.setNombreEvento(patrocinador.getIdEvento().getNombre());
            response.setFechaEvento(patrocinador.getIdEvento().getFecha());
            response.setLugarEvento(patrocinador.getIdEvento().getLugar());
        }

        return response;
    }

    public void updateEntity(PatrocinadorRequest request, Patrocinador patrocinador) {
        if (request.getNombre() != null) {
            patrocinador.setNombre(request.getNombre());
        }
        if (request.getCantidadAportada() != null) {
            patrocinador.setCantidadAportada(request.getCantidadAportada());
        }
        if (request.getTipoAportacion() != null) {
            patrocinador.setTipoAportacion(request.getTipoAportacion());
        }
    }
}

