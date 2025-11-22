package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Evento, Integer> {
    Evento findByNombre(String nombre);
    boolean existsByNombre(String nombre);
    List<Evento> findByFecha(LocalDate fecha);
    boolean existsByFecha(LocalDate fecha);
    Evento findByLugar(String lugar);
    boolean existsByLugar(String lugar);
    List<Evento> findByNombreContainingIgnoreCase(String nombre);
    List<Evento> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
}
