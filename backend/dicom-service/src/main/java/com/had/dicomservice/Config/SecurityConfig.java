package com.had.dicomservice.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;


import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {




    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);


        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:5000");
//        configuration.addAllowedOrigin("http://localhost:8080");
        configuration.addAllowedOrigin("https://viewer.ohif.org");
        configuration.addAllowedOrigin("https://viewer-dev.ohif.org/");
//        configuration.addAllowedOrigin("://v3-demo.ohif.org");

//        configuration.addAllowedOrigin("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        System.out.println("Cos config set");
        return source;

    }

//    @Bean
//    @Order(Ordered.HIGHEST_PRECEDENCE) // Ensure this filter is executed first
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        // Configure CORS settings as needed
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable())
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                })
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/dicom/**").permitAll()
                        .requestMatchers("/dicom-files/**").permitAll()
                        .requestMatchers("/dicom-json/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Permit pre-flight requests
                        .anyRequest().authenticated()
                );
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        System.out.println("filter chain completed");

        return http.build();
    }
}
