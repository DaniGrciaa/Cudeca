package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorRequest;
import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorResponse;
import com.cudeca.cudecabe.mappers.PatrocinadorMapper;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.model.Patrocinador;
import com.cudeca.cudecabe.repository.PatrocinadorRepository;
import com.cudeca.cudecabe.service.serviceImpl.PatrocinadorServiceImpl;
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
class PatrocinadorServiceTest {

    @Mock
    private PatrocinadorRepository patrocinadorRepository;

    @Mock
    private PatrocinadorMapper patrocinadorMapper;

    @InjectMocks
    private PatrocinadorServiceImpl patrocinadorService;

    private Patrocinador patrocinador;
    private PatrocinadorRequest patrocinadorRequest;
    private PatrocinadorResponse patrocinadorResponse;
    private Evento evento;

    @BeforeEach
    void setUp() {
        evento = new Evento();
        evento.setId(1);
        evento.setNombre("Gala Benéfica");
        evento.setFecha(LocalDate.of(2025, 12, 20));
        evento.setLugar("Hotel Principal");

        patrocinador = new Patrocinador();
        patrocinador.setId(1);
        patrocinador.setNombre("Empresa ABC");
        patrocinador.setCantidadAportada(new BigDecimal("5000.00"));
        patrocinador.setTipoAportacion("Monetaria");
        patrocinador.setIdEvento(evento);

        patrocinadorRequest = new PatrocinadorRequest();
        patrocinadorRequest.setNombre("Empresa ABC");
        patrocinadorRequest.setCantidadAportada(new BigDecimal("5000.00"));
        patrocinadorRequest.setTipoAportacion("Monetaria");
        patrocinadorRequest.setIdEvento(1);

        patrocinadorResponse = new PatrocinadorResponse();
        patrocinadorResponse.setId(1);
        patrocinadorResponse.setNombre("Empresa ABC");
        patrocinadorResponse.setCantidadAportada(new BigDecimal("5000.00"));
        patrocinadorResponse.setTipoAportacion("Monetaria");
        patrocinadorResponse.setNombreEvento("Gala Benéfica");
    }

    @Test
    void testCreatePatrocinador_Success() {
        when(patrocinadorMapper.toEntity(patrocinadorRequest)).thenReturn(patrocinador);
        when(patrocinadorRepository.save(patrocinador)).thenReturn(patrocinador);
        when(patrocinadorMapper.toResponse(patrocinador)).thenReturn(patrocinadorResponse);

        PatrocinadorResponse result = patrocinadorService.createPatrocinador(patrocinadorRequest);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Empresa ABC", result.getNombre());
        verify(patrocinadorRepository, times(1)).save(patrocinador);
    }

    @Test
    void testGetPatrocinadorById_Success() {
        when(patrocinadorRepository.findById(1)).thenReturn(Optional.of(patrocinador));
        when(patrocinadorMapper.toResponse(patrocinador)).thenReturn(patrocinadorResponse);

        PatrocinadorResponse result = patrocinadorService.getPatrocinadorById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(patrocinadorRepository, times(1)).findById(1);
    }

    @Test
    void testGetPatrocinadoresByEventoId_Success() {
        List<Patrocinador> patrocinadores = Arrays.asList(patrocinador);
        when(patrocinadorRepository.findByIdEvento_Id(1)).thenReturn(patrocinadores);
        when(patrocinadorMapper.toResponse(any(Patrocinador.class))).thenReturn(patrocinadorResponse);

        List<PatrocinadorResponse> result = patrocinadorService.getPatrocinadoresByEventoId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(patrocinadorRepository, times(1)).findByIdEvento_Id(1);
    }

    @Test
    void testSearchPatrocinadoresByNombre_Success() {
        List<Patrocinador> patrocinadores = Arrays.asList(patrocinador);
        when(patrocinadorRepository.findByNombreContainingIgnoreCase("ABC")).thenReturn(patrocinadores);
        when(patrocinadorMapper.toResponse(any(Patrocinador.class))).thenReturn(patrocinadorResponse);

        List<PatrocinadorResponse> result = patrocinadorService.searchPatrocinadoresByNombre("ABC");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(patrocinadorRepository, times(1)).findByNombreContainingIgnoreCase("ABC");
    }
}

