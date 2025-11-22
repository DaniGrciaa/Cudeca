package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.entrada.EntradaRequest;
import com.cudeca.cudecabe.DTOs.entrada.EntradaResponse;
import com.cudeca.cudecabe.mappers.EntradaMapper;
import com.cudeca.cudecabe.model.Entrada;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.repository.EntradaRepository;
import com.cudeca.cudecabe.service.serviceImpl.EntradaServiceImpl;
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
class EntradaServiceTest {

    @Mock
    private EntradaRepository entradaRepository;

    @Mock
    private EntradaMapper entradaMapper;

    @InjectMocks
    private EntradaServiceImpl entradaService;

    private Entrada entrada;
    private EntradaRequest entradaRequest;
    private EntradaResponse entradaResponse;
    private Evento evento;

    @BeforeEach
    void setUp() {
        evento = new Evento();
        evento.setId(1);
        evento.setNombre("Concierto Benéfico");
        evento.setFecha(LocalDate.of(2025, 12, 15));
        evento.setLugar("Teatro Principal");

        entrada = new Entrada();
        entrada.setId(1);
        entrada.setTipo("VIP");
        entrada.setPrecio(new BigDecimal("50.00"));
        entrada.setCantidadDisponible(100);
        entrada.setIdEvento(evento);

        entradaRequest = new EntradaRequest();
        entradaRequest.setTipo("VIP");
        entradaRequest.setPrecio(new BigDecimal("50.00"));
        entradaRequest.setCantidadDisponible(100);
        entradaRequest.setIdEvento(1);

        entradaResponse = new EntradaResponse();
        entradaResponse.setId(1);
        entradaResponse.setTipo("VIP");
        entradaResponse.setPrecio(new BigDecimal("50.00"));
        entradaResponse.setCantidadDisponible(100);
        entradaResponse.setNombreEvento("Concierto Benéfico");
        entradaResponse.setFechaEvento(LocalDate.of(2025, 12, 15));
        entradaResponse.setLugarEvento("Teatro Principal");
    }

    @Test
    void testCreateEntrada_Success() {
        when(entradaMapper.toEntity(entradaRequest)).thenReturn(entrada);
        when(entradaRepository.save(entrada)).thenReturn(entrada);
        when(entradaMapper.toResponse(entrada)).thenReturn(entradaResponse);

        EntradaResponse result = entradaService.createEntrada(entradaRequest);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("VIP", result.getTipo());
        verify(entradaRepository, times(1)).save(entrada);
    }

    @Test
    void testGetEntradaById_Success() {
        when(entradaRepository.findById(1)).thenReturn(Optional.of(entrada));
        when(entradaMapper.toResponse(entrada)).thenReturn(entradaResponse);

        EntradaResponse result = entradaService.getEntradaById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(entradaRepository, times(1)).findById(1);
    }

    @Test
    void testGetEntradaById_NotFound() {
        when(entradaRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> entradaService.getEntradaById(1));
    }

    @Test
    void testGetAllEntradas_Success() {
        List<Entrada> entradas = Arrays.asList(entrada);
        when(entradaRepository.findAll()).thenReturn(entradas);
        when(entradaMapper.toResponse(any(Entrada.class))).thenReturn(entradaResponse);

        List<EntradaResponse> result = entradaService.getAllEntradas();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(entradaRepository, times(1)).findAll();
    }

    @Test
    void testUpdateEntrada_Success() {
        when(entradaRepository.findById(1)).thenReturn(Optional.of(entrada));
        doNothing().when(entradaMapper).updateEntity(entradaRequest, entrada);
        when(entradaRepository.save(entrada)).thenReturn(entrada);
        when(entradaMapper.toResponse(entrada)).thenReturn(entradaResponse);

        EntradaResponse result = entradaService.updateEntrada(1, entradaRequest);

        assertNotNull(result);
        verify(entradaMapper, times(1)).updateEntity(entradaRequest, entrada);
        verify(entradaRepository, times(1)).save(entrada);
    }

    @Test
    void testDeleteEntrada_Success() {
        when(entradaRepository.existsById(1)).thenReturn(true);
        doNothing().when(entradaRepository).deleteById(1);

        assertDoesNotThrow(() -> entradaService.deleteEntrada(1));
        verify(entradaRepository, times(1)).deleteById(1);
    }

    @Test
    void testGetEntradasByEventoId_Success() {
        List<Entrada> entradas = Arrays.asList(entrada);
        when(entradaRepository.findByIdEvento_Id(1)).thenReturn(entradas);
        when(entradaMapper.toResponse(any(Entrada.class))).thenReturn(entradaResponse);

        List<EntradaResponse> result = entradaService.getEntradasByEventoId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(entradaRepository, times(1)).findByIdEvento_Id(1);
    }
}

