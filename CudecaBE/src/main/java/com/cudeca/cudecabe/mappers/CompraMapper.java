package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Usuario;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class CompraMapper {

    public Compra toEntity(CompraRequest request) {
        Compra compra = new Compra();
        compra.setFechaCompra(request.getFechaCompra() != null ? request.getFechaCompra() : LocalDate.now());
        compra.setImporteTotal(request.getImporteTotal());
        compra.setMetodoPago(request.getMetodoPago());
        compra.setEstadoPago(request.getEstadoPago() != null ? request.getEstadoPago() : true);
        compra.setTipoOperacion(request.getTipoOperacion());
        compra.setCodigoTransaccion(request.getCodigoTransaccion());
        compra.setCantidadElementos(request.getCantidadElementos());
        compra.setEsDevolucion(request.getEsDevolucion() != null ? request.getEsDevolucion() : false);

        if (request.getIdCompraOriginal() != null) {
            Compra compraOriginal = new Compra();
            compraOriginal.setId(request.getIdCompraOriginal());
            compra.setIdCompraOriginal(compraOriginal);
        }

        Usuario usuario = new Usuario();
        usuario.setId(request.getIdUser());
        compra.setIdUser(usuario);

        return compra;
    }

    public CompraResponse toResponse(Compra compra) {
        CompraResponse response = new CompraResponse();
        response.setId(compra.getId());
        response.setFechaCompra(compra.getFechaCompra());
        response.setImporteTotal(compra.getImporteTotal());
        response.setMetodoPago(compra.getMetodoPago());
        response.setEstadoPago(compra.getEstadoPago());
        response.setTipoOperacion(compra.getTipoOperacion());
        response.setCantidadElementos(compra.getCantidadElementos());
        response.setEsDevolucion(compra.getEsDevolucion());

        if (compra.getIdCompraOriginal() != null) {
            response.setCompraOriginalId(compra.getIdCompraOriginal().getId());
        }

        if (compra.getIdUser() != null) {
            response.setNombreUsuario(compra.getIdUser().getNombre());
            response.setEmailUsuario(compra.getIdUser().getEmail());
        }

        return response;
    }

    public void updateEntity(CompraRequest request, Compra compra) {
        if (request.getFechaCompra() != null) {
            compra.setFechaCompra(request.getFechaCompra());
        }
        if (request.getImporteTotal() != null) {
            compra.setImporteTotal(request.getImporteTotal());
        }
        if (request.getMetodoPago() != null) {
            compra.setMetodoPago(request.getMetodoPago());
        }
        if (request.getEstadoPago() != null) {
            compra.setEstadoPago(request.getEstadoPago());
        }
        if (request.getTipoOperacion() != null) {
            compra.setTipoOperacion(request.getTipoOperacion());
        }
        if (request.getCodigoTransaccion() != null) {
            compra.setCodigoTransaccion(request.getCodigoTransaccion());
        }
        if (request.getCantidadElementos() != null) {
            compra.setCantidadElementos(request.getCantidadElementos());
        }
        if (request.getEsDevolucion() != null) {
            compra.setEsDevolucion(request.getEsDevolucion());
        }
    }
}

