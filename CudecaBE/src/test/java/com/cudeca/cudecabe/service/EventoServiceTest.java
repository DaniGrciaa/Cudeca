package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import com.cudeca.cudecabe.mappers.EventoMapper;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.repository.EventoRepository;
import com.cudeca.cudecabe.service.serviceImpl.EventoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventoServiceTest {

    @Mock
    private EventoRepository eventoRepository;

    @Mock
    private EventoMapper eventoMapper;

    @InjectMocks
    private EventoServiceImpl eventoService;

    private Evento evento;
    private EventoRequest eventoRequest;
    private EventoResponse eventoResponse;

    @BeforeEach
    void setUp() {
        evento = new Evento();
        evento.setId(1);
        evento.setNombre("Concierto Benéfico");
        evento.setFecha(LocalDate.of(2025, 12, 15));
        evento.setDescripcion("Concierto para recaudar fondos");
        evento.setLugar("Teatro Principal");
        evento.setTotalRecaudado(BigDecimal.ZERO);

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
    void testCreateEvento_Success() {
        when(eventoMapper.toEntity(eventoRequest)).thenReturn(evento);
        when(eventoRepository.save(evento)).thenReturn(evento);
        when(eventoMapper.toResponse(evento)).thenReturn(eventoResponse);

        EventoResponse result = eventoService.createEvento(eventoRequest);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Concierto Benéfico", result.getNombre());
        verify(eventoRepository, times(1)).save(evento);
    }

    @Test
    void testGetEventoById_Success() {
        when(eventoRepository.findById(1)).thenReturn(Optional.of(evento));
        when(eventoMapper.toResponse(evento)).thenReturn(eventoResponse);

        EventoResponse result = eventoService.getEventoById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(eventoRepository, times(1)).findById(1);
    }

    @Test
    void testGetEventoById_NotFound() {
        when(eventoRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> eventoService.getEventoById(1));
    }

    @Test
    void testGetAllEventos_Success() {
        List<Evento> eventos = Arrays.asList(evento);
        when(eventoRepository.findAll()).thenReturn(eventos);
        when(eventoMapper.toResponse(any(Evento.class))).thenReturn(eventoResponse);

        List<EventoResponse> result = eventoService.getAllEventos();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventoRepository, times(1)).findAll();
    }

    @Test
    void testUpdateEvento_Success() {
        when(eventoRepository.findById(1)).thenReturn(Optional.of(evento));
        doNothing().when(eventoMapper).updateEntity(eventoRequest, evento);
        when(eventoRepository.save(evento)).thenReturn(evento);
        when(eventoMapper.toResponse(evento)).thenReturn(eventoResponse);

        EventoResponse result = eventoService.updateEvento(1, eventoRequest);

        assertNotNull(result);
        verify(eventoMapper, times(1)).updateEntity(eventoRequest, evento);
        verify(eventoRepository, times(1)).save(evento);
    }

    @Test
    void testDeleteEvento_Success() {
        when(eventoRepository.existsById(1)).thenReturn(true);
        doNothing().when(eventoRepository).deleteById(1);

        assertDoesNotThrow(() -> eventoService.deleteEvento(1));
        verify(eventoRepository, times(1)).deleteById(1);
    }

    @Test
    void testGetEventosByFecha_Success() {
        LocalDate fecha = LocalDate.of(2025, 12, 15);
        List<Evento> eventos = Arrays.asList(evento);
        when(eventoRepository.findByFecha(fecha)).thenReturn(eventos);
        when(eventoMapper.toResponse(any(Evento.class))).thenReturn(eventoResponse);

        List<EventoResponse> result = eventoService.getEventosByFecha(fecha);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventoRepository, times(1)).findByFecha(fecha);
    }

    @Test
    void testSearchEventosByNombre_Success() {
        List<Evento> eventos = Arrays.asList(evento);
        when(eventoRepository.findByNombreContainingIgnoreCase("Concierto")).thenReturn(eventos);
        when(eventoMapper.toResponse(any(Evento.class))).thenReturn(eventoResponse);

        List<EventoResponse> result = eventoService.searchEventosByNombre("Concierto");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventoRepository, times(1)).findByNombreContainingIgnoreCase("Concierto");
    }

    @Test
    void testGetEventosByFechaRange_Success() {
        LocalDate fechaInicio = LocalDate.of(2025, 12, 1);
        LocalDate fechaFin = LocalDate.of(2025, 12, 31);
        List<Evento> eventos = Arrays.asList(evento);
        when(eventoRepository.findByFechaBetween(fechaInicio, fechaFin)).thenReturn(eventos);
        when(eventoMapper.toResponse(any(Evento.class))).thenReturn(eventoResponse);

        List<EventoResponse> result = eventoService.getEventosByFechaRange(fechaInicio, fechaFin);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(eventoRepository, times(1)).findByFechaBetween(fechaInicio, fechaFin);
    }
}

