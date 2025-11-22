package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.rifa.RifaRequest;
import com.cudeca.cudecabe.DTOs.rifa.RifaResponse;

import java.util.List;

public interface RifaService {
    RifaResponse createRifa(RifaRequest request);
    RifaResponse getRifaById(Integer id);
    List<RifaResponse> getAllRifas();
    RifaResponse updateRifa(Integer id, RifaRequest request);
    void deleteRifa(Integer id);
    List<RifaResponse> getRifasByCompraId(Integer compraId);
}

