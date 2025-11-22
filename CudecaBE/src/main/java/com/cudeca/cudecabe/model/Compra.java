package com.cudeca.cudecabe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
@Table(name = "compra")
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra", nullable = false)
    private Integer id;

    @NotNull
    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha_compra", nullable = false)
    private LocalDate fechaCompra;

    @NotNull
    @Column(name = "importe_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal importeTotal;

    @Size(max = 50)
    @NotNull
    @Column(name = "metodo_pago", nullable = false, length = 50)
    private String metodoPago;

    @ColumnDefault("true")
    @Column(name = "estado_pago")
    private Boolean estadoPago;

    @Size(max = 50)
    @NotNull
    @Column(name = "tipo_operacion", nullable = false, length = 50)
    private String tipoOperacion;

    @Size(max = 100)
    @Column(name = "codigo_transaccion", length = 100)
    private String codigoTransaccion;

    @NotNull
    @Column(name = "cantidad_elementos", nullable = false)
    private Integer cantidadElementos;

    @ColumnDefault("false")
    @Column(name = "es_devolucion")
    private Boolean esDevolucion;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_compra_original")
    private com.cudeca.cudecabe.model.Compra idCompraOriginal;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_user", nullable = false)
    private com.cudeca.cudecabe.model.Usuario idUser;

}