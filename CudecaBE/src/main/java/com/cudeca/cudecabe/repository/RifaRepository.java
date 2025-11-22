package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Rifa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RifaRepository extends JpaRepository<Rifa, Integer> {
    List<Rifa> findByIdCompra_Id(Integer compraId);
}

