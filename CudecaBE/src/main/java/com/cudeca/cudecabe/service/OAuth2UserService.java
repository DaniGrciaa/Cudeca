package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class OAuth2UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public OAuth2UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Procesa un usuario OAuth2 (Google o Facebook).
     * LÓGICA INTELIGENTE:
     * - Si el usuario NO existe: Lo crea con profileCompleted = false
     * - Si el usuario SÍ existe: Retorna el usuario con su estado actual de profileCompleted
     */
    public Usuario processOAuth2User(OAuth2User oAuth2User, String provider) {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        System.out.println("🔍 [OAuth2] Procesando usuario de " + provider + ": " + email);

        // Verificar si el usuario ya existe
        return userRepository.findByEmail(email)
            .map(existingUser -> {
                System.out.println("✅ [OAuth2] Usuario EXISTENTE encontrado");
                System.out.println("  ├─ ID: " + existingUser.getId());
                System.out.println("  ├─ Provider: " + existingUser.getProvider());
                System.out.println("  ├─ Teléfono: " + (existingUser.getTelefono() != null ? existingUser.getTelefono() : "no definido"));
                System.out.println("  └─ Profile Completed: " + existingUser.getProfileCompleted());

                // Si el usuario existe pero no tiene provider (es LOCAL), actualizar el provider
                if (existingUser.getProvider() == null || existingUser.getProvider().equals("LOCAL")) {
                    System.out.println("⚠️ [OAuth2] Usuario LOCAL vinculándose con " + provider);
                    existingUser.setProvider(provider);
                    return userRepository.save(existingUser);
                }

                // Retornar el usuario existente con su estado actual
                return existingUser;
            })
            .orElseGet(() -> {
                System.out.println("🆕 [OAuth2] Usuario NUEVO - Primera vez que se registra");

                // Crear nuevo usuario
                Usuario newUser = new Usuario();
                newUser.setEmail(email);
                newUser.setNombre(name != null ? name : email.split("@")[0]);
                newUser.setProvider(provider);
                newUser.setRol("USER");
                newUser.setCantidadDonada(BigDecimal.ZERO);
                newUser.setProfileCompleted(false); // ⭐ NUEVO USUARIO = PERFIL INCOMPLETO

                // Para usuarios OAuth2, generar una contraseña aleatoria (no la usarán)
                newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));

                Usuario savedUser = userRepository.save(newUser);

                System.out.println("✅ [OAuth2] Usuario creado con ID: " + savedUser.getId());
                System.out.println("  └─ Profile Completed: false (debe completar su perfil)");

                return savedUser;
            });
    }

    /**
     * Verifica si un usuario tiene el perfil completo
     * Criterios: debe tener teléfono y al menos una dirección
     */
    public boolean isProfileComplete(Usuario usuario) {
        boolean hasPhone = usuario.getTelefono() != null && !usuario.getTelefono().trim().isEmpty();
        boolean hasAddress = usuario.getDirecciones() != null && !usuario.getDirecciones().isEmpty();

        return hasPhone && hasAddress;
    }
}

