package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorRequest;
import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorResponse;
import com.cudeca.cudecabe.service.PatrocinadorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patrocinadores")
@RequiredArgsConstructor
public class PatrocinadorController {

    private final PatrocinadorService patrocinadorService;

    @PostMapping
    public ResponseEntity<PatrocinadorResponse> createPatrocinador(@Valid @RequestBody PatrocinadorRequest request) {
        PatrocinadorResponse response = patrocinadorService.createPatrocinador(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatrocinadorResponse> getPatrocinadorById(@PathVariable Integer id) {
        PatrocinadorResponse response = patrocinadorService.getPatrocinadorById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PatrocinadorResponse>> getAllPatrocinadores() {
        List<PatrocinadorResponse> responses = patrocinadorService.getAllPatrocinadores();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatrocinadorResponse> updatePatrocinador(
            @PathVariable Integer id,
            @Valid @RequestBody PatrocinadorRequest request) {
        PatrocinadorResponse response = patrocinadorService.updatePatrocinador(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatrocinador(@PathVariable Integer id) {
        patrocinadorService.deletePatrocinador(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<PatrocinadorResponse>> getPatrocinadoresByEventoId(@PathVariable Integer eventoId) {
        List<PatrocinadorResponse> responses = patrocinadorService.getPatrocinadoresByEventoId(eventoId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PatrocinadorResponse>> searchPatrocinadoresByNombre(@RequestParam String nombre) {
        List<PatrocinadorResponse> responses = patrocinadorService.searchPatrocinadoresByNombre(nombre);
        return ResponseEntity.ok(responses);
    }
}

