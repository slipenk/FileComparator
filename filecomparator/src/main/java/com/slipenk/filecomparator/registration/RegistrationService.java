package com.slipenk.filecomparator.registration;

import com.slipenk.filecomparator.user.User;
import com.slipenk.filecomparator.user.UserRole;
import com.slipenk.filecomparator.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private static final String INVALID_EMAIL = "Електронна пошта є неправильною";
    private final UserService userService;
    private EmailValidator emailValidator;

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
}
