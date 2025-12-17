package com.cudeca.cudecabe.controllers;

import com.cudeca.cudecabe.DTOs.compraEvento.CarritoCompraRequest;
import com.cudeca.cudecabe.DTOs.compraEvento.CarritoCompraResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.CompraEventoResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.EventoCompradoDTO;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioResponse;
import com.cudeca.cudecabe.service.CompraEventoService;
import com.cudeca.cudecabe.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/compras-eventos")
@RequiredArgsConstructor
public class CompraEventoController {

    private final CompraEventoService compraEventoService;
    private final UserService userService;

    /**
     * Comprar eventos (uno o varios) - Endpoint unificado
     * POST /api/compras-eventos
     *
     * El frontend envía un array de eventos, puede ser 1 o muchos
     */
    @PostMapping
    public ResponseEntity<CarritoCompraResponse> comprarEventos(
            @Valid @RequestBody CarritoCompraRequest carritoRequest,
            Authentication authentication) {

        // Obtener el ID del usuario autenticado desde el token JWT
        Integer userId = getUserIdFromAuthentication(authentication);

        // Procesar la compra (puede ser uno o múltiples eventos)
        CarritoCompraResponse response = compraEventoService.comprarCarrito(userId, carritoRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Obtener todas las compras del usuario autenticado
     * GET /api/compras-eventos/mis-compras
     */
    @GetMapping("/mis-compras")
    public ResponseEntity<List<CompraEventoResponse>> getMisCompras(Authentication authentication) {
        Integer userId = getUserIdFromAuthentication(authentication);
        List<CompraEventoResponse> compras = compraEventoService.getComprasByUsuario(userId);
        return ResponseEntity.ok(compras);
    }

    /**
     * Obtener eventos comprados por el usuario autenticado (versión simplificada)
     * GET /api/compras-eventos/mis-eventos
     */
    @GetMapping("/mis-eventos")
    public ResponseEntity<List<EventoCompradoDTO>> getMisEventosComprados(Authentication authentication) {
        Integer userId = getUserIdFromAuthentication(authentication);
        List<EventoCompradoDTO> eventos = compraEventoService.getEventosCompradosByUsuario(userId);
        return ResponseEntity.ok(eventos);
    }

    /**
     * Obtener todas las compras de un usuario específico (para admins)
     * GET /api/compras-eventos/usuario/{userId}
     */
    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<CompraEventoResponse>> getComprasByUsuario(@PathVariable Integer userId) {
        List<CompraEventoResponse> compras = compraEventoService.getComprasByUsuario(userId);
        return ResponseEntity.ok(compras);
    }

    /**
     * Obtener eventos comprados por un usuario específico (para admins)
     * GET /api/compras-eventos/usuario/{userId}/eventos
     */
    @GetMapping("/usuario/{userId}/eventos")
    public ResponseEntity<List<EventoCompradoDTO>> getEventosCompradosByUsuario(@PathVariable Integer userId) {
        List<EventoCompradoDTO> eventos = compraEventoService.getEventosCompradosByUsuario(userId);
        return ResponseEntity.ok(eventos);
    }

    /**
     * Obtener todas las compras de un evento específico
     * GET /api/compras-eventos/evento/{eventoId}
     */
    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<CompraEventoResponse>> getComprasByEvento(@PathVariable Integer eventoId) {
        List<CompraEventoResponse> compras = compraEventoService.getComprasByEvento(eventoId);
        return ResponseEntity.ok(compras);
    }

    /**
     * Obtener una compra específica por ID
     * GET /api/compras-eventos/{compraId}
     */
    @GetMapping("/{compraId}")
    public ResponseEntity<CompraEventoResponse> getCompraById(@PathVariable Integer compraId) {
        CompraEventoResponse compra = compraEventoService.getCompraById(compraId);
        return ResponseEntity.ok(compra);
    }

    /**
     * Actualizar el estado de una compra
     * PATCH /api/compras-eventos/{compraId}/estado
     */
    @PatchMapping("/{compraId}/estado")
    public ResponseEntity<CompraEventoResponse> actualizarEstado(
            @PathVariable Integer compraId,
            @RequestBody Map<String, String> body) {

        String nuevoEstado = body.get("estado");
        if (nuevoEstado == null || nuevoEstado.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        CompraEventoResponse response = compraEventoService.actualizarEstadoCompra(compraId, nuevoEstado);
        return ResponseEntity.ok(response);
    }

    /**
     * Cancelar una compra
     * POST /api/compras-eventos/{compraId}/cancelar
     */
    @PostMapping("/{compraId}/cancelar")
    public ResponseEntity<CompraEventoResponse> cancelarCompra(@PathVariable Integer compraId) {
        CompraEventoResponse response = compraEventoService.cancelarCompra(compraId);
        return ResponseEntity.ok(response);
    }

    /**
     * Verificar si el usuario ya compró un evento
     * GET /api/compras-eventos/verificar/evento/{eventoId}
     */
    @GetMapping("/verificar/evento/{eventoId}")
    public ResponseEntity<Map<String, Boolean>> verificarCompra(
            @PathVariable Integer eventoId,
            Authentication authentication) {

        Integer userId = getUserIdFromAuthentication(authentication);
        boolean yaCompro = compraEventoService.usuarioYaComproEvento(userId, eventoId);
        return ResponseEntity.ok(Map.of("yaCompro", yaCompro));
    }

    /**
     * Obtener compras por rango de fechas
     * GET /api/compras-eventos/rango-fecha
     */
    @GetMapping("/rango-fecha")
    public ResponseEntity<List<CompraEventoResponse>> getComprasByFechaRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {

        List<CompraEventoResponse> compras = compraEventoService.getComprasByFechaRange(inicio, fin);
        return ResponseEntity.ok(compras);
    }

    /**
     * Obtener el total de eventos comprados por el usuario autenticado
     * GET /api/compras-eventos/mis-eventos/count
     */
    @GetMapping("/mis-eventos/count")
    public ResponseEntity<Map<String, Long>> countMisEventosComprados(Authentication authentication) {
        Integer userId = getUserIdFromAuthentication(authentication);
        Long count = compraEventoService.countEventosCompradosByUsuario(userId);
        return ResponseEntity.ok(Map.of("totalEventosComprados", count));
    }

    /**
     * Obtener el total de usuarios que compraron un evento
     * GET /api/compras-eventos/evento/{eventoId}/count
     */
    @GetMapping("/evento/{eventoId}/count")
    public ResponseEntity<Map<String, Long>> countUsuariosByEvento(@PathVariable Integer eventoId) {
        Long count = compraEventoService.countUsuariosByEvento(eventoId);
        return ResponseEntity.ok(Map.of("totalCompradores", count));
    }

    /**
     * Método auxiliar para extraer el ID del usuario desde el objeto Authentication
     */
    private Integer getUserIdFromAuthentication(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuario no autenticado");
        }

        // El nombre en authentication es el email del usuario
        String email = authentication.getName();

        // Obtener el usuario por email y extraer su ID
        UsuarioResponse usuario = userService.obtenerUsuarioPorEmail(email);
        return usuario.getId();
    }
}

