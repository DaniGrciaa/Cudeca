package com.cudeca.cudecabe.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenRequestDTO {

    @NotBlank(message = "El refresh token es obligatorio")
    private String refreshToken;
}
