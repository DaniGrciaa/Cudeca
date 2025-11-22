package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;
import com.cudeca.cudecabe.mappers.CompraMapper;
import com.cudeca.cudecabe.model.Compra;
import com.cudeca.cudecabe.repository.CompraRepository;
import com.cudeca.cudecabe.service.CompraService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompraServiceImpl implements CompraService {

    private final CompraRepository compraRepository;
    private final CompraMapper compraMapper;

    @Override
    @Transactional
    public CompraResponse createCompra(CompraRequest request) {
        Compra compra = compraMapper.toEntity(request);
        Compra savedCompra = compraRepository.save(compra);
        return compraMapper.toResponse(savedCompra);
    }

    @Override
    @Transactional(readOnly = true)
    public CompraResponse getCompraById(Integer id) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada con id: " + id));
        return compraMapper.toResponse(compra);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraResponse> getAllCompras() {
        return compraRepository.findAll().stream()
                .map(compraMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CompraResponse updateCompra(Integer id, CompraRequest request) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada con id: " + id));
        compraMapper.updateEntity(request, compra);
        Compra updatedCompra = compraRepository.save(compra);
        return compraMapper.toResponse(updatedCompra);
    }

    @Override
    @Transactional
    public void deleteCompra(Integer id) {
        if (!compraRepository.existsById(id)) {
            throw new RuntimeException("Compra no encontrada con id: " + id);
        }
        compraRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraResponse> getComprasByUserId(Integer userId) {
        return compraRepository.findByIdUser_Id(userId).stream()
                .map(compraMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraResponse> getComprasByEstadoPago(Boolean estadoPago) {
        return compraRepository.findByEstadoPago(estadoPago).stream()
                .map(compraMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompraResponse> getComprasByTipoOperacion(String tipoOperacion) {
        return compraRepository.findByTipoOperacion(tipoOperacion).stream()
                .map(compraMapper::toResponse)
                .collect(Collectors.toList());
    }
}

