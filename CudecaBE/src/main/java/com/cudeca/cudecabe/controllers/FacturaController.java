package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.factura.FacturaRequest;
import com.cudeca.cudecabe.DTOs.factura.FacturaResponse;
import com.cudeca.cudecabe.service.FacturaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@RequiredArgsConstructor
public class FacturaController {

    private final FacturaService facturaService;

    @PostMapping
    public ResponseEntity<FacturaResponse> createFactura(@Valid @RequestBody FacturaRequest request) {
        FacturaResponse response = facturaService.createFactura(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacturaResponse> getFacturaById(@PathVariable Integer id) {
        FacturaResponse response = facturaService.getFacturaById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<FacturaResponse>> getAllFacturas() {
        List<FacturaResponse> responses = facturaService.getAllFacturas();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacturaResponse> updateFactura(
            @PathVariable Integer id,
            @Valid @RequestBody FacturaRequest request) {
        FacturaResponse response = facturaService.updateFactura(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFactura(@PathVariable Integer id) {
        facturaService.deleteFactura(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/compra/{compraId}")
    public ResponseEntity<List<FacturaResponse>> getFacturasByCompraId(@PathVariable Integer compraId) {
        List<FacturaResponse> responses = facturaService.getFacturasByCompraId(compraId);
        return ResponseEntity.ok(responses);
    }
}

