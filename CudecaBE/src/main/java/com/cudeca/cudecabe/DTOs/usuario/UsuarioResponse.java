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
    private String provider; // LOCAL, GOOGLE, FACEBOOK
    private BigDecimal cantidadDonada;
    private Boolean profileCompleted;
    private List<DireccionResponse> direcciones;
}
