package com.had.coreservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig {



//    @Autowired
//    private PasswordEncoder passwordEncoder;



//    public SecurityConfig(AuthenticationConfiguration authConfiguration) {
//        this.authConfiguration = authConfiguration;
//    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);


        configuration.addAllowedOrigin("http://localhost:5000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        System.out.println("Cors config set");
        return source;

    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable())
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                })
                .authorizeHttpRequests((authorize)-> authorize
                        .requestMatchers("/chat/**").permitAll()
                        .requestMatchers("/topic/**").permitAll()
                        .requestMatchers("/core/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Permit pre-flight requests
                        .anyRequest().authenticated()
                )
//                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        //.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        System.out.println("filter chain completed");

        return http.build();
    }


}

