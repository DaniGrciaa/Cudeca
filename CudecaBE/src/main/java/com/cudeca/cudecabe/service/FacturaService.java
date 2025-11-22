package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.factura.FacturaRequest;
import com.cudeca.cudecabe.DTOs.factura.FacturaResponse;

import java.util.List;

public interface FacturaService {
    FacturaResponse createFactura(FacturaRequest request);
    FacturaResponse getFacturaById(Integer id);
    List<FacturaResponse> getAllFacturas();
    FacturaResponse updateFactura(Integer id, FacturaRequest request);
    void deleteFactura(Integer id);
    List<FacturaResponse> getFacturasByCompraId(Integer compraId);
}

