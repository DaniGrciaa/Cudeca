package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorRequest;
import com.cudeca.cudecabe.DTOs.patrocinador.PatrocinadorResponse;

import java.util.List;

public interface PatrocinadorService {
    PatrocinadorResponse createPatrocinador(PatrocinadorRequest request);
    PatrocinadorResponse getPatrocinadorById(Integer id);
    List<PatrocinadorResponse> getAllPatrocinadores();
    PatrocinadorResponse updatePatrocinador(Integer id, PatrocinadorRequest request);
    void deletePatrocinador(Integer id);
    List<PatrocinadorResponse> getPatrocinadoresByEventoId(Integer eventoId);
    List<PatrocinadorResponse> searchPatrocinadoresByNombre(String nombre);
}

