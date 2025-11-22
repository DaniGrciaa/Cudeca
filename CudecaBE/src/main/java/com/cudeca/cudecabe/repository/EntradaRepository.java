package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Integer> {
    List<Entrada> findByIdEvento_Id(Integer eventoId);
}
