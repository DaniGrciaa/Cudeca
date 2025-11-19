package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.mappers.UsuarioMapper;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.UserRepository;
import com.cudeca.cudecabe.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository usuarioRepository;

    @Transactional
    public Usuario crearUsuario(UsuarioRequest request) {
        Usuario usuario = UsuarioMapper.toEntity(request);
        usuario.setPassword("1234"); // (Momentaneo para pruebas)
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuario(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
}
