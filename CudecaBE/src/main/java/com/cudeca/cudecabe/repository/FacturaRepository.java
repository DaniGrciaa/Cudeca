package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Integer> {
    List<Factura> findByIdCompra_Id(Integer compraId);
}

