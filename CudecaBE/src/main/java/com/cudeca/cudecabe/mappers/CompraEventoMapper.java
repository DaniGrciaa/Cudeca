package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.compraEvento.CompraEventoResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.EventoCompradoDTO;
import com.cudeca.cudecabe.model.CompraEvento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompraEventoMapper {

    @Autowired
    private EventoMapper eventoMapper;

    public CompraEventoResponse toResponse(CompraEvento compraEvento) {
        CompraEventoResponse response = new CompraEventoResponse();
        response.setId(compraEvento.getId());
        response.setUsuarioId(compraEvento.getUsuario().getId());
        response.setUsuarioNombre(compraEvento.getUsuario().getNombre());
        response.setUsuarioEmail(compraEvento.getUsuario().getEmail());
        response.setEvento(eventoMapper.toResponse(compraEvento.getEvento()));
        response.setFechaCompra(compraEvento.getFechaCompra());
        response.setCantidadEntradas(compraEvento.getCantidadEntradas());
        response.setPrecioTotal(compraEvento.getPrecioTotal());
        response.setEstado(compraEvento.getEstado());
        return response;
    }

    public EventoCompradoDTO toEventoCompradoDTO(CompraEvento compraEvento) {
        EventoCompradoDTO dto = new EventoCompradoDTO();
        dto.setCompraId(compraEvento.getId());
        dto.setEventoId(compraEvento.getEvento().getId());
        dto.setEventoNombre(compraEvento.getEvento().getNombre());
        dto.setEventoDescripcion(compraEvento.getEvento().getDescripcion());
        dto.setEventoLugar(compraEvento.getEvento().getLugar());
        dto.setEventoFecha(compraEvento.getEvento().getFecha());
        dto.setEventoTipo(compraEvento.getEvento().getTipo() != null ? compraEvento.getEvento().getTipo().name() : null);
        dto.setFechaCompra(compraEvento.getFechaCompra());
        dto.setCantidadEntradas(compraEvento.getCantidadEntradas());
        dto.setPrecioTotal(compraEvento.getPrecioTotal());
        dto.setEstado(compraEvento.getEstado());
        return dto;
    }
}
