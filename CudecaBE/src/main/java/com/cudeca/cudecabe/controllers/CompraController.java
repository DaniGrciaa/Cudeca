package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;
import com.cudeca.cudecabe.service.CompraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;

    @PostMapping
    public ResponseEntity<CompraResponse> createCompra(@Valid @RequestBody CompraRequest request) {
        CompraResponse response = compraService.createCompra(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompraResponse> getCompraById(@PathVariable Integer id) {
        CompraResponse response = compraService.getCompraById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CompraResponse>> getAllCompras() {
        List<CompraResponse> responses = compraService.getAllCompras();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompraResponse> updateCompra(
            @PathVariable Integer id,
            @Valid @RequestBody CompraRequest request) {
        CompraResponse response = compraService.updateCompra(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompra(@PathVariable Integer id) {
        compraService.deleteCompra(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<CompraResponse>> getComprasByUserId(@PathVariable Integer userId) {
        List<CompraResponse> responses = compraService.getComprasByUserId(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/estado-pago/{estadoPago}")
    public ResponseEntity<List<CompraResponse>> getComprasByEstadoPago(@PathVariable Boolean estadoPago) {
        List<CompraResponse> responses = compraService.getComprasByEstadoPago(estadoPago);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/tipo-operacion/{tipoOperacion}")
    public ResponseEntity<List<CompraResponse>> getComprasByTipoOperacion(@PathVariable String tipoOperacion) {
        List<CompraResponse> responses = compraService.getComprasByTipoOperacion(tipoOperacion);
        return ResponseEntity.ok(responses);
    }
}

