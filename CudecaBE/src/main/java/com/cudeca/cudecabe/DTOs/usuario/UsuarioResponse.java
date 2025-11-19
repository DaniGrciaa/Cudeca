package com.cudeca.cudecabe.DTOs.usuario;

import lombok.Data;

@Data
public class UsuarioResponse {
    private int idUser;
    private String nombre;
    private String username;
    private String email;
    private String telefono;
}
