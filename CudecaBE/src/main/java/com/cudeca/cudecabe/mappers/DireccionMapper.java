package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.direccion.DireccionRequest;
import com.cudeca.cudecabe.DTOs.direccion.DireccionResponse;
import com.cudeca.cudecabe.model.Direccion;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DireccionMapper {

    /**
     * Convierte una entidad Direccion a DireccionResponse
     */
    public DireccionResponse toResponse(Direccion direccion) {
        if (direccion == null) {
            return null;
        }

        DireccionResponse response = new DireccionResponse();
        response.setId(direccion.getId());
        response.setCalle(direccion.getCalle());
        response.setNumero(direccion.getNumero());
        response.setPiso(direccion.getPiso());
        response.setPuerta(direccion.getPuerta());
        response.setCodigoPostal(direccion.getCodigoPostal());
        response.setCiudad(direccion.getCiudad());
        response.setProvincia(direccion.getProvincia());
        response.setPais(direccion.getPais());

        return response;
    }

    /**
     * Convierte un DireccionRequest a entidad Direccion
     */
    public Direccion toEntity(DireccionRequest request, Integer idUsuario) {
        if (request == null) {
            return null;
        }

        Direccion direccion = new Direccion();
        direccion.setIdUsuario(idUsuario);
        direccion.setCalle(request.getCalle());
        direccion.setNumero(request.getNumero());
        direccion.setPiso(request.getPiso());
        direccion.setPuerta(request.getPuerta());
        direccion.setCodigoPostal(request.getCodigoPostal());
        direccion.setCiudad(request.getCiudad());
        direccion.setProvincia(request.getProvincia());
        direccion.setPais(request.getPais());

        return direccion;
    }

    /**
     * Convierte una lista de Direccion a lista de DireccionResponse
     */
    public List<DireccionResponse> toResponseList(List<Direccion> direcciones) {
        if (direcciones == null) {
            return null;
        }
        return direcciones.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Actualiza una entidad Direccion existente con los datos del request
     */
    public void updateEntity(Direccion direccion, DireccionRequest request) {
        if (direccion == null || request == null) {
            return;
        }

        direccion.setCalle(request.getCalle());
        direccion.setNumero(request.getNumero());
        direccion.setPiso(request.getPiso());
        direccion.setPuerta(request.getPuerta());
        direccion.setCodigoPostal(request.getCodigoPostal());
        direccion.setCiudad(request.getCiudad());
        direccion.setProvincia(request.getProvincia());
        direccion.setPais(request.getPais());
    }
}

