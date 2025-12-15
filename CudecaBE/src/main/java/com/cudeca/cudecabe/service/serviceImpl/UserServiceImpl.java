package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.mappers.UsuarioMapper;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.UserRepository;
import com.cudeca.cudecabe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UsuarioResponse crearUsuario(UsuarioRequest request) {
        // Validar que el email no exista
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }


        Usuario usuario = usuarioMapper.toEntity(request);
        // Encriptar la contraseña antes de guardar
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(savedUsuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obtenerUsuario(Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        return usuarioMapper.toResponse(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(usuarioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UsuarioResponse actualizarUsuario(Integer id, UsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        // Validar email si se está cambiando
        if (request.getEmail() != null && !request.getEmail().equals(usuario.getEmail())) {
            if (usuarioRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("El email ya está registrado");
            }
        }


        usuarioMapper.updateEntity(request, usuario);

        // Encriptar la contraseña si se está actualizando
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(updatedUsuario);
    }

    @Override
    @Transactional
    public void eliminarUsuario(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obtenerUsuarioPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
        return usuarioMapper.toResponse(usuario);
    }


    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponse> obtenerUsuariosPorRol(String rol) {
        return usuarioRepository.findByRol(rol).stream()
                .map(usuarioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponse> buscarUsuariosPorNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(usuarioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UsuarioResponse incrementarDonacion(Integer id, BigDecimal cantidad) {
        if (cantidad == null || cantidad.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("La cantidad a donar debe ser mayor a cero");
        }

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        BigDecimal cantidadActual = usuario.getCantidadDonada() != null ?
                usuario.getCantidadDonada() : BigDecimal.ZERO;
        usuario.setCantidadDonada(cantidadActual.add(cantidad));

        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(updatedUsuario);
    }
}
