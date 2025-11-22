package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.entrada.EntradaRequest;
import com.cudeca.cudecabe.DTOs.entrada.EntradaResponse;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Entrada;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class EntradaMapper {

    public Entrada toEntity(EntradaRequest request) {
        Entrada entrada = new Entrada();
        entrada.setTipo(request.getTipo());
        entrada.setPrecio(request.getPrecio());
        entrada.setCantidadDisponible(request.getCantidadDisponible());

        Evento evento = new Evento();
        evento.setId(request.getIdEvento());
        entrada.setIdEvento(evento);

        if (request.getIdCompra() != null) {
            Compra compra = new Compra();
            compra.setId(request.getIdCompra());
            entrada.setIdCompra(compra);
        }

        if (request.getIdUser() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(request.getIdUser());
            entrada.setIdUser(usuario);
        }

        return entrada;
    }

    public EntradaResponse toResponse(Entrada entrada) {
        EntradaResponse response = new EntradaResponse();
        response.setId(entrada.getId());
        response.setTipo(entrada.getTipo());
        response.setPrecio(entrada.getPrecio());
        response.setCantidadDisponible(entrada.getCantidadDisponible());

        if (entrada.getIdEvento() != null) {
            response.setNombreEvento(entrada.getIdEvento().getNombre());
            response.setFechaEvento(entrada.getIdEvento().getFecha());
            response.setLugarEvento(entrada.getIdEvento().getLugar());
        }

        if (entrada.getIdUser() != null) {
            response.setNombreUsuario(entrada.getIdUser().getNombre());
        }

        return response;
    }

    public void updateEntity(EntradaRequest request, Entrada entrada) {
        if (request.getTipo() != null) {
            entrada.setTipo(request.getTipo());
        }
        if (request.getPrecio() != null) {
            entrada.setPrecio(request.getPrecio());
        }
        if (request.getCantidadDisponible() != null) {
            entrada.setCantidadDisponible(request.getCantidadDisponible());
        }
    }
}

