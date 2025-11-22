package com.cudeca.cudecabe.service.serviceImpl;

import com.cudeca.cudecabe.DTOs.factura.FacturaRequest;
import com.cudeca.cudecabe.DTOs.factura.FacturaResponse;
import com.cudeca.cudecabe.mappers.FacturaMapper;
import com.cudeca.cudecabe.model.Factura;
import com.cudeca.cudecabe.repository.FacturaRepository;
import com.cudeca.cudecabe.service.FacturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturaServiceImpl implements FacturaService {

    private final FacturaRepository facturaRepository;
    private final FacturaMapper facturaMapper;

    @Override
    @Transactional
    public FacturaResponse createFactura(FacturaRequest request) {
        Factura factura = facturaMapper.toEntity(request);
        Factura savedFactura = facturaRepository.save(factura);
        return facturaMapper.toResponse(savedFactura);
    }

    @Override
    @Transactional(readOnly = true)
    public FacturaResponse getFacturaById(Integer id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada con id: " + id));
        return facturaMapper.toResponse(factura);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacturaResponse> getAllFacturas() {
        return facturaRepository.findAll().stream()
                .map(facturaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FacturaResponse updateFactura(Integer id, FacturaRequest request) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada con id: " + id));
        facturaMapper.updateEntity(request, factura);
        Factura updatedFactura = facturaRepository.save(factura);
        return facturaMapper.toResponse(updatedFactura);
    }

    @Override
    @Transactional
    public void deleteFactura(Integer id) {
        if (!facturaRepository.existsById(id)) {
            throw new RuntimeException("Factura no encontrada con id: " + id);
        }
        facturaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FacturaResponse> getFacturasByCompraId(Integer compraId) {
        return facturaRepository.findByIdCompra_Id(compraId).stream()
                .map(facturaMapper::toResponse)
                .collect(Collectors.toList());
    }
}

