package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Integer> {
    List<Compra> findByIdUser_Id(Integer userId);
    List<Compra> findByEstadoPago(Boolean estadoPago);
    List<Compra> findByTipoOperacion(String tipoOperacion);
}

