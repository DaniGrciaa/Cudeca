package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UserService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioResponse> crearUsuario(@Valid @RequestBody UsuarioRequest request) {
        UsuarioResponse response = usuarioService.crearUsuario(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtenerUsuario(@PathVariable Integer id) {
        UsuarioResponse response = usuarioService.obtenerUsuario(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {
        List<UsuarioResponse> responses = usuarioService.listarUsuarios();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizarUsuario(
            @PathVariable Integer id,
            @Valid @RequestBody UsuarioRequest request) {
        UsuarioResponse response = usuarioService.actualizarUsuario(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Integer id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioResponse> obtenerUsuarioPorEmail(@PathVariable String email) {
        UsuarioResponse response = usuarioService.obtenerUsuarioPorEmail(email);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/rol/{rol}")
    public ResponseEntity<List<UsuarioResponse>> obtenerUsuariosPorRol(@PathVariable String rol) {
        List<UsuarioResponse> responses = usuarioService.obtenerUsuariosPorRol(rol);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UsuarioResponse>> buscarUsuariosPorNombre(@RequestParam String nombre) {
        List<UsuarioResponse> responses = usuarioService.buscarUsuariosPorNombre(nombre);
        return ResponseEntity.ok(responses);
    }

    @PatchMapping("/{id}/donar")
    public ResponseEntity<UsuarioResponse> incrementarDonacion(
            @PathVariable Integer id,
            @RequestParam java.math.BigDecimal cantidad) {
        UsuarioResponse response = usuarioService.incrementarDonacion(id, cantidad);
        return ResponseEntity.ok(response);
    }
}
