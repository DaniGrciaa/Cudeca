package com.cudeca.cudecabe.DTOs.usuario;

import com.cudeca.cudecabe.DTOs.direccion.DireccionRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CompleteProfileRequest {

    @Pattern(regexp = "^[0-9]{9}$", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;

    @Valid
    private List<DireccionRequest> direcciones;
}

