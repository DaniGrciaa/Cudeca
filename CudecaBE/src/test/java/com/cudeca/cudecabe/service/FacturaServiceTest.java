package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.factura.FacturaRequest;
import com.cudeca.cudecabe.DTOs.factura.FacturaResponse;
import com.cudeca.cudecabe.mappers.FacturaMapper;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Factura;
import com.cudeca.cudecabe.repository.FacturaRepository;
import com.cudeca.cudecabe.service.serviceImpl.FacturaServiceImpl;
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
class FacturaServiceTest {

    @Mock
    private FacturaRepository facturaRepository;

    @Mock
    private FacturaMapper facturaMapper;

    @InjectMocks
    private FacturaServiceImpl facturaService;

    private Factura factura;
    private FacturaRequest facturaRequest;
    private FacturaResponse facturaResponse;
    private Compra compra;

    @BeforeEach
    void setUp() {
        compra = new Compra();
        compra.setId(1);
        compra.setFechaCompra(LocalDate.now());
        compra.setMetodoPago("Tarjeta");

        factura = new Factura();
        factura.setId(1);
        factura.setFechaEmision(LocalDate.now());
        factura.setImporte(new BigDecimal("100.00"));
        factura.setIva(new BigDecimal("21.00"));
        factura.setDatosUsuario("Juan Pérez - juan@example.com");
        factura.setIdCompra(compra);

        facturaRequest = new FacturaRequest();
        facturaRequest.setImporte(new BigDecimal("100.00"));
        facturaRequest.setIva(new BigDecimal("21.00"));
        facturaRequest.setDatosUsuario("Juan Pérez - juan@example.com");
        facturaRequest.setIdCompra(1);

        facturaResponse = new FacturaResponse();
        facturaResponse.setId(1);
        facturaResponse.setFechaEmision(LocalDate.now());
        facturaResponse.setImporte(new BigDecimal("100.00"));
        facturaResponse.setIva(new BigDecimal("21.00"));
        facturaResponse.setImporteTotal(new BigDecimal("121.00"));
    }

    @Test
    void testCreateFactura_Success() {
        when(facturaMapper.toEntity(facturaRequest)).thenReturn(factura);
        when(facturaRepository.save(factura)).thenReturn(factura);
        when(facturaMapper.toResponse(factura)).thenReturn(facturaResponse);

        FacturaResponse result = facturaService.createFactura(facturaRequest);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(facturaRepository, times(1)).save(factura);
    }

    @Test
    void testGetFacturaById_Success() {
        when(facturaRepository.findById(1)).thenReturn(Optional.of(factura));
        when(facturaMapper.toResponse(factura)).thenReturn(facturaResponse);

        FacturaResponse result = facturaService.getFacturaById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(facturaRepository, times(1)).findById(1);
    }

    @Test
    void testGetFacturasByCompraId_Success() {
        List<Factura> facturas = Arrays.asList(factura);
        when(facturaRepository.findByIdCompra_Id(1)).thenReturn(facturas);
        when(facturaMapper.toResponse(any(Factura.class))).thenReturn(facturaResponse);

        List<FacturaResponse> result = facturaService.getFacturasByCompraId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(facturaRepository, times(1)).findByIdCompra_Id(1);
    }

    @Test
    void testDeleteFactura_Success() {
        when(facturaRepository.existsById(1)).thenReturn(true);
        doNothing().when(facturaRepository).deleteById(1);

        assertDoesNotThrow(() -> facturaService.deleteFactura(1));
        verify(facturaRepository, times(1)).deleteById(1);
    }
}

