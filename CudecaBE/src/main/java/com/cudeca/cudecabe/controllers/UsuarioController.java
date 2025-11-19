package com.cudeca.cudecabe.controllers;


import com.cudeca.cudecabe.DTOs.usuario.UsuarioRequest;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.mappers.UsuarioMapper;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UserService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioResponse> crearUsuario(@Valid @RequestBody UsuarioRequest request) {
        Usuario usuario = usuarioService.crearUsuario(request);
        return ResponseEntity.ok(UsuarioMapper.toResponse(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtenerUsuario(@PathVariable int id) {
        Usuario usuario = usuarioService.obtenerUsuario((long) id);
        return ResponseEntity.ok(UsuarioMapper.toResponse(usuario));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {
        List<Usuario> lista = usuarioService.listarUsuarios();
        return ResponseEntity.ok(
                lista.stream().map(UsuarioMapper::toResponse).toList()
        );
    }
}
