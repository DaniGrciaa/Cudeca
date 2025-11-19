package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Evento, Long> {
    public Evento findByNombre(String nombre);
    public boolean existsByNombre(String nombre);
    public Evento findById(Integer id);
    public boolean existsById(Integer id);
    public Evento findByFecha(LocalDate fecha);
    public boolean existsByFecha(LocalDate fecha);
    public Evento findByLugar(String lugar);
    public boolean existsByLugar(String lugar);
    public List<Evento> findAll();
}
