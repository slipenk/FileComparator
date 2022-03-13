package com.slipenk.filecomparator.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("berulia")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(path = "getUser",
            consumes = "application/json")
    public User getUser(@RequestBody String email) {
        return userService.getUserByEmail(email);
    }
}
