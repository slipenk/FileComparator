package com.slipenk.filecomparator.user;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UpdateDataRequest {
    private String usernameNew;
    private String passwordNew;
    private String emailNew;
    private String emailOld;
    private String usernameOld;
    private String passwordOld;
    private Long ID;
}
