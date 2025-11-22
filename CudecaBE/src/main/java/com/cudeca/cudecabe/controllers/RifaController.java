package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.rifa.RifaRequest;
import com.cudeca.cudecabe.DTOs.rifa.RifaResponse;
import com.cudeca.cudecabe.service.RifaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rifas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RifaController {

    private final RifaService rifaService;

    @PostMapping
    public ResponseEntity<RifaResponse> createRifa(@Valid @RequestBody RifaRequest request) {
        RifaResponse response = rifaService.createRifa(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RifaResponse> getRifaById(@PathVariable Integer id) {
        RifaResponse response = rifaService.getRifaById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<RifaResponse>> getAllRifas() {
        List<RifaResponse> responses = rifaService.getAllRifas();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RifaResponse> updateRifa(
            @PathVariable Integer id,
            @Valid @RequestBody RifaRequest request) {
        RifaResponse response = rifaService.updateRifa(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRifa(@PathVariable Integer id) {
        rifaService.deleteRifa(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/compra/{compraId}")
    public ResponseEntity<List<RifaResponse>> getRifasByCompraId(@PathVariable Integer compraId) {
        List<RifaResponse> responses = rifaService.getRifasByCompraId(compraId);
        return ResponseEntity.ok(responses);
    }
}

