package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "entrada")
public class Entrada {
    @Id
    @ColumnDefault("nextval('entrada_id_entrada_seq')")
    @Column(name = "id_entrada", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "tipo", nullable = false, length = Integer.MAX_VALUE)
    private String tipo;

    @NotNull
    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull
    @Column(name = "cantidad_disponible", nullable = false)
    private Integer cantidadDisponible;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_evento", nullable = false)
    private com.cudeca.cudecabe.model.Evento idEvento;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_compra")
    private com.cudeca.cudecabe.model.Compra idCompra;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_user")
    private com.cudeca.cudecabe.model.Usuario idUser;

}