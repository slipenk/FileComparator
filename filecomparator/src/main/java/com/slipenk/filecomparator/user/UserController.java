package com.slipenk.filecomparator.user;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.slipenk.filecomparator.Constants.*;


@RestController
@RequestMapping(BERULIA)
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private static final String GET_USER_BY_EMAIL = "getUser";
    private static final String GET_USER_BY_ID = "getUserByID";

    @PostMapping(path = GET_USER_BY_EMAIL,
            consumes = CONSUMES_PRODUCES)
    public User getUserByEmail(@RequestBody String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping(path = GET_USER_BY_ID,
            consumes = CONSUMES_PRODUCES)
    public User getUserByID(@RequestBody IDRequest idRequest) {
        return userService.getUserByID(idRequest.getID());
    }

    @PostMapping(path = BERULIA_UPDATE_USER_DATA,
            consumes = CONSUMES_PRODUCES)
    public String updateUserData(@RequestBody UpdateDataRequest updateDataRequest) {
        try {
            return userService.updateUserData(updateDataRequest);
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
