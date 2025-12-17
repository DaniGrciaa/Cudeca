package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.compraEvento.CarritoCompraRequest;
import com.cudeca.cudecabe.DTOs.compraEvento.CarritoCompraResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.CompraEventoRequest;
import com.cudeca.cudecabe.DTOs.compraEvento.CompraEventoResponse;
import com.cudeca.cudecabe.DTOs.compraEvento.EventoCompradoDTO;
import com.cudeca.cudecabe.mappers.CompraEventoMapper;
import com.cudeca.cudecabe.model.CompraEvento;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.CompraEventoRepository;
import com.cudeca.cudecabe.repository.EventoRepository;
import com.cudeca.cudecabe.repository.UserRepository;
import com.cudeca.cudecabe.service.CompraEventoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompraEventoServiceImpl implements CompraEventoService {

    private final CompraEventoRepository compraEventoRepository;
    private final UserRepository userRepository;
    private final EventoRepository eventoRepository;
    private final CompraEventoMapper compraEventoMapper;

    @Override
    @Transactional
    public CompraEventoResponse crearCompraEvento(Integer userId, CompraEventoRequest request) {
        // Validar que el usuario existe
        Usuario usuario = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + userId));

        // Validar que el evento existe
        Evento evento = eventoRepository.findById(request.getEventoId())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + request.getEventoId()));

        // Crear la compra
        CompraEvento compraEvento = new CompraEvento();
        compraEvento.setUsuario(usuario);
        compraEvento.setEvento(evento);
        compraEvento.setCantidadEntradas(request.getCantidadEntradas());
        compraEvento.setPrecioTotal(request.getPrecioTotal());
        compraEvento.setEstado("COMPLETADO");

        // Guardar la compra
        CompraEvento savedCompra = compraEventoRepository.save(compraEvento);

        return compraEventoMapper.toResponse(savedCompra);
    }

    @Override
    @Transactional
    public CarritoCompraResponse comprarCarrito(Integer userId, CarritoCompraRequest carritoRequest) {
        // Validar que el usuario existe
        Usuario usuario = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + userId));

        List<CompraEventoResponse> comprasRealizadas = new ArrayList<>();
        int totalEntradas = 0;
        BigDecimal precioTotal = BigDecimal.ZERO;

        // Procesar cada evento del carrito
        for (CompraEventoRequest item : carritoRequest.getEventos()) {
            // Validar que el evento existe
            Evento evento = eventoRepository.findById(item.getEventoId())
                    .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + item.getEventoId()));

            // Crear la compra para este evento
            CompraEvento compraEvento = new CompraEvento();
            compraEvento.setUsuario(usuario);
            compraEvento.setEvento(evento);
            compraEvento.setCantidadEntradas(item.getCantidadEntradas());
            compraEvento.setPrecioTotal(item.getPrecioTotal());
            compraEvento.setEstado("COMPLETADO");

            // Guardar la compra
            CompraEvento savedCompra = compraEventoRepository.save(compraEvento);

            // Agregar a la lista de respuestas
            comprasRealizadas.add(compraEventoMapper.toResponse(savedCompra));

            // Acumular totales
            totalEntradas += item.getCantidadEntradas();
            precioTotal = precioTotal.add(item.getPrecioTotal());
        }

        // Crear respuesta del carrito
        CarritoCompraResponse response = new CarritoCompraResponse();
        response.setTotalEventos(carritoRequest.getEventos().size());
        response.setTotalEntradas(totalEntradas);
        response.setPrecioTotal(precioTotal);
        response.setCompras(comprasRealizadas);
        response.setMensaje("Carrito procesado exitosamente. Se compraron " +
                           carritoRequest.getEventos().size() + " eventos.");

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraEventoResponse> getComprasByUsuario(Integer userId) {
        // Validar que el usuario existe
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("Usuario no encontrado con id: " + userId);
        }

        List<CompraEvento> compras = compraEventoRepository.findEventosCompradosByUsuario(userId);
        return compras.stream()
                .map(compraEventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoCompradoDTO> getEventosCompradosByUsuario(Integer userId) {
        // Validar que el usuario existe
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("Usuario no encontrado con id: " + userId);
        }

        List<CompraEvento> compras = compraEventoRepository.findEventosCompradosByUsuario(userId);
        return compras.stream()
                .map(compraEventoMapper::toEventoCompradoDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraEventoResponse> getComprasByEvento(Integer eventoId) {
        // Validar que el evento existe
        if (!eventoRepository.existsById(eventoId)) {
            throw new RuntimeException("Evento no encontrado con id: " + eventoId);
        }

        List<CompraEvento> compras = compraEventoRepository.findUsuariosCompradoresByEvento(eventoId);
        return compras.stream()
                .map(compraEventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CompraEventoResponse getCompraById(Integer compraId) {
        CompraEvento compra = compraEventoRepository.findById(compraId)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada con id: " + compraId));
        return compraEventoMapper.toResponse(compra);
    }

    @Override
    @Transactional
    public CompraEventoResponse actualizarEstadoCompra(Integer compraId, String nuevoEstado) {
        CompraEvento compra = compraEventoRepository.findById(compraId)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada con id: " + compraId));

        // Validar estados permitidos
        List<String> estadosPermitidos = List.of("COMPLETADO", "PENDIENTE", "CANCELADO");
        if (!estadosPermitidos.contains(nuevoEstado.toUpperCase())) {
            throw new RuntimeException("Estado no válido. Estados permitidos: COMPLETADO, PENDIENTE, CANCELADO");
        }

        compra.setEstado(nuevoEstado.toUpperCase());
        CompraEvento updatedCompra = compraEventoRepository.save(compra);
        return compraEventoMapper.toResponse(updatedCompra);
    }

    @Override
    @Transactional
    public CompraEventoResponse cancelarCompra(Integer compraId) {
        return actualizarEstadoCompra(compraId, "CANCELADO");
    }

    @Override
    @Transactional(readOnly = true)
    public boolean usuarioYaComproEvento(Integer userId, Integer eventoId) {
        return compraEventoRepository.existsByUsuarioIdAndEventoId(userId, eventoId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraEventoResponse> getComprasByFechaRange(LocalDateTime inicio, LocalDateTime fin) {
        List<CompraEvento> compras = compraEventoRepository.findByFechaCompraBetween(inicio, fin);
        return compras.stream()
                .map(compraEventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Long countEventosCompradosByUsuario(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("Usuario no encontrado con id: " + userId);
        }
        return compraEventoRepository.countComprasByUsuario(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Long countUsuariosByEvento(Integer eventoId) {
        if (!eventoRepository.existsById(eventoId)) {
            throw new RuntimeException("Evento no encontrado con id: " + eventoId);
        }
        return compraEventoRepository.countComprasByEvento(eventoId);
    }
}

