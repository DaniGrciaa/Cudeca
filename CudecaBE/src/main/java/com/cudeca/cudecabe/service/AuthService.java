package com.cudeca.cudecabe.service;

import com.cudeca.cudecabe.DTOs.LoginRequestDTO;
import com.cudeca.cudecabe.DTOs.LoginResponseDTO;
import com.cudeca.cudecabe.DTOs.usuario.UsuarioRegisterRequest;
import com.cudeca.cudecabe.config.JwtUtil;
import com.cudeca.cudecabe.model.Direccion;
import com.cudeca.cudecabe.model.Usuario;
import com.cudeca.cudecabe.repository.DireccionRepository;
import com.cudeca.cudecabe.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final DireccionRepository direccionRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                       UserDetailsService userDetailsService,
                       JwtUtil jwtUtil,
                       UserRepository userRepository,
                       DireccionRepository direccionRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.direccionRepository = direccionRepository;
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

            // Generar el refresh token JWT
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);

            return new LoginResponseDTO(
                token,
                refreshToken,
                usuario.getNombre(),
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

        // Establecer provider por defecto si no se especifica
        if (usuario.getProvider() == null || usuario.getProvider().isEmpty()) {
            usuario.setProvider("LOCAL");
        }

        // Establecer cantidadDonada por defecto si no se especifica
        if (usuario.getCantidadDonada() == null) {
            usuario.setCantidadDonada(BigDecimal.ZERO);
        }

        // Guardar el usuario
        return userRepository.save(usuario);
    }

    /**
     * Registra un nuevo usuario con dirección
     */
    @Transactional
    public LoginResponseDTO registrarConDireccion(UsuarioRegisterRequest registerRequest) {

        System.out.println("🔍 [SERVICIO] Iniciando registro de usuario...");

        // Verificar que el email no exista
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }

        // Crear y configurar el usuario
        Usuario usuario = new Usuario();

        // Concatenar nombre y apellidos en el campo nombre
        String nombreCompleto = registerRequest.getNombre();
        if (registerRequest.getApellidos() != null && !registerRequest.getApellidos().trim().isEmpty()) {
            nombreCompleto += " " + registerRequest.getApellidos();
        }

        usuario.setNombre(nombreCompleto);
        usuario.setEmail(registerRequest.getEmail());
        usuario.setTelefono(registerRequest.getTelefono());
        usuario.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        usuario.setRol("USER"); // Rol por defecto
        usuario.setProvider("LOCAL"); // Provider LOCAL para registro tradicional
        usuario.setCantidadDonada(BigDecimal.ZERO); // Inicializar en 0
        usuario.setProfileCompleted(true); // ⭐ Registro LOCAL = Perfil completo

        // Guardar el usuario primero para obtener el ID
        usuario = userRepository.save(usuario);
        System.out.println("✅ [SERVICIO] Usuario guardado con ID: " + usuario.getId());

        // Procesar direcciones (soporta tanto array como campo único para compatibilidad)
        int direccionesGuardadas = 0;

        // Primero intentar con el array de direcciones (preferido)
        if (registerRequest.getDirecciones() != null && !registerRequest.getDirecciones().isEmpty()) {
            System.out.println("📍 [SERVICIO] Múltiples direcciones detectadas en el request (" +
                             registerRequest.getDirecciones().size() + ")");

            for (int i = 0; i < registerRequest.getDirecciones().size(); i++) {
                var direccionRequest = registerRequest.getDirecciones().get(i);
                System.out.println("📍 [SERVICIO] Procesando dirección " + (i + 1) + ":");

                if (guardarDireccion(usuario, direccionRequest)) {
                    direccionesGuardadas++;
                }
            }
        }
        // Si no hay array, intentar con el campo único (para compatibilidad con código existente)
        else if (registerRequest.getDireccion() != null) {
            System.out.println("📍 [SERVICIO] Dirección única detectada en el request:");

            if (guardarDireccion(usuario, registerRequest.getDireccion())) {
                direccionesGuardadas++;
            }
        } else {
            System.out.println("⚠️ [SERVICIO] No se recibió dirección en el request");
        }

        System.out.println("✅ [SERVICIO] Total de direcciones guardadas: " + direccionesGuardadas);

        // Generar tokens para login automático después del registro
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        System.out.println("✅ [SERVICIO] Registro completado exitosamente");

        return new LoginResponseDTO(
            token,
            refreshToken,
            usuario.getNombre(),
            usuario.getEmail(),
            usuario.getRol(),
            "Usuario registrado exitosamente"
        );
    }

    /**
     * Refresca el access token usando un refresh token válido
     */
    public LoginResponseDTO refreshToken(String refreshToken) {
        try {
            // Extraer el email del refresh token
            String email = jwtUtil.extractUsername(refreshToken);

            // Cargar los detalles del usuario
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Validar el refresh token
            if (!jwtUtil.validateRefreshToken(refreshToken, userDetails)) {
                throw new RuntimeException("Refresh token inválido o expirado");
            }

            // Buscar el usuario en la base de datos
            Usuario usuario = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));

            // Generar nuevos tokens
            String newAccessToken = jwtUtil.generateToken(userDetails);
            String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);

            return new LoginResponseDTO(
                newAccessToken,
                newRefreshToken,
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol(),
                "Token refrescado exitosamente"
            );

        } catch (Exception e) {
            throw new RuntimeException("Error refrescando el token: " + e.getMessage());
        }
    }

    /**
     * Método auxiliar para guardar una dirección asociada a un usuario
     * @param usuario Usuario al que se le asignará la dirección
     * @param direccionRequest Datos de la dirección a guardar
     * @return true si la dirección se guardó exitosamente, false si no tenía datos suficientes
     */
    private boolean guardarDireccion(Usuario usuario, com.cudeca.cudecabe.DTOs.direccion.DireccionRequest direccionRequest) {
        System.out.println("  ├─ Calle: " + direccionRequest.getCalle());
        System.out.println("  ├─ Número: " + direccionRequest.getNumero());
        System.out.println("  ├─ Piso: " + direccionRequest.getPiso());
        System.out.println("  ├─ Puerta: " + direccionRequest.getPuerta());
        System.out.println("  ├─ CP: " + direccionRequest.getCodigoPostal());
        System.out.println("  ├─ Ciudad: " + direccionRequest.getCiudad());
        System.out.println("  ├─ Provincia: " + direccionRequest.getProvincia());
        System.out.println("  └─ País: " + direccionRequest.getPais());

        // Solo guardar si al menos hay un campo de dirección completo
        if (direccionRequest.getCalle() != null ||
            direccionRequest.getCiudad() != null ||
            direccionRequest.getCodigoPostal() != null) {

            Direccion direccion = new Direccion();
            direccion.setUsuario(usuario);
            direccion.setCalle(direccionRequest.getCalle());
            direccion.setNumero(direccionRequest.getNumero());
            direccion.setPiso(direccionRequest.getPiso());
            direccion.setPuerta(direccionRequest.getPuerta());
            direccion.setCodigoPostal(direccionRequest.getCodigoPostal());
            direccion.setCiudad(direccionRequest.getCiudad());
            direccion.setProvincia(direccionRequest.getProvincia());
            direccion.setPais(direccionRequest.getPais());

            Direccion direccionGuardada = direccionRepository.save(direccion);
            System.out.println("  ✅ Dirección guardada con ID: " + direccionGuardada.getId());
            return true;
        } else {
            System.out.println("  ⚠️ Dirección recibida pero sin datos suficientes para guardar");
            return false;
        }
    }
}

