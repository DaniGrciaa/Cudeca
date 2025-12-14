package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.LoginRequestDTO;
import com.cudeca.cudecabe.DTOs.LoginResponseDTO;
import com.cudeca.cudecabe.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Endpoint para login
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = authService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Endpoint para verificar si el token es válido
     * GET /api/auth/validate
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        // Si llegamos aquí, el token es válido (pasó por el filtro JWT)
        return ResponseEntity.ok(new MessageResponse("Token válido"));
    }

    /**
     * Clase interna para respuestas de error
     */
    private record ErrorResponse(String error) {}

    /**
     * Clase interna para respuestas de mensaje
     */
    private record MessageResponse(String mensaje) {}
}

