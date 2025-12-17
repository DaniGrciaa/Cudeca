package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.compraEvento.CarritoCompraRequest;
import com.cudeca.cudecabe.DTOs.compraEvento.CarritoCompraResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.CompraEventoRequest;
import com.cudeca.cudecabe.DTOs.compraEvento.CompraEventoResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.EventoCompradoDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface CompraEventoService {

    /**
     * Registra una nueva compra de evento para un usuario
     */
    CompraEventoResponse crearCompraEvento(Integer userId, CompraEventoRequest request);

    /**
     * Compra múltiples eventos a la vez (carrito)
     */
    CarritoCompraResponse comprarCarrito(Integer userId, CarritoCompraRequest carritoRequest);

    /**
     * Obtiene todas las compras de eventos de un usuario específico
     */
    List<CompraEventoResponse> getComprasByUsuario(Integer userId);

    /**
     * Obtiene todos los eventos comprados por un usuario (formato simplificado)
     */
    List<EventoCompradoDTO> getEventosCompradosByUsuario(Integer userId);

    /**
     * Obtiene todas las compras de un evento específico
     */
    List<CompraEventoResponse> getComprasByEvento(Integer eventoId);

    /**
     * Obtiene una compra específica por su ID
     */
    CompraEventoResponse getCompraById(Integer compraId);

    /**
     * Actualiza el estado de una compra
     */
    CompraEventoResponse actualizarEstadoCompra(Integer compraId, String nuevoEstado);

    /**
     * Cancela una compra (cambia estado a CANCELADO)
     */
    CompraEventoResponse cancelarCompra(Integer compraId);

    /**
     * Verifica si un usuario ya compró un evento específico
     */
    boolean usuarioYaComproEvento(Integer userId, Integer eventoId);

    /**
     * Obtiene compras por rango de fechas
     */
    List<CompraEventoResponse> getComprasByFechaRange(LocalDateTime inicio, LocalDateTime fin);

    /**
     * Obtiene el total de eventos comprados por un usuario
     */
    Long countEventosCompradosByUsuario(Integer userId);

    /**
     * Obtiene el total de usuarios que compraron un evento
     */
    Long countUsuariosByEvento(Integer eventoId);
}

