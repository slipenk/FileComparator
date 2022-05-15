package com.slipenk.filecomparator.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.slipenk.filecomparator.Constants.BERULIA_REG;
import static com.slipenk.filecomparator.Constants.CONSUMES_PRODUCES;

@RestController
@RequestMapping(BERULIA_REG)
@AllArgsConstructor
public class RegistrationController {

    private static final String TOKEN = "token";
    private static final String REGISTER_PATH = "register";
    private static final String CONFIRM_PATH = "confirm";
    private final RegistrationService registrationService;

    @PostMapping(path = REGISTER_PATH,
            consumes = CONSUMES_PRODUCES)
    public String register(@RequestBody RegistrationRequest registrationRequest) {
        return registrationService.register(registrationRequest);
    }

    @GetMapping(path = CONFIRM_PATH)
    public String confirm(@RequestParam(TOKEN) String token) {
        return registrationService.confirmToken(token);
    }
}
