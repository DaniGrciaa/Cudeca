package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.evento.EventoFilterRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoRequest;
import com.cudeca.cudecabe.DTOs.evento.EventoResponse;
import com.cudeca.cudecabe.mappers.EventoMapper;
import com.cudeca.cudecabe.model.Evento;
import com.cudeca.cudecabe.repository.EventoRepository;
import com.cudeca.cudecabe.service.EventoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventoServiceImpl implements EventoService {

    private final EventoRepository eventoRepository;
    private final EventoMapper eventoMapper;

    @Override
    @Transactional
    public EventoResponse createEvento(EventoRequest request) {
        Evento evento = eventoMapper.toEntity(request);
        Evento savedEvento = eventoRepository.save(evento);
        return eventoMapper.toResponse(savedEvento);
    }

    @Override
    @Transactional(readOnly = true)
    public EventoResponse getEventoById(Integer id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
        return eventoMapper.toResponse(evento);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getAllEventos() {
        return eventoRepository.findAll().stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EventoResponse updateEvento(Integer id, EventoRequest request) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
        eventoMapper.updateEntity(request, evento);
        Evento updatedEvento = eventoRepository.save(evento);
        return eventoMapper.toResponse(updatedEvento);
    }

    @Override
    @Transactional
    public void deleteEvento(Integer id) {
        if (!eventoRepository.existsById(id)) {
            throw new RuntimeException("Evento no encontrado con id: " + id);
        }
        eventoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getEventosByFecha(LocalDate fecha) {
        return eventoRepository.findByFecha(fecha).stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> searchEventosByNombre(String nombre) {
        return eventoRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getEventosByFechaRange(LocalDate fechaInicio, LocalDate fechaFin) {
        return eventoRepository.findByFechaBetween(fechaInicio, fechaFin).stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getEventosByLugar(String lugar) {
        return eventoRepository.findByLugarContainingIgnoreCase(lugar).stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getEventosFuturos() {
        return eventoRepository.findByFechaAfter(LocalDate.now()).stream()
                .map(eventoMapper::toResponse)
                .sorted(Comparator.comparing(EventoResponse::getFecha))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getEventosPasados() {
        return eventoRepository.findByFechaBefore(LocalDate.now()).stream()
                .map(eventoMapper::toResponse)
                .sorted(Comparator.comparing(EventoResponse::getFecha).reversed())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> getEventosByMesYAnio(Integer mes, Integer anio) {
        YearMonth yearMonth = YearMonth.of(anio, mes);
        LocalDate fechaInicio = yearMonth.atDay(1);
        LocalDate fechaFin = yearMonth.atEndOfMonth();

        return eventoRepository.findByFechaBetween(fechaInicio, fechaFin).stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventoResponse> filtrarEventos(EventoFilterRequest filtros) {
        // Aplicar filtros básicos
        LocalDate fechaDesde = filtros.getFechaDesde();
        LocalDate fechaHasta = filtros.getFechaHasta();

        // Manejar filtros de fecha especiales
        if (filtros.getSoloFuturos() != null && filtros.getSoloFuturos()) {
            fechaDesde = LocalDate.now();
        }

        if (filtros.getSoloPasados() != null && filtros.getSoloPasados()) {
            fechaHasta = LocalDate.now();
        }

        // Si se especifica mes y año, usar ese rango
        if (filtros.getMes() != null && filtros.getAnio() != null) {
            YearMonth yearMonth = YearMonth.of(filtros.getAnio(), filtros.getMes());
            fechaDesde = yearMonth.atDay(1);
            fechaHasta = yearMonth.atEndOfMonth();
        }

        // Si solo se especifica una fecha exacta
        if (filtros.getFecha() != null) {
            fechaDesde = filtros.getFecha();
            fechaHasta = filtros.getFecha();
        }

        // Usar query personalizada con todos los filtros
        List<Evento> eventos = eventoRepository.findByFiltros(
            filtros.getNombre(),
            filtros.getLugar(),
            fechaDesde,
            fechaHasta,
            filtros.getRecaudacionMinima(),
            filtros.getRecaudacionMaxima()
        );

        // Convertir a Response
        List<EventoResponse> responses = eventos.stream()
                .map(eventoMapper::toResponse)
                .collect(Collectors.toList());

        // Aplicar ordenamiento si se especifica
        if (filtros.getOrdenarPor() != null) {
            responses = aplicarOrdenamiento(responses, filtros.getOrdenarPor(), filtros.getDireccion());
        }

        return responses;
    }

    private List<EventoResponse> aplicarOrdenamiento(List<EventoResponse> eventos, String ordenarPor, String direccion) {
        Comparator<EventoResponse> comparador = null;

        switch (ordenarPor.toLowerCase()) {
            case "fecha":
                comparador = Comparator.comparing(EventoResponse::getFecha);
                break;
            case "nombre":
                comparador = Comparator.comparing(EventoResponse::getNombre);
                break;
            case "lugar":
                comparador = Comparator.comparing(EventoResponse::getLugar, Comparator.nullsLast(String::compareTo));
                break;
            case "totalrecaudado":
                comparador = Comparator.comparing(EventoResponse::getTotalRecaudado, Comparator.nullsLast(Comparator.naturalOrder()));
                break;
            default:
                return eventos; // Sin ordenamiento
        }

        if ("DESC".equalsIgnoreCase(direccion)) {
            comparador = comparador.reversed();
        }

        return eventos.stream()
                .sorted(comparador)
                .collect(Collectors.toList());
    }
}

