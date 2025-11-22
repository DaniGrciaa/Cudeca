package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;
import com.cudeca.cudecabe.service.CompraService;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CompraController.class)
@AutoConfigureMockMvc
class CompraControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompraService compraService;

    @Autowired
    private ObjectMapper objectMapper;

    private CompraRequest compraRequest;
    private CompraResponse compraResponse;

    @BeforeEach
    void setUp() {
        compraRequest = new CompraRequest();
        compraRequest.setImporteTotal(new BigDecimal("100.00"));
        compraRequest.setMetodoPago("Tarjeta");
        compraRequest.setTipoOperacion("COMPRA");
        compraRequest.setCantidadElementos(2);
        compraRequest.setIdUser(1);

        compraResponse = new CompraResponse();
        compraResponse.setId(1);
        compraResponse.setFechaCompra(LocalDate.now());
        compraResponse.setImporteTotal(new BigDecimal("100.00"));
        compraResponse.setMetodoPago("Tarjeta");
        compraResponse.setEstadoPago(true);
        compraResponse.setTipoOperacion("COMPRA");
        compraResponse.setCantidadElementos(2);
        compraResponse.setNombreUsuario("Juan Pérez");
        compraResponse.setEmailUsuario("juan@example.com");
    }

    @Test
    @WithMockUser
    void testCreateCompra_Success() throws Exception {
        when(compraService.createCompra(any(CompraRequest.class))).thenReturn(compraResponse);

        mockMvc.perform(post("/api/compras")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(compraRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.importeTotal").value(100.00))
                .andExpect(jsonPath("$.nombreUsuario").value("Juan Pérez"));

        verify(compraService, times(1)).createCompra(any(CompraRequest.class));
    }

    @Test
    @WithMockUser
    void testGetCompraById_Success() throws Exception {
        when(compraService.getCompraById(1)).thenReturn(compraResponse);

        mockMvc.perform(get("/api/compras/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.metodoPago").value("Tarjeta"));

        verify(compraService, times(1)).getCompraById(1);
    }

    @Test
    @WithMockUser
    void testGetAllCompras_Success() throws Exception {
        List<CompraResponse> compras = Arrays.asList(compraResponse);
        when(compraService.getAllCompras()).thenReturn(compras);

        mockMvc.perform(get("/api/compras"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nombreUsuario").value("Juan Pérez"));

        verify(compraService, times(1)).getAllCompras();
    }

    @Test
    @WithMockUser
    void testUpdateCompra_Success() throws Exception {
        when(compraService.updateCompra(eq(1), any(CompraRequest.class))).thenReturn(compraResponse);

        mockMvc.perform(put("/api/compras/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(compraRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));

        verify(compraService, times(1)).updateCompra(eq(1), any(CompraRequest.class));
    }

    @Test
    @WithMockUser
    void testDeleteCompra_Success() throws Exception {
        doNothing().when(compraService).deleteCompra(1);

        mockMvc.perform(delete("/api/compras/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(compraService, times(1)).deleteCompra(1);
    }

    @Test
    @WithMockUser
    void testGetComprasByUserId_Success() throws Exception {
        List<CompraResponse> compras = Arrays.asList(compraResponse);
        when(compraService.getComprasByUserId(1)).thenReturn(compras);

        mockMvc.perform(get("/api/compras/usuario/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));

        verify(compraService, times(1)).getComprasByUserId(1);
    }

    @Test
    @WithMockUser
    void testGetComprasByEstadoPago_Success() throws Exception {
        List<CompraResponse> compras = Arrays.asList(compraResponse);
        when(compraService.getComprasByEstadoPago(true)).thenReturn(compras);

        mockMvc.perform(get("/api/compras/estado-pago/true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].estadoPago").value(true));

        verify(compraService, times(1)).getComprasByEstadoPago(true);
    }

    @Test
    @WithMockUser
    void testGetComprasByTipoOperacion_Success() throws Exception {
        List<CompraResponse> compras = Arrays.asList(compraResponse);
        when(compraService.getComprasByTipoOperacion("COMPRA")).thenReturn(compras);

        mockMvc.perform(get("/api/compras/tipo-operacion/COMPRA"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tipoOperacion").value("COMPRA"));

        verify(compraService, times(1)).getComprasByTipoOperacion("COMPRA");
    }
}

