package com.slipenk.filecomparator.user;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.slipenk.filecomparator.Constants.*;


@RestController
@RequestMapping(BERULIA)
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private static final String PATH = "getUser";

    @PostMapping(path = PATH,
            consumes = CONSUMES_PRODUCES)
    public User getUser(@RequestBody String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping(path = BERULIA_UPDATE_USER_DATA,
            consumes = CONSUMES_PRODUCES)
    public String updateUserData(@RequestBody UpdateDataRequest updateDataRequest) {
        try {
            userService.updateUserData(updateDataRequest);
        } catch (Exception e) {
            return e.getMessage();
        }
        return SUCCESS;
    }
}
