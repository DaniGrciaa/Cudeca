package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;

import java.util.List;

public interface UserService {
    UsuarioResponse crearUsuario(UsuarioRequest request);
    UsuarioResponse obtenerUsuario(Integer id);
    List<UsuarioResponse> listarUsuarios();
    UsuarioResponse actualizarUsuario(Integer id, UsuarioRequest request);
    void eliminarUsuario(Integer id);
    UsuarioResponse obtenerUsuarioPorEmail(String email);
    UsuarioResponse obtenerUsuarioPorUsername(String username);
    List<UsuarioResponse> obtenerUsuariosPorRol(String rol);
    List<UsuarioResponse> buscarUsuariosPorNombre(String nombre);
}
