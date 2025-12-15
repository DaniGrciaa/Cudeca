package com.cudeca.cudecabe.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador de prueba para verificar que OAuth2 está configurado correctamente
 */
@RestController
@RequestMapping("/api/test")
public class OAuth2TestController {

    @GetMapping("/oauth2-status")
    public Map<String, Object> getOAuth2Status() {
        Map<String, Object> response = new HashMap<>();
        response.put("oauth2Enabled", true);
        response.put("googleLoginUrl", "http://localhost:8080/oauth2/authorization/google");
        response.put("message", "OAuth2 con Google está configurado correctamente");
        response.put("instructions", Map.of(
            "step1", "Abre tu navegador en: http://localhost:8080/oauth2/authorization/google",
            "step2", "Autoriza la aplicación con tu cuenta de Google",
            "step3", "Serás redirigido a: http://localhost:3000/oauth2/redirect?token=xxx&refreshToken=xxx",
            "step4", "El frontend debe guardar los tokens y autenticar al usuario"
        ));
        return response;
    }
}

