package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.entrada.EntradaRequest;
import com.cudeca.cudecabe.DTOs.entrada.EntradaResponse;
import com.cudeca.cudecabe.service.EntradaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entradas")
@RequiredArgsConstructor
public class EntradaController {

    private final EntradaService entradaService;

    @PostMapping
    public ResponseEntity<EntradaResponse> createEntrada(@Valid @RequestBody EntradaRequest request) {
        EntradaResponse response = entradaService.createEntrada(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntradaResponse> getEntradaById(@PathVariable Integer id) {
        EntradaResponse response = entradaService.getEntradaById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EntradaResponse>> getAllEntradas() {
        List<EntradaResponse> responses = entradaService.getAllEntradas();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntradaResponse> updateEntrada(
            @PathVariable Integer id,
            @Valid @RequestBody EntradaRequest request) {
        EntradaResponse response = entradaService.updateEntrada(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntrada(@PathVariable Integer id) {
        entradaService.deleteEntrada(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<EntradaResponse>> getEntradasByEventoId(@PathVariable Integer eventoId) {
        List<EntradaResponse> responses = entradaService.getEntradasByEventoId(eventoId);
        return ResponseEntity.ok(responses);
    }
}

