package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.model.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class CompraMapperTest {

    private CompraMapper compraMapper;
    private CompraRequest compraRequest;
    private Compra compra;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        compraMapper = new CompraMapper();

        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("Juan Pérez");
        usuario.setEmail("juan@example.com");

        compraRequest = new CompraRequest();
        compraRequest.setFechaCompra(LocalDate.of(2025, 11, 22));
        compraRequest.setImporteTotal(new BigDecimal("150.00"));
        compraRequest.setMetodoPago("Tarjeta");
        compraRequest.setEstadoPago(true);
        compraRequest.setTipoOperacion("COMPRA");
        compraRequest.setCantidadElementos(3);
        compraRequest.setEsDevolucion(false);
        compraRequest.setIdUser(1);

        compra = new Compra();
        compra.setId(1);
        compra.setFechaCompra(LocalDate.of(2025, 11, 22));
        compra.setImporteTotal(new BigDecimal("150.00"));
        compra.setMetodoPago("Tarjeta");
        compra.setEstadoPago(true);
        compra.setTipoOperacion("COMPRA");
        compra.setCantidadElementos(3);
        compra.setEsDevolucion(false);
        compra.setIdUser(usuario);
    }

    @Test
    void testToEntity_Success() {
        Compra result = compraMapper.toEntity(compraRequest);

        assertNotNull(result);
        assertEquals(compraRequest.getImporteTotal(), result.getImporteTotal());
        assertEquals(compraRequest.getMetodoPago(), result.getMetodoPago());
        assertEquals(compraRequest.getTipoOperacion(), result.getTipoOperacion());
        assertEquals(compraRequest.getCantidadElementos(), result.getCantidadElementos());
        assertNotNull(result.getIdUser());
        assertEquals(1, result.getIdUser().getId());
    }

    @Test
    void testToEntity_WithDefaultValues() {
        CompraRequest requestWithoutOptionals = new CompraRequest();
        requestWithoutOptionals.setImporteTotal(new BigDecimal("100.00"));
        requestWithoutOptionals.setMetodoPago("Efectivo");
        requestWithoutOptionals.setTipoOperacion("COMPRA");
        requestWithoutOptionals.setCantidadElementos(1);
        requestWithoutOptionals.setIdUser(1);

        Compra result = compraMapper.toEntity(requestWithoutOptionals);

        assertNotNull(result);
        assertNotNull(result.getFechaCompra());
        assertTrue(result.getEstadoPago());
        assertFalse(result.getEsDevolucion());
    }

    @Test
    void testToResponse_Success() {
        CompraResponse result = compraMapper.toResponse(compra);

        assertNotNull(result);
        assertEquals(compra.getId(), result.getId());
        assertEquals(compra.getImporteTotal(), result.getImporteTotal());
        assertEquals(compra.getMetodoPago(), result.getMetodoPago());
        assertEquals(compra.getTipoOperacion(), result.getTipoOperacion());
        assertEquals("Juan Pérez", result.getNombreUsuario());
        assertEquals("juan@example.com", result.getEmailUsuario());
    }

    @Test
    void testToResponse_WithCompraOriginal() {
        Compra compraOriginal = new Compra();
        compraOriginal.setId(5);
        compra.setIdCompraOriginal(compraOriginal);

        CompraResponse result = compraMapper.toResponse(compra);

        assertNotNull(result);
        assertEquals(5, result.getCompraOriginalId());
    }

    @Test
    void testUpdateEntity_Success() {
        CompraRequest updateRequest = new CompraRequest();
        updateRequest.setImporteTotal(new BigDecimal("200.00"));
        updateRequest.setMetodoPago("Transferencia");
        updateRequest.setEstadoPago(false);

        compraMapper.updateEntity(updateRequest, compra);

        assertEquals(new BigDecimal("200.00"), compra.getImporteTotal());
        assertEquals("Transferencia", compra.getMetodoPago());
        assertFalse(compra.getEstadoPago());
    }

    @Test
    void testUpdateEntity_PartialUpdate() {
        CompraRequest updateRequest = new CompraRequest();
        updateRequest.setMetodoPago("PayPal");

        BigDecimal importeOriginal = compra.getImporteTotal();
        compraMapper.updateEntity(updateRequest, compra);

        assertEquals("PayPal", compra.getMetodoPago());
        assertEquals(importeOriginal, compra.getImporteTotal());
    }
}

