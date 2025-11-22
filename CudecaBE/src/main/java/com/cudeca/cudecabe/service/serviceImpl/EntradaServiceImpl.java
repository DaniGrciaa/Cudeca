package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.entrada.EntradaRequest;
import com.cudeca.cudecabe.DTOs.entrada.EntradaResponse;
import com.cudeca.cudecabe.mappers.EntradaMapper;
import com.cudeca.cudecabe.model.Entrada;
import com.cudeca.cudecabe.repository.EntradaRepository;
import com.cudeca.cudecabe.service.EntradaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EntradaServiceImpl implements EntradaService {

    private final EntradaRepository entradaRepository;
    private final EntradaMapper entradaMapper;

    @Override
    @Transactional
    public EntradaResponse createEntrada(EntradaRequest request) {
        Entrada entrada = entradaMapper.toEntity(request);
        Entrada savedEntrada = entradaRepository.save(entrada);
        return entradaMapper.toResponse(savedEntrada);
    }

    @Override
    @Transactional(readOnly = true)
    public EntradaResponse getEntradaById(Integer id) {
        Entrada entrada = entradaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrada no encontrada con id: " + id));
        return entradaMapper.toResponse(entrada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EntradaResponse> getAllEntradas() {
        return entradaRepository.findAll().stream()
                .map(entradaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EntradaResponse updateEntrada(Integer id, EntradaRequest request) {
        Entrada entrada = entradaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrada no encontrada con id: " + id));
        entradaMapper.updateEntity(request, entrada);
        Entrada updatedEntrada = entradaRepository.save(entrada);
        return entradaMapper.toResponse(updatedEntrada);
    }

    @Override
    @Transactional
    public void deleteEntrada(Integer id) {
        if (!entradaRepository.existsById(id)) {
            throw new RuntimeException("Entrada no encontrada con id: " + id);
        }
        entradaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EntradaResponse> getEntradasByEventoId(Integer eventoId) {
        return entradaRepository.findByIdEvento_Id(eventoId).stream()
                .map(entradaMapper::toResponse)
                .collect(Collectors.toList());
    }
}

