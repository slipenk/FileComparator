package com.slipenk.filecomparator.forgotPassword;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("berulia")
@AllArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PostMapping(path = "forgot",
            consumes = "application/json")
    public void forgot(@RequestBody String email) {
        forgotPasswordService.forgot(email);
    }
}
