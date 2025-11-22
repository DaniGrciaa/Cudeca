package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.compra.CompraRequest;
import com.cudeca.cudecabe.DTOs.compra.CompraResponse;

import java.util.List;

public interface CompraService {
    CompraResponse createCompra(CompraRequest request);
    CompraResponse getCompraById(Integer id);
    List<CompraResponse> getAllCompras();
    CompraResponse updateCompra(Integer id, CompraRequest request);
    void deleteCompra(Integer id);
    List<CompraResponse> getComprasByUserId(Integer userId);
    List<CompraResponse> getComprasByEstadoPago(Boolean estadoPago);
    List<CompraResponse> getComprasByTipoOperacion(String tipoOperacion);
}

