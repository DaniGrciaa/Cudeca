package com.cudeca.cudecabe.DTOs.direccion;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DireccionRequest {

    @Size(max = 200, message = "La calle no puede exceder 200 caracteres")
    private String calle;

    @Size(max = 50, message = "El número no puede exceder 50 caracteres")
    private String numero;

    @Size(max = 10, message = "El piso no puede exceder 10 caracteres")
    private String piso;

    @Size(max = 10, message = "La puerta no puede exceder 10 caracteres")
    private String puerta;

    @Size(max = 10, message = "El código postal no puede exceder 10 caracteres")
    private String codigoPostal;

    @Size(max = 100, message = "La ciudad no puede exceder 100 caracteres")
    private String ciudad;

    @Size(max = 100, message = "La provincia no puede exceder 100 caracteres")
    private String provincia;

    @Size(max = 100, message = "El país no puede exceder 100 caracteres")
    private String pais;
}

