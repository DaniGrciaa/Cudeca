package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.rifa.RifaRequest;
import com.cudeca.cudecabe.DTOs.rifa.RifaResponse;
import com.cudeca.cudecabe.mappers.RifaMapper;
import com.cudeca.cudecabe.model.Rifa;
import com.cudeca.cudecabe.repository.RifaRepository;
import com.cudeca.cudecabe.service.RifaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RifaServiceImpl implements RifaService {

    private final RifaRepository rifaRepository;
    private final RifaMapper rifaMapper;

    @Override
    @Transactional
    public RifaResponse createRifa(RifaRequest request) {
        Rifa rifa = rifaMapper.toEntity(request);
        Rifa savedRifa = rifaRepository.save(rifa);
        return rifaMapper.toResponse(savedRifa);
    }

    @Override
    @Transactional(readOnly = true)
    public RifaResponse getRifaById(Integer id) {
        Rifa rifa = rifaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rifa no encontrada con id: " + id));
        return rifaMapper.toResponse(rifa);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RifaResponse> getAllRifas() {
        return rifaRepository.findAll().stream()
                .map(rifaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RifaResponse updateRifa(Integer id, RifaRequest request) {
        Rifa rifa = rifaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rifa no encontrada con id: " + id));
        rifaMapper.updateEntity(request, rifa);
        Rifa updatedRifa = rifaRepository.save(rifa);
        return rifaMapper.toResponse(updatedRifa);
    }

    @Override
    @Transactional
    public void deleteRifa(Integer id) {
        if (!rifaRepository.existsById(id)) {
            throw new RuntimeException("Rifa no encontrada con id: " + id);
        }
        rifaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RifaResponse> getRifasByCompraId(Integer compraId) {
        return rifaRepository.findByIdCompra_Id(compraId).stream()
                .map(rifaMapper::toResponse)
                .collect(Collectors.toList());
    }
}

