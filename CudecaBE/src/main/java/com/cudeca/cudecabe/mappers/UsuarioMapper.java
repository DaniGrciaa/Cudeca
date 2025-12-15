package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

    @Autowired
    private DireccionMapper direccionMapper;

    public Usuario toEntity(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setTelefono(request.getTelefono());
        usuario.setPassword(request.getPassword());
        usuario.setRol(request.getRol() != null ? request.getRol() : "USER");
        usuario.setCantidadDonada(request.getCantidadDonada() != null ? request.getCantidadDonada() : java.math.BigDecimal.ZERO);
        return usuario;
    }

    public UsuarioResponse toResponse(Usuario usuario) {
        UsuarioResponse response = new UsuarioResponse();
        response.setId(usuario.getId());
        response.setNombre(usuario.getNombre());
        response.setEmail(usuario.getEmail());
        response.setTelefono(usuario.getTelefono());
        response.setRol(usuario.getRol());
        response.setCantidadDonada(usuario.getCantidadDonada());

        // Convertir direcciones si existen
        if (usuario.getDirecciones() != null) {
            response.setDirecciones(direccionMapper.toResponseList(usuario.getDirecciones()));
        }

        return response;
    }

    public void updateEntity(UsuarioRequest request, Usuario usuario) {
        if (request.getNombre() != null) {
            usuario.setNombre(request.getNombre());
        }
        if (request.getEmail() != null) {
            usuario.setEmail(request.getEmail());
        }
        if (request.getTelefono() != null) {
            usuario.setTelefono(request.getTelefono());
        }
        // La contraseña se maneja en el servicio con encriptación
        if (request.getRol() != null) {
            usuario.setRol(request.getRol());
        }
        if (request.getCantidadDonada() != null) {
            usuario.setCantidadDonada(request.getCantidadDonada());
        }
    }
}
