package com.cudeca.cudecabe.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private String username;
    private String email;
    private String rol;
    private String mensaje;
}

