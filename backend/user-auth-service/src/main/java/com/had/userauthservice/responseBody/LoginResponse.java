package com.had.userauthservice.responseBody;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LoginResponse {

    private String jwtToken;
    private String username;
    private Long actorId;

    public static Builder builder() {
        return new Builder();
    }

    // Builder class to facilitate constructing instances
    public static class Builder {

        private String jwtToken;
        private String username;
        private Long actorId;

        public Builder() {
        }

        public Builder jwtToken(String jwtToken) {
            this.jwtToken = jwtToken;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder actorId(Long actorId) {
            this.actorId = actorId;
            return this;
        }

        public LoginResponse build() {
            LoginResponse response = new LoginResponse();
            response.setJwtToken(jwtToken);
            response.setActorId(actorId);
            response.setUsername(username);
            return response;
        }
    }
}
