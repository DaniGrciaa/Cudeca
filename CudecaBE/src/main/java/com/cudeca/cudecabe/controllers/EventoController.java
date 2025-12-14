package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.evento.EventoFilterRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import com.cudeca.cudecabe.service.EventoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EventoController {

    private final EventoService eventoService;

    @PostMapping
    public ResponseEntity<EventoResponse> createEvento(@Valid @RequestBody EventoRequest request) {
        EventoResponse response = eventoService.createEvento(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoResponse> getEventoById(@PathVariable Integer id) {
        EventoResponse response = eventoService.getEventoById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EventoResponse>> getAllEventos() {
        List<EventoResponse> responses = eventoService.getAllEventos();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoResponse> updateEvento(
            @PathVariable Integer id,
            @Valid @RequestBody EventoRequest request) {
        EventoResponse response = eventoService.updateEvento(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvento(@PathVariable Integer id) {
        eventoService.deleteEvento(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<EventoResponse>> getEventosByFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        List<EventoResponse> responses = eventoService.getEventosByFecha(fecha);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventoResponse>> searchEventosByNombre(@RequestParam String nombre) {
        List<EventoResponse> responses = eventoService.searchEventosByNombre(nombre);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/rango-fecha")
    public ResponseEntity<List<EventoResponse>> getEventosByFechaRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        List<EventoResponse> responses = eventoService.getEventosByFechaRange(fechaInicio, fechaFin);
        return ResponseEntity.ok(responses);
    }

    // Nuevos endpoints de filtrado
    @GetMapping("/lugar")
    public ResponseEntity<List<EventoResponse>> getEventosByLugar(@RequestParam String lugar) {
        List<EventoResponse> responses = eventoService.getEventosByLugar(lugar);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/futuros")
    public ResponseEntity<List<EventoResponse>> getEventosFuturos() {
        List<EventoResponse> responses = eventoService.getEventosFuturos();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/pasados")
    public ResponseEntity<List<EventoResponse>> getEventosPasados() {
        List<EventoResponse> responses = eventoService.getEventosPasados();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/mes-anio")
    public ResponseEntity<List<EventoResponse>> getEventosByMesYAnio(
            @RequestParam Integer mes,
            @RequestParam Integer anio) {
        List<EventoResponse> responses = eventoService.getEventosByMesYAnio(mes, anio);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/filtrar")
    public ResponseEntity<List<EventoResponse>> filtrarEventos(@RequestBody EventoFilterRequest filtros) {
        List<EventoResponse> responses = eventoService.filtrarEventos(filtros);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<EventoResponse>> getEventosByTipo(@PathVariable String tipo) {
        List<EventoResponse> responses = eventoService.getEventosByTipo(tipo);
        return ResponseEntity.ok(responses);
    }
}

