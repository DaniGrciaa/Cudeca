package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorRequest;
import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorResponse;
import com.cudeca.cudecabe.mappers.PatrocinadorMapper;
import com.cudeca.cudecabe.model.Patrocinador;
import com.cudeca.cudecabe.repository.PatrocinadorRepository;
import com.cudeca.cudecabe.service.PatrocinadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatrocinadorServiceImpl implements PatrocinadorService {

    private final PatrocinadorRepository patrocinadorRepository;
    private final PatrocinadorMapper patrocinadorMapper;

    @Override
    @Transactional
    public PatrocinadorResponse createPatrocinador(PatrocinadorRequest request) {
        Patrocinador patrocinador = patrocinadorMapper.toEntity(request);
        Patrocinador savedPatrocinador = patrocinadorRepository.save(patrocinador);
        return patrocinadorMapper.toResponse(savedPatrocinador);
    }

    @Override
    @Transactional(readOnly = true)
    public PatrocinadorResponse getPatrocinadorById(Integer id) {
        Patrocinador patrocinador = patrocinadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patrocinador no encontrado con id: " + id));
        return patrocinadorMapper.toResponse(patrocinador);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatrocinadorResponse> getAllPatrocinadores() {
        return patrocinadorRepository.findAll().stream()
                .map(patrocinadorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PatrocinadorResponse updatePatrocinador(Integer id, PatrocinadorRequest request) {
        Patrocinador patrocinador = patrocinadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patrocinador no encontrado con id: " + id));
        patrocinadorMapper.updateEntity(request, patrocinador);
        Patrocinador updatedPatrocinador = patrocinadorRepository.save(patrocinador);
        return patrocinadorMapper.toResponse(updatedPatrocinador);
    }

    @Override
    @Transactional
    public void deletePatrocinador(Integer id) {
        if (!patrocinadorRepository.existsById(id)) {
            throw new RuntimeException("Patrocinador no encontrado con id: " + id);
        }
        patrocinadorRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatrocinadorResponse> getPatrocinadoresByEventoId(Integer eventoId) {
        return patrocinadorRepository.findByIdEvento_Id(eventoId).stream()
                .map(patrocinadorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatrocinadorResponse> searchPatrocinadoresByNombre(String nombre) {
        return patrocinadorRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(patrocinadorMapper::toResponse)
                .collect(Collectors.toList());
    }
}

