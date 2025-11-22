package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.rifa.RifaRequest;
import com.cudeca.cudecabe.DTOs.rifa.RifaResponse;
import com.cudeca.cudecabe.mappers.RifaMapper;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Rifa;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.RifaRepository;
import com.cudeca.cudecabe.service.serviceImpl.RifaServiceImpl;
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
class RifaServiceTest {

    @Mock
    private RifaRepository rifaRepository;

    @Mock
    private RifaMapper rifaMapper;

    @InjectMocks
    private RifaServiceImpl rifaService;

    private Rifa rifa;
    private RifaRequest rifaRequest;
    private RifaResponse rifaResponse;
    private Compra compra;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("María López");
        usuario.setEmail("maria@example.com");

        compra = new Compra();
        compra.setId(1);
        compra.setIdUser(usuario);

        rifa = new Rifa();
        rifa.setId(1);
        rifa.setPrecio(new BigDecimal("10.00"));
        rifa.setCantidad(5);
        rifa.setFecha(LocalDate.now());
        rifa.setIdCompra(compra);

        rifaRequest = new RifaRequest();
        rifaRequest.setPrecio(new BigDecimal("10.00"));
        rifaRequest.setCantidad(5);
        rifaRequest.setFecha(LocalDate.now());
        rifaRequest.setIdCompra(1);

        rifaResponse = new RifaResponse();
        rifaResponse.setId(1);
        rifaResponse.setPrecio(new BigDecimal("10.00"));
        rifaResponse.setCantidad(5);
        rifaResponse.setFecha(LocalDate.now());
        rifaResponse.setNombreUsuario("María López");
        rifaResponse.setEmailUsuario("maria@example.com");
    }

    @Test
    void testCreateRifa_Success() {
        when(rifaMapper.toEntity(rifaRequest)).thenReturn(rifa);
        when(rifaRepository.save(rifa)).thenReturn(rifa);
        when(rifaMapper.toResponse(rifa)).thenReturn(rifaResponse);

        RifaResponse result = rifaService.createRifa(rifaRequest);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("María López", result.getNombreUsuario());
        verify(rifaRepository, times(1)).save(rifa);
    }

    @Test
    void testGetRifaById_Success() {
        when(rifaRepository.findById(1)).thenReturn(Optional.of(rifa));
        when(rifaMapper.toResponse(rifa)).thenReturn(rifaResponse);

        RifaResponse result = rifaService.getRifaById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(rifaRepository, times(1)).findById(1);
    }

    @Test
    void testGetRifasByCompraId_Success() {
        List<Rifa> rifas = Arrays.asList(rifa);
        when(rifaRepository.findByIdCompra_Id(1)).thenReturn(rifas);
        when(rifaMapper.toResponse(any(Rifa.class))).thenReturn(rifaResponse);

        List<RifaResponse> result = rifaService.getRifasByCompraId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(rifaRepository, times(1)).findByIdCompra_Id(1);
    }

    @Test
    void testDeleteRifa_Success() {
        when(rifaRepository.existsById(1)).thenReturn(true);
        doNothing().when(rifaRepository).deleteById(1);

        assertDoesNotThrow(() -> rifaService.deleteRifa(1));
        verify(rifaRepository, times(1)).deleteById(1);
    }
}

