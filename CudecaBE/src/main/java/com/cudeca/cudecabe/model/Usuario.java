package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Size(max = 150)
    @NotNull
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Size(max = 20)
    @Column(name = "telefono", length = 20)
    private String telefono;

    @Size(max = 200)
    @NotNull
    @Column(name = "password", nullable = false, length = 200)
    private String password;

    @Size(max = 50)
    @ColumnDefault("'USER'")
    @Column(name = "rol", length = 50)
    private String rol;

    @Size(max = 20)
    @ColumnDefault("'LOCAL'")
    @Column(name = "provider", length = 20)
    private String provider; // LOCAL, GOOGLE, FACEBOOK

    @NotNull
    @ColumnDefault("0.00")
    @Column(name = "cantidad_donada", nullable = false, precision = 10, scale = 2)
    private BigDecimal cantidadDonada = BigDecimal.ZERO;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "profile_completed", nullable = false)
    private Boolean profileCompleted = false;

    // Relación con Direccion (un usuario puede tener múltiples direcciones)
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Direccion> direcciones;
}