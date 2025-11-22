package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import com.cudeca.cudecabe.service.EventoService;
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

@WebMvcTest(EventoController.class)
@AutoConfigureMockMvc
class EventoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventoService eventoService;

    @Autowired
    private ObjectMapper objectMapper;

    private EventoRequest eventoRequest;
    private EventoResponse eventoResponse;

    @BeforeEach
    void setUp() {
        eventoRequest = new EventoRequest();
        eventoRequest.setNombre("Concierto Benéfico");
        eventoRequest.setFecha(LocalDate.of(2025, 12, 15));
        eventoRequest.setDescripcion("Concierto para recaudar fondos");
        eventoRequest.setLugar("Teatro Principal");

        eventoResponse = new EventoResponse();
        eventoResponse.setId(1);
        eventoResponse.setNombre("Concierto Benéfico");
        eventoResponse.setFecha(LocalDate.of(2025, 12, 15));
        eventoResponse.setDescripcion("Concierto para recaudar fondos");
        eventoResponse.setLugar("Teatro Principal");
        eventoResponse.setTotalRecaudado(BigDecimal.ZERO);
    }

    @Test
    @WithMockUser
    void testCreateEvento_Success() throws Exception {
        when(eventoService.createEvento(any(EventoRequest.class))).thenReturn(eventoResponse);

        mockMvc.perform(post("/api/eventos")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(eventoRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Concierto Benéfico"))
                .andExpect(jsonPath("$.lugar").value("Teatro Principal"));

        verify(eventoService, times(1)).createEvento(any(EventoRequest.class));
    }

    @Test
    @WithMockUser
    void testGetEventoById_Success() throws Exception {
        when(eventoService.getEventoById(1)).thenReturn(eventoResponse);

        mockMvc.perform(get("/api/eventos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Concierto Benéfico"));

        verify(eventoService, times(1)).getEventoById(1);
    }

    @Test
    @WithMockUser
    void testGetAllEventos_Success() throws Exception {
        List<EventoResponse> eventos = Arrays.asList(eventoResponse);
        when(eventoService.getAllEventos()).thenReturn(eventos);

        mockMvc.perform(get("/api/eventos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nombre").value("Concierto Benéfico"));

        verify(eventoService, times(1)).getAllEventos();
    }

    @Test
    @WithMockUser
    void testUpdateEvento_Success() throws Exception {
        when(eventoService.updateEvento(eq(1), any(EventoRequest.class))).thenReturn(eventoResponse);

        mockMvc.perform(put("/api/eventos/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(eventoRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));

        verify(eventoService, times(1)).updateEvento(eq(1), any(EventoRequest.class));
    }

    @Test
    @WithMockUser
    void testDeleteEvento_Success() throws Exception {
        doNothing().when(eventoService).deleteEvento(1);

        mockMvc.perform(delete("/api/eventos/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(eventoService, times(1)).deleteEvento(1);
    }

    @Test
    @WithMockUser
    void testGetEventosByFecha_Success() throws Exception {
        List<EventoResponse> eventos = Arrays.asList(eventoResponse);
        LocalDate fecha = LocalDate.of(2025, 12, 15);
        when(eventoService.getEventosByFecha(fecha)).thenReturn(eventos);

        mockMvc.perform(get("/api/eventos/fecha/2025-12-15"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));

        verify(eventoService, times(1)).getEventosByFecha(fecha);
    }

    @Test
    @WithMockUser
    void testSearchEventosByNombre_Success() throws Exception {
        List<EventoResponse> eventos = Arrays.asList(eventoResponse);
        when(eventoService.searchEventosByNombre("Concierto")).thenReturn(eventos);

        mockMvc.perform(get("/api/eventos/search")
                        .param("nombre", "Concierto"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Concierto Benéfico"));

        verify(eventoService, times(1)).searchEventosByNombre("Concierto");
    }

    @Test
    @WithMockUser
    void testGetEventosByFechaRange_Success() throws Exception {
        List<EventoResponse> eventos = Arrays.asList(eventoResponse);
        LocalDate fechaInicio = LocalDate.of(2025, 12, 1);
        LocalDate fechaFin = LocalDate.of(2025, 12, 31);
        when(eventoService.getEventosByFechaRange(fechaInicio, fechaFin)).thenReturn(eventos);

        mockMvc.perform(get("/api/eventos/rango-fecha")
                        .param("fechaInicio", "2025-12-01")
                        .param("fechaFin", "2025-12-31"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));

        verify(eventoService, times(1)).getEventosByFechaRange(fechaInicio, fechaFin);
    }
}

