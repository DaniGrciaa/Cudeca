package com.cudeca.cudecabe.repository;

import com.cudeca.cudecabe.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByRol(String rol);
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
}
