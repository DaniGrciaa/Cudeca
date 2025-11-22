package com.cudeca.cudecabe.mappers;

import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import com.cudeca.cudecabe.model.Evento;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class EventoMapperTest {

    private EventoMapper eventoMapper;
    private EventoRequest eventoRequest;
    private Evento evento;

    @BeforeEach
    void setUp() {
        eventoMapper = new EventoMapper();

        eventoRequest = new EventoRequest();
        eventoRequest.setNombre("Gala Benéfica");
        eventoRequest.setFecha(LocalDate.of(2025, 12, 20));
        eventoRequest.setDescripcion("Evento para recaudar fondos");
        eventoRequest.setLugar("Hotel Gran Vía");
        eventoRequest.setTotalRecaudado(new BigDecimal("5000.00"));

        evento = new Evento();
        evento.setId(1);
        evento.setNombre("Gala Benéfica");
        evento.setFecha(LocalDate.of(2025, 12, 20));
        evento.setDescripcion("Evento para recaudar fondos");
        evento.setLugar("Hotel Gran Vía");
        evento.setTotalRecaudado(new BigDecimal("5000.00"));
    }

    @Test
    void testToEntity_Success() {
        Evento result = eventoMapper.toEntity(eventoRequest);

        assertNotNull(result);
        assertEquals(eventoRequest.getNombre(), result.getNombre());
        assertEquals(eventoRequest.getFecha(), result.getFecha());
        assertEquals(eventoRequest.getDescripcion(), result.getDescripcion());
        assertEquals(eventoRequest.getLugar(), result.getLugar());
        assertEquals(eventoRequest.getTotalRecaudado(), result.getTotalRecaudado());
    }

    @Test
    void testToEntity_WithDefaultValues() {
        EventoRequest requestWithoutOptionals = new EventoRequest();
        requestWithoutOptionals.setNombre("Evento Simple");

        Evento result = eventoMapper.toEntity(requestWithoutOptionals);

        assertNotNull(result);
        assertEquals("Evento Simple", result.getNombre());
        assertNotNull(result.getFecha());
        assertEquals(BigDecimal.ZERO, result.getTotalRecaudado());
    }

    @Test
    void testToResponse_Success() {
        EventoResponse result = eventoMapper.toResponse(evento);

        assertNotNull(result);
        assertEquals(evento.getId(), result.getId());
        assertEquals(evento.getNombre(), result.getNombre());
        assertEquals(evento.getFecha(), result.getFecha());
        assertEquals(evento.getDescripcion(), result.getDescripcion());
        assertEquals(evento.getLugar(), result.getLugar());
        assertEquals(evento.getTotalRecaudado(), result.getTotalRecaudado());
    }

    @Test
    void testUpdateEntity_Success() {
        EventoRequest updateRequest = new EventoRequest();
        updateRequest.setNombre("Gala Benéfica Actualizada");
        updateRequest.setLugar("Teatro Nacional");
        updateRequest.setTotalRecaudado(new BigDecimal("7500.00"));

        eventoMapper.updateEntity(updateRequest, evento);

        assertEquals("Gala Benéfica Actualizada", evento.getNombre());
        assertEquals("Teatro Nacional", evento.getLugar());
        assertEquals(new BigDecimal("7500.00"), evento.getTotalRecaudado());
    }

    @Test
    void testUpdateEntity_PartialUpdate() {
        EventoRequest updateRequest = new EventoRequest();
        updateRequest.setDescripcion("Nueva descripción");

        String nombreOriginal = evento.getNombre();
        eventoMapper.updateEntity(updateRequest, evento);

        assertEquals("Nueva descripción", evento.getDescripcion());
        assertEquals(nombreOriginal, evento.getNombre());
    }

    @Test
    void testUpdateEntity_NullValues() {
        EventoRequest updateRequest = new EventoRequest();

        String nombreOriginal = evento.getNombre();
        LocalDate fechaOriginal = evento.getFecha();

        eventoMapper.updateEntity(updateRequest, evento);

        assertEquals(nombreOriginal, evento.getNombre());
        assertEquals(fechaOriginal, evento.getFecha());
    }
}

