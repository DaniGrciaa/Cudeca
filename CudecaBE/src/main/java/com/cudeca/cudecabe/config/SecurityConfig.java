package com.cudeca.cudecabe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // desactiva CSRF (importante para poder hacer POST desde Postman sin problemas)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // deja TODO abierto
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
