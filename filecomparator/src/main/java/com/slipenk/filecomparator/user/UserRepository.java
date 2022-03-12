package com.slipenk.filecomparator.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.enabled = 1 WHERE u.email = ?1")
    void enableUser(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.password = ?1 WHERE u.email = ?2")
    void changePassword(String password, String email);

}
