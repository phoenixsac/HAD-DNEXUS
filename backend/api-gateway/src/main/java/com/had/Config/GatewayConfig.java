//package com.had.Config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//
//@Configuration
//public class GatewayConfig {
//
//    @Bean
//    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("admin-route", r -> r.path("/admin/**")
//                        .uri("http://localhost:8081/admin"))
//                .route("patient-route", r -> r.path("/patient/**")
//                        .uri("http://localhost:8082/patient"))
////                .route("user-auth-route", r -> r.path("/auth/**")
////                        .uri("http://localhost:8081/auth"))
//                .route("user-auth-login", r -> r.path("/login/**")
//                        .uri("http://localhost:8081/"))
//                .route("user-auth-patient-signup", r -> r.path("/patient-signup/**")
//                        .uri("http://localhost:8081/"))
//                .build();
//    }
//}
