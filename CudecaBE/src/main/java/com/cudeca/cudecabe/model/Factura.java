package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "factura")
public class Factura {
    @Id
    @ColumnDefault("nextval('factura_id_factura_seq')")
    @Column(name = "id_factura", nullable = false)
    private Integer id;

    @NotNull
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha_emision", nullable = false)
    private LocalDate fechaEmision;

    @NotNull
    @Column(name = "importe", nullable = false, precision = 10, scale = 2)
    private BigDecimal importe;

    @NotNull
    @Column(name = "iva", nullable = false, precision = 10, scale = 2)
    private BigDecimal iva;

    @NotNull
    @Column(name = "datos_usuario", nullable = false, length = Integer.MAX_VALUE)
    private String datosUsuario;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_compra", nullable = false)
    private com.cudeca.cudecabe.model.Compra idCompra;

}