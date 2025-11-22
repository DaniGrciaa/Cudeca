package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsuarioController.class)
@AutoConfigureMockMvc
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UsuarioRequest usuarioRequest;
    private UsuarioResponse usuarioResponse;

    @BeforeEach
    void setUp() {
        usuarioRequest = new UsuarioRequest();
        usuarioRequest.setNombre("Juan Pérez");
        usuarioRequest.setEmail("juan@example.com");
        usuarioRequest.setUsername("juanperez");
        usuarioRequest.setTelefono("123456789");
        usuarioRequest.setPassword("password123");
        usuarioRequest.setRol("USER");

        usuarioResponse = new UsuarioResponse();
        usuarioResponse.setId(1);
        usuarioResponse.setNombre("Juan Pérez");
        usuarioResponse.setEmail("juan@example.com");
        usuarioResponse.setUsername("juanperez");
        usuarioResponse.setTelefono("123456789");
        usuarioResponse.setRol("USER");
    }

    @Test
    @WithMockUser
    void testCrearUsuario_Success() throws Exception {
        when(userService.crearUsuario(any(UsuarioRequest.class))).thenReturn(usuarioResponse);

        mockMvc.perform(post("/api/usuarios")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usuarioRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Juan Pérez"))
                .andExpect(jsonPath("$.email").value("juan@example.com"))
                .andExpect(jsonPath("$.username").value("juanperez"));

        verify(userService, times(1)).crearUsuario(any(UsuarioRequest.class));
    }

    @Test
    @WithMockUser
    void testObtenerUsuario_Success() throws Exception {
        when(userService.obtenerUsuario(1)).thenReturn(usuarioResponse);

        mockMvc.perform(get("/api/usuarios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Juan Pérez"));

        verify(userService, times(1)).obtenerUsuario(1);
    }

    @Test
    @WithMockUser
    void testListarUsuarios_Success() throws Exception {
        List<UsuarioResponse> usuarios = Arrays.asList(usuarioResponse);
        when(userService.listarUsuarios()).thenReturn(usuarios);

        mockMvc.perform(get("/api/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nombre").value("Juan Pérez"));

        verify(userService, times(1)).listarUsuarios();
    }

    @Test
    @WithMockUser
    void testActualizarUsuario_Success() throws Exception {
        when(userService.actualizarUsuario(eq(1), any(UsuarioRequest.class))).thenReturn(usuarioResponse);

        mockMvc.perform(put("/api/usuarios/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usuarioRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));

        verify(userService, times(1)).actualizarUsuario(eq(1), any(UsuarioRequest.class));
    }

    @Test
    @WithMockUser
    void testEliminarUsuario_Success() throws Exception {
        doNothing().when(userService).eliminarUsuario(1);

        mockMvc.perform(delete("/api/usuarios/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(userService, times(1)).eliminarUsuario(1);
    }

    @Test
    @WithMockUser
    void testObtenerUsuarioPorEmail_Success() throws Exception {
        when(userService.obtenerUsuarioPorEmail("juan@example.com")).thenReturn(usuarioResponse);

        mockMvc.perform(get("/api/usuarios/email/juan@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("juan@example.com"));

        verify(userService, times(1)).obtenerUsuarioPorEmail("juan@example.com");
    }

    @Test
    @WithMockUser
    void testObtenerUsuarioPorUsername_Success() throws Exception {
        when(userService.obtenerUsuarioPorUsername("juanperez")).thenReturn(usuarioResponse);

        mockMvc.perform(get("/api/usuarios/username/juanperez"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("juanperez"));

        verify(userService, times(1)).obtenerUsuarioPorUsername("juanperez");
    }

    @Test
    @WithMockUser
    void testObtenerUsuariosPorRol_Success() throws Exception {
        List<UsuarioResponse> usuarios = Arrays.asList(usuarioResponse);
        when(userService.obtenerUsuariosPorRol("USER")).thenReturn(usuarios);

        mockMvc.perform(get("/api/usuarios/rol/USER"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].rol").value("USER"));

        verify(userService, times(1)).obtenerUsuariosPorRol("USER");
    }

    @Test
    @WithMockUser
    void testBuscarUsuariosPorNombre_Success() throws Exception {
        List<UsuarioResponse> usuarios = Arrays.asList(usuarioResponse);
        when(userService.buscarUsuariosPorNombre("Juan")).thenReturn(usuarios);

        mockMvc.perform(get("/api/usuarios/search")
                        .param("nombre", "Juan"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Juan Pérez"));

        verify(userService, times(1)).buscarUsuariosPorNombre("Juan");
    }

    @Test
    @WithMockUser
    void testCrearUsuario_ValidationError() throws Exception {
        UsuarioRequest invalidRequest = new UsuarioRequest();
        invalidRequest.setNombre("");
        invalidRequest.setEmail("invalid-email");

        mockMvc.perform(post("/api/usuarios")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userService, never()).crearUsuario(any(UsuarioRequest.class));
    }
}

