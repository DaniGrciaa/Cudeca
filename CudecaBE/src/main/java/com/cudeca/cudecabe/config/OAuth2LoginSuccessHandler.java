package com.cudeca.cudecabe.config;

import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.service.OAuth2UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final OAuth2UserService oAuth2UserService;

    @Value("${app.oauth2.redirect-uri:http://localhost:3000/oauth2/redirect}")
    private String frontendRedirectUri;

    public OAuth2LoginSuccessHandler(JwtUtil jwtUtil, @Lazy OAuth2UserService oAuth2UserService) {
        this.jwtUtil = jwtUtil;
        this.oAuth2UserService = oAuth2UserService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                       HttpServletResponse response,
                                       Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();
        String provider = oauthToken.getAuthorizedClientRegistrationId().toUpperCase();

        System.out.println("🔐 [OAuth2Handler] Autenticación exitosa con " + provider);

        // ⭐ LÓGICA INTELIGENTE: Procesar usuario OAuth2 (crear o actualizar)
        Usuario usuario = oAuth2UserService.processOAuth2User(oAuth2User, provider);

        System.out.println("📊 [OAuth2Handler] Estado del usuario:");
        System.out.println("  ├─ ID: " + usuario.getId());
        System.out.println("  ├─ Email: " + usuario.getEmail());
        System.out.println("  ├─ Nombre: " + usuario.getNombre());
        System.out.println("  ├─ Provider: " + usuario.getProvider());
        System.out.println("  └─ Profile Completed: " + usuario.getProfileCompleted());

        // Crear UserDetails para generar JWT
        org.springframework.security.core.userdetails.User userDetails =
            new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getPassword(),
                java.util.Collections.emptyList()
            );

        // Generar JWT para el usuario
        String token = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // ⭐ REDIRIGIR AL FRONTEND CON INFORMACIÓN COMPLETA
        String redirectUrl = UriComponentsBuilder.fromUriString(frontendRedirectUri)
            .queryParam("token", token)
            .queryParam("refreshToken", refreshToken)
            .queryParam("profileCompleted", usuario.getProfileCompleted())
            .queryParam("isNewUser", !usuario.getProfileCompleted()) // Para compatibilidad
            .build()
            .toUriString();

        System.out.println("🔄 [OAuth2Handler] Redirigiendo al frontend:");
        System.out.println("  └─ URL: " + redirectUrl);

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}

