package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.factura.FacturaRequest;
import com.cudeca.cudecabe.DTOs.factura.FacturaResponse;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Factura;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class FacturaMapper {

    public Factura toEntity(FacturaRequest request) {
        Factura factura = new Factura();
        factura.setFechaEmision(request.getFechaEmision() != null ? request.getFechaEmision() : LocalDate.now());
        factura.setImporte(request.getImporte());
        factura.setIva(request.getIva());
        factura.setDatosUsuario(request.getDatosUsuario());

        Compra compra = new Compra();
        compra.setId(request.getIdCompra());
        factura.setIdCompra(compra);

        return factura;
    }

    public FacturaResponse toResponse(Factura factura) {
        FacturaResponse response = new FacturaResponse();
        response.setId(factura.getId());
        response.setFechaEmision(factura.getFechaEmision());
        response.setImporte(factura.getImporte());
        response.setIva(factura.getIva());
        response.setImporteTotal(factura.getImporte().add(factura.getIva()));
        response.setDatosUsuario(factura.getDatosUsuario());

        if (factura.getIdCompra() != null) {
            response.setFechaCompra(factura.getIdCompra().getFechaCompra());
            response.setMetodoPago(factura.getIdCompra().getMetodoPago());
        }

        return response;
    }

    public void updateEntity(FacturaRequest request, Factura factura) {
        if (request.getFechaEmision() != null) {
            factura.setFechaEmision(request.getFechaEmision());
        }
        if (request.getImporte() != null) {
            factura.setImporte(request.getImporte());
        }
        if (request.getIva() != null) {
            factura.setIva(request.getIva());
        }
        if (request.getDatosUsuario() != null) {
            factura.setDatosUsuario(request.getDatosUsuario());
        }
    }
}

