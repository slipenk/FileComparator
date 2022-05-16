package com.slipenk.filecomparator.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface StatisticsFileRepository extends JpaRepository<StatisticsOfComparing, Long> {
    Optional<StatisticsOfComparing> findByUser(String email);
}
