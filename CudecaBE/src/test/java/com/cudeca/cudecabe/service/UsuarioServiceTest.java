package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.mappers.UsuarioMapper;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.UserRepository;
import com.cudeca.cudecabe.service.serviceImpl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UsuarioMapper usuarioMapper;

    @InjectMocks
    private UserServiceImpl usuarioService;

    private Usuario usuario;
    private UsuarioRequest usuarioRequest;
    private UsuarioResponse usuarioResponse;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("Juan Pérez");
        usuario.setEmail("juan@example.com");
        usuario.setTelefono("123456789");
        usuario.setPassword("password123");
        usuario.setRol("USER");

        usuarioRequest = new UsuarioRequest();
        usuarioRequest.setNombre("Juan Pérez");
        usuarioRequest.setEmail("juan@example.com");
        usuarioRequest.setTelefono("123456789");
        usuarioRequest.setPassword("password123");
        usuarioRequest.setRol("USER");

        usuarioResponse = new UsuarioResponse();
        usuarioResponse.setId(1);
        usuarioResponse.setNombre("Juan Pérez");
        usuarioResponse.setEmail("juan@example.com");
        usuarioResponse.setTelefono("123456789");
        usuarioResponse.setRol("USER");
    }

    @Test
    void testCrearUsuario_Success() {
        when(userRepository.existsByEmail(usuarioRequest.getEmail())).thenReturn(false);
        when(usuarioMapper.toEntity(usuarioRequest)).thenReturn(usuario);
        when(userRepository.save(usuario)).thenReturn(usuario);
        when(usuarioMapper.toResponse(usuario)).thenReturn(usuarioResponse);

        UsuarioResponse result = usuarioService.crearUsuario(usuarioRequest);

        assertNotNull(result);
        assertEquals("Juan Pérez", result.getNombre());
        assertEquals("juan@example.com", result.getEmail());
        verify(userRepository, times(1)).save(usuario);
    }

    @Test
    void testCrearUsuario_EmailYaExiste() {
        when(userRepository.existsByEmail(usuarioRequest.getEmail())).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
            () -> usuarioService.crearUsuario(usuarioRequest));

        assertEquals("El email ya está registrado", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void testObtenerUsuario_Success() {
        when(userRepository.findById(1)).thenReturn(Optional.of(usuario));
        when(usuarioMapper.toResponse(usuario)).thenReturn(usuarioResponse);

        UsuarioResponse result = usuarioService.obtenerUsuario(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Juan Pérez", result.getNombre());
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testObtenerUsuario_NotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
            () -> usuarioService.obtenerUsuario(1));

        assertTrue(exception.getMessage().contains("Usuario no encontrado"));
    }

    @Test
    void testListarUsuarios_Success() {
        List<Usuario> usuarios = Arrays.asList(usuario);
        when(userRepository.findAll()).thenReturn(usuarios);
        when(usuarioMapper.toResponse(any(Usuario.class))).thenReturn(usuarioResponse);

        List<UsuarioResponse> result = usuarioService.listarUsuarios();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testActualizarUsuario_Success() {
        when(userRepository.findById(1)).thenReturn(Optional.of(usuario));
        doNothing().when(usuarioMapper).updateEntity(usuarioRequest, usuario);
        when(userRepository.save(usuario)).thenReturn(usuario);
        when(usuarioMapper.toResponse(usuario)).thenReturn(usuarioResponse);

        UsuarioResponse result = usuarioService.actualizarUsuario(1, usuarioRequest);

        assertNotNull(result);
        verify(usuarioMapper, times(1)).updateEntity(usuarioRequest, usuario);
        verify(userRepository, times(1)).save(usuario);
    }

    @Test
    void testEliminarUsuario_Success() {
        when(userRepository.existsById(1)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1);

        assertDoesNotThrow(() -> usuarioService.eliminarUsuario(1));
        verify(userRepository, times(1)).deleteById(1);
    }

    @Test
    void testEliminarUsuario_NotFound() {
        when(userRepository.existsById(1)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class,
            () -> usuarioService.eliminarUsuario(1));

        assertTrue(exception.getMessage().contains("Usuario no encontrado"));
    }

    @Test
    void testObtenerUsuarioPorEmail_Success() {
        when(userRepository.findByEmail("juan@example.com")).thenReturn(Optional.of(usuario));
        when(usuarioMapper.toResponse(usuario)).thenReturn(usuarioResponse);

        UsuarioResponse result = usuarioService.obtenerUsuarioPorEmail("juan@example.com");

        assertNotNull(result);
        assertEquals("juan@example.com", result.getEmail());
        verify(userRepository, times(1)).findByEmail("juan@example.com");
    }


    @Test
    void testObtenerUsuariosPorRol_Success() {
        List<Usuario> usuarios = Arrays.asList(usuario);
        when(userRepository.findByRol("USER")).thenReturn(usuarios);
        when(usuarioMapper.toResponse(any(Usuario.class))).thenReturn(usuarioResponse);

        List<UsuarioResponse> result = usuarioService.obtenerUsuariosPorRol("USER");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository, times(1)).findByRol("USER");
    }

    @Test
    void testBuscarUsuariosPorNombre_Success() {
        List<Usuario> usuarios = Arrays.asList(usuario);
        when(userRepository.findByNombreContainingIgnoreCase("Juan")).thenReturn(usuarios);
        when(usuarioMapper.toResponse(any(Usuario.class))).thenReturn(usuarioResponse);

        List<UsuarioResponse> result = usuarioService.buscarUsuariosPorNombre("Juan");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository, times(1)).findByNombreContainingIgnoreCase("Juan");
    }
}
