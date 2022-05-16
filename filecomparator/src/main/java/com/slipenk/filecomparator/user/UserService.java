package com.slipenk.filecomparator.user;

import com.slipenk.filecomparator.registration.token.ConfirmationToken;
import com.slipenk.filecomparator.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private static final String EMPTY_STRING = "";
    private static final String MESSAGE_USER_NOT_FOUND = "Користувач з електронною поштою %s відсутній у системі";
    private static final String ID_USER_NOT_FOUND = "Користувач з ID %s відсутній у системі";
    private static final String USER_EXISTS = "Користувач з електронною поштою %s вже існує в системі";
    private static final String CONFIRM_EMAIL = "Термін дії токена ще не минув, будь ласка, підтвердіть вашу електронну пошту";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(MESSAGE_USER_NOT_FOUND, email)));
    }

    public String signUpUser(User user) {
        boolean userPresent = checkUserPresence(user);
        if (!userPresent) {
            encryptPassword(user);
            userRepository.save(user);
            return createToken(user);
        } else {
            User exUSER = getUserByEmail(user.getEmail());
            Optional<ConfirmationToken> confirmationTokenOptional = confirmationTokenService.getTokenByUserID(exUSER.getID());
            ConfirmationToken confirmationToken = confirmationTokenOptional.orElse(null);
            assert confirmationToken != null;
            if (!confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
                throw new IllegalStateException(CONFIRM_EMAIL);
            } else if (confirmationToken.getConfirmedAt() == null) {
                confirmationTokenService.deleteToken(confirmationToken.getToken());
                return createToken(exUSER);
            }
            return EMPTY_STRING;
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(MESSAGE_USER_NOT_FOUND, email)));
    }

    public User getUserByID(Long ID) {
        return userRepository.findByID(ID)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(ID_USER_NOT_FOUND, ID)));
    }

    private boolean checkUserPresence(User user) {
        boolean userPresent = userRepository
                .findByEmail(user.getEmail())
                .isPresent();
        if (userPresent) {
            if(getUserByEmail(user.getEmail()).getEnabled()) {
                throw new IllegalStateException(String.format(USER_EXISTS, user.getEmail()));
            }
        }
        return userPresent;
    }

    public void changeForgottenPassword(String password, String email) {
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        userRepository.changePassword(encodedPassword, email);
    }

    private void encryptPassword(User user) {
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
    }

    private String createToken(User user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(19),
                user
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    public void enableUser(String email) {
        userRepository.enableUser(email);
    }

    public void updateUserData(UpdateDataRequest updateDataRequest) {
        if(!updateDataRequest.getUsernameOld().equals(updateDataRequest.getUsernameNew())) {
            userRepository.updateUsername(updateDataRequest.getID(), updateDataRequest.getUsernameNew());
        }
        if(!bCryptPasswordEncoder.matches(updateDataRequest.getPasswordNew(), updateDataRequest.getPasswordOld())) {
            String encodedPassword = bCryptPasswordEncoder.encode(updateDataRequest.getPasswordNew());
            userRepository.updatePassword(updateDataRequest.getID(), encodedPassword);
        }
        if(!updateDataRequest.getEmailOld().equals(updateDataRequest.getEmailNew())) {
            userRepository.updateEmail(updateDataRequest.getID(), updateDataRequest.getEmailNew());
        }
    }
}
