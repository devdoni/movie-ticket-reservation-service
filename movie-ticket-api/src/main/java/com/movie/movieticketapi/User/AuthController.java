package com.movie.movieticketapi.User;

import com.movie.movieticketapi.common.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUser(HttpServletRequest request) {
        log.info("getAuthenticatedUser()");
        String token = jwtUtil.extractTokenFromCookie(request);

        if (token != null && jwtUtil.isTokenValid(token)) {
            String username = jwtUtil.extractUsername(token);
            log.info("token authenticated: {}", username);

            return ResponseEntity.ok(Map.of("username", username));
        }

        log.info("token token not authenticated");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

    }
}
