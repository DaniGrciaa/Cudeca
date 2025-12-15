package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.LoginRequestDTO;
import com.cudeca.cudecabe.DTOs.LoginResponseDTO;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioRegisterRequest;
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
     * Endpoint para registrar un nuevo usuario con dirección
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UsuarioRegisterRequest registerRequest) {
        try {
            LoginResponseDTO response = authService.registrarConDireccion(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
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
     * Endpoint para refrescar el token
     * POST /api/auth/refresh
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody com.cudeca.cudecabe.DTOs.RefreshTokenRequestDTO refreshRequest) {
        try {
            LoginResponseDTO response = authService.refreshToken(refreshRequest.getRefreshToken());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage()));
        }
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

