package com.had.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

@Configuration
public class GatewayConfig {

//    @Bean
//    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("service1", r -> r.path("/service1/**")
//                        .uri("lb://service1"))
//                .route("service2", r -> r.path("/service2/**")
//                        .uri("lb://service2"))
//                .route("service3", r -> r.path("/service3/**")
//                        .uri("lb://service3"))
//                .build();
//    }
}
