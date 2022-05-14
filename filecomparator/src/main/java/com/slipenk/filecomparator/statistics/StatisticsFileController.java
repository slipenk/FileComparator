package com.slipenk.filecomparator.statistics;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import static com.slipenk.filecomparator.Constants.BERULIA;
import static com.slipenk.filecomparator.Constants.CONSUMES_PRODUCES;

@RestController
@RequestMapping(BERULIA)
@AllArgsConstructor
public class StatisticsFileController {

    private static final String PATH = "statistics_file";
    private final StatisticsFileService statisticsFileService;


    @GetMapping(path = PATH,
            produces = CONSUMES_PRODUCES)
    public ResponseEntity<List<Integer>> getStatisticsFiles() {
        return ResponseEntity.ok().body(statisticsFileService.getListStatisticsTwoFiles());
    }
}
