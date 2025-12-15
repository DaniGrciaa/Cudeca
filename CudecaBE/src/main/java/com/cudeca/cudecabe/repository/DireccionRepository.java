package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Integer> {

    /**
     * Busca todas las direcciones de un usuario
     */
    List<Direccion> findByUsuario_Id(Integer idUsuario);

    /**
     * Elimina todas las direcciones de un usuario
     */
    void deleteByUsuario_Id(Integer idUsuario);
}

