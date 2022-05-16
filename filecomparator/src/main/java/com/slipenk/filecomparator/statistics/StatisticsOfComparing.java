package com.slipenk.filecomparator.statistics;

import com.slipenk.filecomparator.user.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class StatisticsOfComparing {

    @SequenceGenerator(
            name = "statistics_sequence",
            sequenceName = "statistics_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "statistics_sequence"
    )
    private Long ID;
    private String firstFile;
    private String secondFile;
    private Integer countOfChanges;
    private Integer countOfDeletions;
    private Integer countOfAdditions;
    private Integer countOfSimilarSymbols;
    private LocalDateTime dateTimeComparing;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private User user;

    public StatisticsOfComparing(String firstFile, String secondFile, Integer countOfChanges, Integer countOfDeletions, Integer countOfAdditions, Integer countOfSimilarSymbols, LocalDateTime dateTimeComparing, User user) {
        this.firstFile = firstFile;
        this.secondFile = secondFile;
        this.countOfChanges = countOfChanges;
        this.countOfDeletions = countOfDeletions;
        this.countOfAdditions = countOfAdditions;
        this.countOfSimilarSymbols = countOfSimilarSymbols;
        this.dateTimeComparing = dateTimeComparing;
        this.user = user;
    }
}
