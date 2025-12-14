package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.LoginRequestDTO;
import com.cudeca.cudecabe.DTOs.LoginResponseDTO;
import com.cudeca.cudecabe.config.JwtUtil;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                       UserDetailsService userDetailsService,
                       JwtUtil jwtUtil,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Autentica al usuario y genera un token JWT
     */
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        try {
            // Autenticar al usuario usando email
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            // Cargar los detalles del usuario por email
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

            // Buscar el usuario en la base de datos para obtener información adicional
            Usuario usuario = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + loginRequest.getEmail()));

            // Generar el token JWT (el token contendrá el email)
            String token = jwtUtil.generateToken(userDetails);

            return new LoginResponseDTO(
                token,
                usuario.getUsername(),
                usuario.getEmail(),
                usuario.getRol(),
                "Login exitoso"
            );

        } catch (BadCredentialsException e) {
            throw new RuntimeException("Credenciales incorrectas");
        } catch (Exception e) {
            throw new RuntimeException("Error en el proceso de login: " + e.getMessage());
        }
    }

    /**
     * Registra un nuevo usuario
     */
    public Usuario registrar(Usuario usuario) {
        // Verificar que el username no exista
        if (userRepository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("El username ya está en uso");
        }

        // Verificar que el email no exista
        if (userRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }

        // Encriptar la contraseña
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        // Establecer rol por defecto si no se especifica
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USER");
        }

        // Guardar el usuario
        return userRepository.save(usuario);
    }
}

