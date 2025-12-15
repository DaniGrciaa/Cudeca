package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.model.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UsuarioMapperTest {

    private UsuarioMapper usuarioMapper;
    private UsuarioRequest usuarioRequest;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuarioMapper = new UsuarioMapper();

        usuarioRequest = new UsuarioRequest();
        usuarioRequest.setNombre("María García");
        usuarioRequest.setEmail("maria@example.com");
        usuarioRequest.setTelefono("987654321");
        usuarioRequest.setPassword("password123");
        usuarioRequest.setRol("ADMIN");

        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("María García");
        usuario.setEmail("maria@example.com");
        usuario.setTelefono("987654321");
        usuario.setPassword("password123");
        usuario.setRol("ADMIN");
    }

    @Test
    void testToEntity_Success() {
        Usuario result = usuarioMapper.toEntity(usuarioRequest);

        assertNotNull(result);
        assertEquals(usuarioRequest.getNombre(), result.getNombre());
        assertEquals(usuarioRequest.getEmail(), result.getEmail());
        assertEquals(usuarioRequest.getTelefono(), result.getTelefono());
        assertEquals(usuarioRequest.getPassword(), result.getPassword());
        assertEquals(usuarioRequest.getRol(), result.getRol());
    }

    @Test
    void testToEntity_WithDefaultRol() {
        UsuarioRequest requestSinRol = new UsuarioRequest();
        requestSinRol.setNombre("Pedro López");
        requestSinRol.setEmail("pedro@example.com");
        requestSinRol.setTelefono("111222333");
        requestSinRol.setPassword("pass123");
        requestSinRol.setRol(null);

        Usuario result = usuarioMapper.toEntity(requestSinRol);

        assertNotNull(result);
        assertEquals("USER", result.getRol());
    }

    @Test
    void testToResponse_Success() {
        UsuarioResponse result = usuarioMapper.toResponse(usuario);

        assertNotNull(result);
        assertEquals(usuario.getId(), result.getId());
        assertEquals(usuario.getNombre(), result.getNombre());
        assertEquals(usuario.getEmail(), result.getEmail());
        assertEquals(usuario.getTelefono(), result.getTelefono());
        assertEquals(usuario.getRol(), result.getRol());
    }

    @Test
    void testToResponse_NoExponeLaPassword() {
        UsuarioResponse result = usuarioMapper.toResponse(usuario);

        assertNotNull(result);
        // Verificar que la respuesta no tiene un campo password
        assertThrows(NoSuchFieldException.class, () -> {
            result.getClass().getDeclaredField("password");
        });
    }

    @Test
    void testUpdateEntity_Success() {
        UsuarioRequest updateRequest = new UsuarioRequest();
        updateRequest.setNombre("María García Actualizada");
        updateRequest.setEmail("maria.nueva@example.com");
        updateRequest.setTelefono("999888777");
        updateRequest.setRol("SUPERADMIN");

        usuarioMapper.updateEntity(updateRequest, usuario);

        assertEquals("María García Actualizada", usuario.getNombre());
        assertEquals("maria.nueva@example.com", usuario.getEmail());
        assertEquals("999888777", usuario.getTelefono());
        assertEquals("SUPERADMIN", usuario.getRol());
    }

    @Test
    void testUpdateEntity_PartialUpdate() {
        UsuarioRequest updateRequest = new UsuarioRequest();
        updateRequest.setNombre("Nuevo Nombre");
        updateRequest.setEmail(null);
        updateRequest.setTelefono(null);
        updateRequest.setPassword(null);
        updateRequest.setRol(null);

        String emailOriginal = usuario.getEmail();

        usuarioMapper.updateEntity(updateRequest, usuario);

        assertEquals("Nuevo Nombre", usuario.getNombre());
        assertEquals(emailOriginal, usuario.getEmail());
    }

    @Test
    void testUpdateEntity_NullValues() {
        UsuarioRequest updateRequest = new UsuarioRequest();

        String nombreOriginal = usuario.getNombre();
        String emailOriginal = usuario.getEmail();

        usuarioMapper.updateEntity(updateRequest, usuario);

        assertEquals(nombreOriginal, usuario.getNombre());
        assertEquals(emailOriginal, usuario.getEmail());
    }
}
