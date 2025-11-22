package com.cudeca.cudecabe.DTOs.usuario;

import lombok.Data;

@Data
public class UsuarioResponse { private Integer id;
    private String nombre;
    private String username;
    private String email;
    private String telefono;
    private String rol;
}
