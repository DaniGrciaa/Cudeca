package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.rifa.RifaRequest;
import com.cudeca.cudecabe.DTOs.rifa.RifaResponse;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Rifa;
import org.springframework.stereotype.Component;

@Component
public class RifaMapper {

    public Rifa toEntity(RifaRequest request) {
        Rifa rifa = new Rifa();
        rifa.setPrecio(request.getPrecio());
        rifa.setCantidad(request.getCantidad());
        rifa.setFecha(request.getFecha());

        Compra compra = new Compra();
        compra.setId(request.getIdCompra());
        rifa.setIdCompra(compra);

        return rifa;
    }

    public RifaResponse toResponse(Rifa rifa) {
        RifaResponse response = new RifaResponse();
        response.setId(rifa.getId());
        response.setPrecio(rifa.getPrecio());
        response.setCantidad(rifa.getCantidad());
        response.setFecha(rifa.getFecha());

        if (rifa.getIdCompra() != null && rifa.getIdCompra().getIdUser() != null) {
            response.setNombreUsuario(rifa.getIdCompra().getIdUser().getNombre());
            response.setEmailUsuario(rifa.getIdCompra().getIdUser().getEmail());
        }

        return response;
    }

    public void updateEntity(RifaRequest request, Rifa rifa) {
        if (request.getPrecio() != null) {
            rifa.setPrecio(request.getPrecio());
        }
        if (request.getCantidad() != null) {
            rifa.setCantidad(request.getCantidad());
        }
        if (request.getFecha() != null) {
            rifa.setFecha(request.getFecha());
        }
    }
}

