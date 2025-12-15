package com.cudeca.cudecabe.DTOs.usuario;

import com.cudeca.cudecabe.DTOs.direccion.DireccionRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioRegisterRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;

    @Size(max = 100, message = "Los apellidos no pueden exceder 100 caracteres")
    private String apellidos;

    @Email(message = "El email debe ser válido")
    @NotBlank(message = "El email es obligatorio")
    @Size(max = 150, message = "El email no puede exceder 150 caracteres")
    private String email;

    @Pattern(regexp = "^[0-9]{9}$", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    // Datos de dirección (opcionales pero recomendados)
    private DireccionRequest direccion;
}

