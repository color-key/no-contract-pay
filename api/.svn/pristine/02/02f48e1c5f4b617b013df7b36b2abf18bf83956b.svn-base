package com.xe.alipay.record.auth.token;

import com.xe.alipay.exception.RecordTokenException;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;

@Component
public class TokenProvider {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    // TODO: convert to javaconfig
    @Value("${token.secret.key}")
    private String secretKey;
    @Value("${token.refresh.key}")
    private String refreshKey;


    @Autowired
    private TokenStorage tokenStorage;

    private static final long TOKEN_VALID_HOURS = 24 * 7; // 7 days
    private static final long REFRESH_TOKEN_VALID_HOURS = 24 * 7; // 1 week -> 2 week
    private static final long HOUR_IN_MILLS = 60 * 60 * 1000;

    private static final String ERR_TOKEN_SIGNATURE = "err.token.signature";
    private static final String ERR_TOKEN_MALFORMED_JWT = "err.token.malformed.jwt";
    private static final String ERR_TOKEN_EXPIRED_JWT = "err.token.expired.jwt";
    private static final String ERR_TOKEN_UNSUPPORTED_JWT = "err.token.unsupported.jwt";
    private static final String ERR_TOKEN_ILLEGAL_ARGUMENT = "err.token.illegal.argument";

    public JwtToken generate(String subject,String platform) {
        tokenStorage.invalidateAll(subject,platform);
        return generate(subject, TOKEN_VALID_HOURS,platform);
    }

    private JwtToken generate(String subject, long hour,String platform) {
        return generate(subject, hour, null,platform);
    }

    private JwtToken generate(String subject, HashMap<String, Object> claims,String platform) {
        return generate(subject, TOKEN_VALID_HOURS, claims,platform);
    }

    private JwtToken generate(String subject, long hour, HashMap<String, Object> claims,String platform) {
        long now = (new Date()).getTime();
//        hour = checkHour(hour);
        Date validity = new Date(now + hour * HOUR_IN_MILLS);
        Date refreshValidity = new Date(now + (REFRESH_TOKEN_VALID_HOURS + hour) * HOUR_IN_MILLS);
        String token = generateToken(subject, validity, claims);
        String refreshToken = generateRefreshToken(subject, refreshValidity);

        tokenStorage.create(new TokenEntity(subject, token, validity, refreshToken, refreshValidity,platform));
        return new JwtToken(token, refreshToken);
    }

    public JwtToken refreshToken(String subject, String refreshToken,String platform) {
        try {
            String s = Jwts.parser().setSigningKey(refreshKey).parseClaimsJws(refreshToken).getBody().getSubject();
            if (subject.equals((s.substring("refresh-".length()))) && (tokenStorage.findRefreshToken(refreshToken) != null)) {
                return generate(subject,platform);
            }
            throw new RecordTokenException(TokenProvider.ERR_TOKEN_EXPIRED_JWT);
        } catch (JwtException e) {
            logger.warn("jwt exception: {}", refreshToken);
            throw new RecordTokenException(TokenProvider.ERR_TOKEN_EXPIRED_JWT);
        }
    }

    private String generateToken(String subject, Date validity, HashMap<String, Object> claims) {
        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setExpiration(validity);
        if (claims != null) {
            for (String key : claims.keySet()) {
                builder.claim(key, claims.get(key));
            }
        }
        return builder.compact();
    }

    private String generateRefreshToken(String subject, Date refreshValidity) {
        return Jwts.builder()
                .setSubject("refresh-" + subject)
                .signWith(SignatureAlgorithm.HS512, refreshKey)
                .setExpiration(refreshValidity).compact();
    }

    private long checkHour(long hour) {
        if (hour <= 0) hour = 2;
        if (hour >= 744) hour = 744;
        return hour;
    }

    public boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return tokenStorage.findToken(token) != null;
        } catch (SignatureException e) {
            logger.info("Invalid JWT signature.", e);
        } catch (MalformedJwtException e) {
            logger.info("Invalid JWT token.", e);
        } catch (ExpiredJwtException e) {
            logger.info("Expired JWT token.", e);
        } catch (UnsupportedJwtException e) {
            logger.info("Unsupported JWT token.", e);
        } catch (IllegalArgumentException e) {
            logger.info("JWT token compact of handler are invalid.", e);
        }
        return false;
    }

    public int invalidTokenByLogout(String token) {
        int rows = tokenStorage.invalidateToken(token);
        logger.info("logout invalidate token {}, update {} row(s)", token, rows);
        return rows;
    }

    public int invalidRefreshToken(String refreshToken) {
        int rows = tokenStorage.invalidateRefreshToken(refreshToken);
        logger.info("invalid token {}, update {} row(s)", refreshToken, rows);
        return rows;
    }

    private int invalidTokens(String subject,String metaData) {
        int rows = tokenStorage.invalidateAll(subject,metaData);
        logger.info("invalid [{}]'s tokens, update {} row(s)", subject, rows);
        return rows;
    }

    public String getSubject(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    private Object getClaim(String token, String claim) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get(claim);
    }

}
