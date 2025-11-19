package com.cudeca.cudecabe.repository;


import com.cudeca.cudecabe.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
    public Usuario findByEmail(String email);
    public boolean existsByEmail(String email);
    public Usuario findByUsername(String username);
    public boolean existsByUsername(String username);
}
