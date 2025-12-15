package com.cudeca.cudecabe.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private String refreshToken;
    private String nombre;
    private String email;
    private String rol;
    private String mensaje;
}

