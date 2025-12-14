package com.cudeca.cudecabe.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utilidad para generar hashes BCrypt de contraseñas
 * Ejecutar como aplicación Java para generar hashes
 */
public class PasswordHashGenerator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Contraseñas de ejemplo
        String[] passwords = {
            "admin123",
            "user123",
            "password123"
        };

        System.out.println("=== Generador de Hashes BCrypt ===\n");

        for (String password : passwords) {
            String hash = encoder.encode(password);
            System.out.println("Contraseña: " + password);
            System.out.println("Hash BCrypt: " + hash);
            System.out.println();
        }

        // Verificar un hash
        String testPassword = "admin123";
        String testHash = "$2a$10$xvYT.z6u7QFPy0aP0VJXYOkQVXm6wP.O7yGxB7qKm3J0FH0UqF5Ry";
        boolean matches = encoder.matches(testPassword, testHash);
        System.out.println("Verificación de hash:");
        System.out.println("Contraseña: " + testPassword);
        System.out.println("Hash: " + testHash);
        System.out.println("¿Coincide?: " + matches);
    }
}

