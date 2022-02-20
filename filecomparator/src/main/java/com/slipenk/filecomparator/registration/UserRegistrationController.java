package com.slipenk.filecomparator.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("berulia/registration")
@AllArgsConstructor
public class UserRegistrationController {

    private static final String TOKEN = "token";
    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest registrationRequest) {
        return registrationService.register(registrationRequest);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam(TOKEN) String token) {
        return registrationService.confirmToken(token);
    }
}
