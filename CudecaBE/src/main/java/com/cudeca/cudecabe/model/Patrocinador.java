package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "patrocinador")
public class Patrocinador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_patrocinador", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @NotNull
    @Column(name = "cantidad_aportada", nullable = false, precision = 10, scale = 2)
    private BigDecimal cantidadAportada;

    @Size(max = 100)
    @Column(name = "tipo_aportacion", length = 100)
    private String tipoAportacion;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_evento", nullable = false)
    private com.cudeca.cudecabe.model.Evento idEvento;

}