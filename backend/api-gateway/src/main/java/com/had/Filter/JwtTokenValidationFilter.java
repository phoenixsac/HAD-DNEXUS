package com.had.Filter;

import com.had.Service.JwtHelper;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Date;

@Component
public class JwtTokenValidationFilter extends AbstractGatewayFilterFactory<JwtTokenValidationFilter.Config> {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenValidationFilter.class);

    @Autowired
    JwtHelper jwtHelper;
    private String secret = "$ecredjhgbfdiusflsdhliugsdgasgadfbaberabebdsfgsudifguiefgevlfdbfdvaduivuoagvuadbvjerghregaregiuaergjabrgkhraeigbakjbrgaeruighakekrhguiahreogoaoigaregareygdluaerarsdsit";

    public JwtTokenValidationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // Extract request path
            String requestPath = exchange.getRequest().getURI().getPath();
            logger.info("API-GATEWAY: Request Path: {}", requestPath);

            // Extract JWT token from Authorization header
            String authorizationHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
            logger.info("API-GATEWAY: Authorization Header: {}", authorizationHeader);

            String token = extractJwtToken(authorizationHeader);
            logger.info("API-GATEWAY: JWT Token: {}", token);

            // Check if request path matches non-secured endpoints
            if (isNonSecuredEndpoint(requestPath)) {
                // Continue to the next filter in the chain
                return chain.filter(exchange);
            }

            if (token == null) {
                // Handle case where JWT token is missing
                logger.warn("API-GATEWAY: JWT Token is missing or invalid.");
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            // Validate JWT token
            if (isTokenExpired(token)) {
                // Handle case where JWT token is invalid
                logger.warn("API-GATEWAY: JWT Token is expired.");
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            // Extract user type and email from JWT token
            String userType = extractUserType(token);
            String userEmail = extractUserEmail(token);

            logger.info("API-GATEWAY: User Type: {}", userType);
            logger.info("API-GATEWAY: User Email: {}", userEmail);

            // Set user type and email as headers
            exchange.getRequest().mutate()
                    .header("X-User-Type", userType)
                    .header("X-User-Email", userEmail)
                    .build();

            // Continue to the next filter in the chain
            return chain.filter(exchange);
        };
    }

    private boolean isNonSecuredEndpoint(String requestPath) {
        return "/auth/issue-jwt".equals(requestPath) || "/auth/patient-signup".equals(requestPath) || "/auth/send-otp".equals(requestPath) || "/auth/validate-otp".equals(requestPath);
    }

    private String extractJwtToken(String authorizationHeader) {
        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.substring(7); // Extract token excluding "Bearer "
            }
        } catch (IllegalArgumentException e) {
            logger.error("API-GATEWAY: Illegal Argument while fetching the username: {}", e.getMessage());
            e.printStackTrace();
        } catch (ExpiredJwtException e) {
            logger.error("API-GATEWAY: Given jwt token is expired: {}", e.getMessage());
            e.printStackTrace();
        } catch (MalformedJwtException e) {
            logger.error("API-GATEWAY: Some change has been done in the token: {}", e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            logger.error("API-GATEWAY: An unexpected error occurred while extracting JWT token: {}", e.getMessage());
            e.printStackTrace();
        }
        return null; // Token not found or invalid format
    }

    private boolean isTokenExpired(String token) {
        // expiry check
        // Here, assuming a basic check if the token is not null and has a length > 0
        try {
            if(token != null && token.length() > 0){
                Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
                Date expirationDate = claims.getExpiration();
                return expirationDate.before(new Date());
            }
        } catch (ExpiredJwtException e) {
            // Token has expired
            return true;
        } catch (JwtException e) {
            // Invalid token format or other JWT related exception
            return false;
        }
        return false;
    }

    private String extractUserType(String token) {
        // Example: Extract user type from JWT token claims
        // Here, assuming the token contains a claim named "user_type"
        // You need to use a library like JwtHelper to parse the token and extract claims
        try {
            Claims claims = jwtHelper.getAllClaimsFromToken(token);
            return claims.get("type", String.class);
        } catch (Exception e) {
            logger.error("API-GATEWAY: Error extracting user type from JWT token: {}", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    private String extractUserEmail(String token) {
        try {
            Claims claims = jwtHelper.getAllClaimsFromToken(token);
            return claims.get("email", String.class);
        } catch (Exception e) {
            logger.error("API-GATEWAY: Error extracting user email from JWT token: {}", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public static class Config {

    }
}
