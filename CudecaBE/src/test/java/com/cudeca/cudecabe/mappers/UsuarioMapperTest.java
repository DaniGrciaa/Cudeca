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
        // Nota: rol ya no se asigna desde el request, el backend lo gestiona

        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("María García");
        usuario.setEmail("maria@example.com");
        usuario.setTelefono("987654321");
        usuario.setPassword("password123");
        usuario.setRol("USER");
    }

    @Test
    void testToEntity_Success() {
        Usuario result = usuarioMapper.toEntity(usuarioRequest);

        assertNotNull(result);
        assertEquals(usuarioRequest.getNombre(), result.getNombre());
        assertEquals(usuarioRequest.getEmail(), result.getEmail());
        assertEquals(usuarioRequest.getTelefono(), result.getTelefono());
        assertEquals(usuarioRequest.getPassword(), result.getPassword());
        // El backend asigna el rol por defecto
        assertEquals("USER", result.getRol());
        assertEquals("LOCAL", result.getProvider());
    }

    @Test
    void testToEntity_AlwaysAssignsDefaultValues() {
        UsuarioRequest requestBasico = new UsuarioRequest();
        requestBasico.setNombre("Pedro López");
        requestBasico.setEmail("pedro@example.com");
        requestBasico.setTelefono("111222333");
        requestBasico.setPassword("pass123");
        // No se envía rol, provider ni cantidadDonada desde el request

        Usuario result = usuarioMapper.toEntity(requestBasico);

        assertNotNull(result);
        assertEquals("USER", result.getRol());
        assertEquals("LOCAL", result.getProvider());
        assertEquals(java.math.BigDecimal.ZERO, result.getCantidadDonada());
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
        // Nota: rol ya no se puede actualizar desde request por seguridad

        String rolOriginal = usuario.getRol();
        usuarioMapper.updateEntity(updateRequest, usuario);

        assertEquals("María García Actualizada", usuario.getNombre());
        assertEquals("maria.nueva@example.com", usuario.getEmail());
        assertEquals("999888777", usuario.getTelefono());
        // El rol no debe cambiar
        assertEquals(rolOriginal, usuario.getRol());
    }

    @Test
    void testUpdateEntity_PartialUpdate() {
        UsuarioRequest updateRequest = new UsuarioRequest();
        updateRequest.setNombre("Nuevo Nombre");
        updateRequest.setEmail(null);
        updateRequest.setTelefono(null);
        updateRequest.setPassword(null);
        // rol no se puede enviar desde el request

        String emailOriginal = usuario.getEmail();
        String rolOriginal = usuario.getRol();

        usuarioMapper.updateEntity(updateRequest, usuario);

        assertEquals("Nuevo Nombre", usuario.getNombre());
        assertEquals(emailOriginal, usuario.getEmail());
        assertEquals(rolOriginal, usuario.getRol());
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
