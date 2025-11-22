package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByFecha(LocalDate fecha);
    List<Evento> findByNombreContainingIgnoreCase(String nombre);
    List<Evento> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);

    // Filtros adicionales
    List<Evento> findByLugarContainingIgnoreCase(String lugar);
    List<Evento> findByFechaAfter(LocalDate fecha);
    List<Evento> findByFechaBefore(LocalDate fecha);
    List<Evento> findByTotalRecaudadoGreaterThanEqual(BigDecimal minRecaudacion);
    List<Evento> findByTotalRecaudadoBetween(BigDecimal min, BigDecimal max);

    // Query personalizada para filtros combinados
    @Query("SELECT e FROM Evento e WHERE " +
           "(:nombre IS NULL OR LOWER(e.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
           "(:lugar IS NULL OR LOWER(e.lugar) LIKE LOWER(CONCAT('%', :lugar, '%'))) AND " +
           "(:fechaDesde IS NULL OR e.fecha >= :fechaDesde) AND " +
           "(:fechaHasta IS NULL OR e.fecha <= :fechaHasta) AND " +
           "(:recaudacionMin IS NULL OR e.totalRecaudado >= :recaudacionMin) AND " +
           "(:recaudacionMax IS NULL OR e.totalRecaudado <= :recaudacionMax)")
    List<Evento> findByFiltros(
        @Param("nombre") String nombre,
        @Param("lugar") String lugar,
        @Param("fechaDesde") LocalDate fechaDesde,
        @Param("fechaHasta") LocalDate fechaHasta,
        @Param("recaudacionMin") BigDecimal recaudacionMin,
        @Param("recaudacionMax") BigDecimal recaudacionMax
    );
}

