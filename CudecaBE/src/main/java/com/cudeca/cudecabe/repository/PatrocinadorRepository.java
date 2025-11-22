package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Patrocinador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatrocinadorRepository extends JpaRepository<Patrocinador, Integer> {
    List<Patrocinador> findByIdEvento_Id(Integer eventoId);
    List<Patrocinador> findByNombreContainingIgnoreCase(String nombre);
}

