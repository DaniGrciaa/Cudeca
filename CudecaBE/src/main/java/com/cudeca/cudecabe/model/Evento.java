package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "evento")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @NotNull
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @Size(max = 200)
    @Column(name = "lugar", length = 200)
    private String lugar;

    @ColumnDefault("0")
    @Column(name = "total_recaudado", precision = 10, scale = 2)
    private BigDecimal totalRecaudado;

}