package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.model.Usuario;

public class UsuarioMapper {

    public static Usuario toEntity(UsuarioRequest dto) {
        Usuario u = new Usuario();
        u.setNombre(dto.getNombre());
        u.setEmail(dto.getEmail());
        u.setTelefono(dto.getTelefono());
        u.setUsername(dto.getUsername());
        return u;
    }

    public static UsuarioResponse toResponse(Usuario u) {
        UsuarioResponse dto = new UsuarioResponse();
        dto.setIdUser(u.getId());
        dto.setNombre(u.getNombre());
        dto.setEmail(u.getEmail());
        dto.setTelefono(u.getTelefono());
        dto.setUsername(u.getUsername());
        return dto;
    }
}
