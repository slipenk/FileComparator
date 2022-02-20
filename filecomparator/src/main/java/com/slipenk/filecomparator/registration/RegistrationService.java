package com.slipenk.filecomparator.registration;

import com.slipenk.filecomparator.registration.token.ConfirmationToken;
import com.slipenk.filecomparator.registration.token.ConfirmationTokenService;
import com.slipenk.filecomparator.user.User;
import com.slipenk.filecomparator.user.UserRole;
import com.slipenk.filecomparator.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private static final String INVALID_EMAIL = "Електронна пошта є неправильною";
    private static final String TOKEN_NOT_FOUND = "Токен не знайдений";
    private static final String EMAIL_ALREADY_CONFIRMED = "Електронна пошта вже підтверджена";
    private static final String TOKEN_EXPIRED = "Термін дії токена закінчився";
    private static final String CONFIRMED = "Підтверджено";
    private final UserService userService;
    private EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;

    public String register(RegistrationRequest registrationRequest) {
        boolean isValidEmail = emailValidator.test(registrationRequest.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException(INVALID_EMAIL);
        }
        return userService.signUpUser(
                new User(registrationRequest.getFirstName(),
                        registrationRequest.getLastName(),
                        registrationRequest.getEmail(),
                        registrationRequest.getPassword(),
                        registrationRequest.getDateBirth(),
                        UserRole.USER));
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException(TOKEN_NOT_FOUND));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException(EMAIL_ALREADY_CONFIRMED);
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException(TOKEN_EXPIRED);
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(
                confirmationToken.getUser().getEmail());

        return CONFIRMED;
    }
}
