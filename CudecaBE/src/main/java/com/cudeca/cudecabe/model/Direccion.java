package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "direccion")
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_direccion", nullable = false)
    private Integer id;


    @Size(max = 200)
    @Column(name = "calle", length = 200)
    private String calle;

    @Size(max = 50)
    @Column(name = "numero", length = 50)
    private String numero;

    @Size(max = 10)
    @Column(name = "piso", length = 10)
    private String piso;

    @Size(max = 10)
    @Column(name = "puerta", length = 10)
    private String puerta;

    @Size(max = 10)
    @Column(name = "codigo_postal", length = 10)
    private String codigoPostal;

    @Size(max = 100)
    @Column(name = "ciudad", length = 100)
    private String ciudad;

    @Size(max = 100)
    @Column(name = "provincia", length = 100)
    private String provincia;

    @Size(max = 100)
    @Column(name = "pais", length = 100)
    private String pais;

    // Relación con Usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;
}

