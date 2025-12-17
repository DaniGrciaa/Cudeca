package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.CompraEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompraEventoRepository extends JpaRepository<CompraEvento, Integer> {

    // Buscar compras de un usuario específico
    List<CompraEvento> findByUsuarioId(Integer userId);

    // Buscar compras de un evento específico
    List<CompraEvento> findByEventoId(Integer eventoId);

    // Buscar compras por estado
    List<CompraEvento> findByEstado(String estado);

    // Buscar compras de un usuario con estado específico
    List<CompraEvento> findByUsuarioIdAndEstado(Integer userId, String estado);

    // Buscar compras por rango de fechas
    List<CompraEvento> findByFechaCompraBetween(LocalDateTime inicio, LocalDateTime fin);

    // Buscar compras de un usuario por rango de fechas
    List<CompraEvento> findByUsuarioIdAndFechaCompraBetween(Integer userId, LocalDateTime inicio, LocalDateTime fin);

    // Verificar si un usuario ya compró un evento específico
    boolean existsByUsuarioIdAndEventoId(Integer userId, Integer eventoId);

    // Query personalizada para obtener eventos comprados por un usuario (con detalles del evento)
    @Query("SELECT ce FROM CompraEvento ce " +
           "JOIN FETCH ce.evento " +
           "WHERE ce.usuario.id = :userId " +
           "ORDER BY ce.fechaCompra DESC")
    List<CompraEvento> findEventosCompradosByUsuario(@Param("userId") Integer userId);

    // Query para obtener todos los usuarios que compraron un evento específico
    @Query("SELECT ce FROM CompraEvento ce " +
           "JOIN FETCH ce.usuario " +
           "WHERE ce.evento.id = :eventoId " +
           "ORDER BY ce.fechaCompra DESC")
    List<CompraEvento> findUsuariosCompradoresByEvento(@Param("eventoId") Integer eventoId);

    // Contar cuántos usuarios compraron un evento
    @Query("SELECT COUNT(ce) FROM CompraEvento ce WHERE ce.evento.id = :eventoId")
    Long countComprasByEvento(@Param("eventoId") Integer eventoId);

    // Contar cuántos eventos ha comprado un usuario
    @Query("SELECT COUNT(ce) FROM CompraEvento ce WHERE ce.usuario.id = :userId")
    Long countComprasByUsuario(@Param("userId") Integer userId);
}

