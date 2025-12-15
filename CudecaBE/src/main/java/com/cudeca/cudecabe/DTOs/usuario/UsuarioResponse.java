package com.cudeca.cudecabe.DTOs.usuario;

import com.cudeca.cudecabe.DTOs.direccion.DireccionResponse;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class UsuarioResponse {
    private Integer id;
    private String nombre;
    private String email;
    private String telefono;
    private String rol;
    private BigDecimal cantidadDonada;
    private List<DireccionResponse> direcciones;
}
