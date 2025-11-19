package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public Usuario crearUsuario(UsuarioRequest request);

    public Usuario obtenerUsuario(Long id);

    public List<Usuario> listarUsuarios();
}
