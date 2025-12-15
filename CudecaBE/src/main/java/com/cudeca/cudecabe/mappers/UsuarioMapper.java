package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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
        // El backend asigna estos valores por defecto por seguridad
        usuario.setRol("USER");
        usuario.setProvider("LOCAL");
        usuario.setCantidadDonada(java.math.BigDecimal.ZERO);

        // Mapear direcciones si existen en el request
        if (request.getDirecciones() != null && !request.getDirecciones().isEmpty()) {
            List<com.cudeca.cudecabe.model.Direccion> direcciones = request.getDirecciones().stream()
                .map(direccionRequest -> {
                    com.cudeca.cudecabe.model.Direccion direccion = new com.cudeca.cudecabe.model.Direccion();
                    direccion.setCalle(direccionRequest.getCalle());
                    direccion.setNumero(direccionRequest.getNumero());
                    direccion.setPiso(direccionRequest.getPiso());
                    direccion.setPuerta(direccionRequest.getPuerta());
                    direccion.setCodigoPostal(direccionRequest.getCodigoPostal());
                    direccion.setCiudad(direccionRequest.getCiudad());
                    direccion.setProvincia(direccionRequest.getProvincia());
                    direccion.setPais(direccionRequest.getPais());
                    // Establecer la relación bidireccional
                    direccion.setUsuario(usuario);
                    return direccion;
                })
                .collect(java.util.stream.Collectors.toList());
            usuario.setDirecciones(direcciones);
        }

        return usuario;
    }

    public UsuarioResponse toResponse(Usuario usuario) {
        UsuarioResponse response = new UsuarioResponse();
        response.setId(usuario.getId());
        response.setNombre(usuario.getNombre());
        response.setEmail(usuario.getEmail());
        response.setTelefono(usuario.getTelefono());
        response.setRol(usuario.getRol());
        response.setProvider(usuario.getProvider());
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
        
        // Actualizar direcciones si se proporcionan
        if (request.getDirecciones() != null) {
            // Limpiar direcciones existentes
            if (usuario.getDirecciones() != null) {
                usuario.getDirecciones().clear();
            } else {
                usuario.setDirecciones(new java.util.ArrayList<>());
            }
            
            // Agregar nuevas direcciones
            request.getDirecciones().forEach(direccionRequest -> {
                com.cudeca.cudecabe.model.Direccion direccion = new com.cudeca.cudecabe.model.Direccion();
                direccion.setCalle(direccionRequest.getCalle());
                direccion.setNumero(direccionRequest.getNumero());
                direccion.setPiso(direccionRequest.getPiso());
                direccion.setPuerta(direccionRequest.getPuerta());
                direccion.setCodigoPostal(direccionRequest.getCodigoPostal());
                direccion.setCiudad(direccionRequest.getCiudad());
                direccion.setProvincia(direccionRequest.getProvincia());
                direccion.setPais(direccionRequest.getPais());
                direccion.setUsuario(usuario);
                usuario.getDirecciones().add(direccion);
            });
        }
        
        // La contraseña se maneja en el servicio con encriptación
        // Nota: rol, provider y cantidadDonada NO se pueden modificar desde requests normales
        // Estos campos solo se gestionan internamente por el backend
    }
}
