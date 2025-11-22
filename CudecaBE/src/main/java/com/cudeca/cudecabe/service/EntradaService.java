package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.entrada.EntradaRequest;
import com.cudeca.cudecabe.DTOs.entrada.EntradaResponse;

import java.util.List;

public interface EntradaService {
    EntradaResponse createEntrada(EntradaRequest request);
    EntradaResponse getEntradaById(Integer id);
    List<EntradaResponse> getAllEntradas();
    EntradaResponse updateEntrada(Integer id, EntradaRequest request);
    void deleteEntrada(Integer id);
    List<EntradaResponse> getEntradasByEventoId(Integer eventoId);
}

