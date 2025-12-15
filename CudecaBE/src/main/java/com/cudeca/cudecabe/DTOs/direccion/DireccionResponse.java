package com.cudeca.cudecabe.DTOs.direccion;

import lombok.Data;

@Data
public class DireccionResponse {
    private Integer id;
    private String calle;
    private String numero;
    private String piso;
    private String puerta;
    private String codigoPostal;
    private String ciudad;
    private String provincia;
    private String pais;
}
