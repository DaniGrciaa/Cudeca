package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;
import com.cudeca.cudecabe.mappers.CompraMapper;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.CompraRepository;
import com.cudeca.cudecabe.service.serviceImpl.CompraServiceImpl;
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
class CompraServiceTest {

    @Mock
    private CompraRepository compraRepository;

    @Mock
    private CompraMapper compraMapper;

    @InjectMocks
    private CompraServiceImpl compraService;

    private Compra compra;
    private CompraRequest compraRequest;
    private CompraResponse compraResponse;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("Juan Pérez");
        usuario.setEmail("juan@example.com");

        compra = new Compra();
        compra.setId(1);
        compra.setFechaCompra(LocalDate.now());
        compra.setImporteTotal(new BigDecimal("100.00"));
        compra.setMetodoPago("Tarjeta");
        compra.setEstadoPago(true);
        compra.setTipoOperacion("COMPRA");
        compra.setCantidadElementos(2);
        compra.setEsDevolucion(false);
        compra.setIdUser(usuario);

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
        compraResponse.setNombreUsuario("Juan Pérez");
        compraResponse.setEmailUsuario("juan@example.com");
    }

    @Test
    void testCreateCompra_Success() {
        when(compraMapper.toEntity(compraRequest)).thenReturn(compra);
        when(compraRepository.save(compra)).thenReturn(compra);
        when(compraMapper.toResponse(compra)).thenReturn(compraResponse);

        CompraResponse result = compraService.createCompra(compraRequest);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Juan Pérez", result.getNombreUsuario());
        verify(compraRepository, times(1)).save(compra);
    }

    @Test
    void testGetCompraById_Success() {
        when(compraRepository.findById(1)).thenReturn(Optional.of(compra));
        when(compraMapper.toResponse(compra)).thenReturn(compraResponse);

        CompraResponse result = compraService.getCompraById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(compraRepository, times(1)).findById(1);
    }

    @Test
    void testGetCompraById_NotFound() {
        when(compraRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> compraService.getCompraById(1));
    }

    @Test
    void testGetAllCompras_Success() {
        List<Compra> compras = Arrays.asList(compra);
        when(compraRepository.findAll()).thenReturn(compras);
        when(compraMapper.toResponse(any(Compra.class))).thenReturn(compraResponse);

        List<CompraResponse> result = compraService.getAllCompras();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(compraRepository, times(1)).findAll();
    }

    @Test
    void testUpdateCompra_Success() {
        when(compraRepository.findById(1)).thenReturn(Optional.of(compra));
        doNothing().when(compraMapper).updateEntity(compraRequest, compra);
        when(compraRepository.save(compra)).thenReturn(compra);
        when(compraMapper.toResponse(compra)).thenReturn(compraResponse);

        CompraResponse result = compraService.updateCompra(1, compraRequest);

        assertNotNull(result);
        verify(compraMapper, times(1)).updateEntity(compraRequest, compra);
        verify(compraRepository, times(1)).save(compra);
    }

    @Test
    void testDeleteCompra_Success() {
        when(compraRepository.existsById(1)).thenReturn(true);
        doNothing().when(compraRepository).deleteById(1);

        assertDoesNotThrow(() -> compraService.deleteCompra(1));
        verify(compraRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteCompra_NotFound() {
        when(compraRepository.existsById(1)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> compraService.deleteCompra(1));
    }

    @Test
    void testGetComprasByUserId_Success() {
        List<Compra> compras = Arrays.asList(compra);
        when(compraRepository.findByIdUser_Id(1)).thenReturn(compras);
        when(compraMapper.toResponse(any(Compra.class))).thenReturn(compraResponse);

        List<CompraResponse> result = compraService.getComprasByUserId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(compraRepository, times(1)).findByIdUser_Id(1);
    }

    @Test
    void testGetComprasByEstadoPago_Success() {
        List<Compra> compras = Arrays.asList(compra);
        when(compraRepository.findByEstadoPago(true)).thenReturn(compras);
        when(compraMapper.toResponse(any(Compra.class))).thenReturn(compraResponse);

        List<CompraResponse> result = compraService.getComprasByEstadoPago(true);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(compraRepository, times(1)).findByEstadoPago(true);
    }

    @Test
    void testGetComprasByTipoOperacion_Success() {
        List<Compra> compras = Arrays.asList(compra);
        when(compraRepository.findByTipoOperacion("COMPRA")).thenReturn(compras);
        when(compraMapper.toResponse(any(Compra.class))).thenReturn(compraResponse);

        List<CompraResponse> result = compraService.getComprasByTipoOperacion("COMPRA");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(compraRepository, times(1)).findByTipoOperacion("COMPRA");
    }
}

