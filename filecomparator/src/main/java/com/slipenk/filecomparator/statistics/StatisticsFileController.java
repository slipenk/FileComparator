package com.slipenk.filecomparator.statistics;

import com.slipenk.filecomparator.user.IDRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.slipenk.filecomparator.Constants.BERULIA;
import static com.slipenk.filecomparator.Constants.CONSUMES_PRODUCES;

@RestController
@RequestMapping(BERULIA)
@AllArgsConstructor
public class StatisticsFileController {

    private static final String PATH_STATISTICS = "statistics_file";
    private static final String PATH_RECENT_COMPARISONS = "recentComparisons";
    private final StatisticsFileService statisticsFileService;


    @GetMapping(path = PATH_STATISTICS,
            produces = CONSUMES_PRODUCES)
    public ResponseEntity<List<Integer>> getStatisticsFiles() {
        return ResponseEntity.ok().body(statisticsFileService.getListStatisticsTwoFiles());
    }

    @PostMapping(path = PATH_RECENT_COMPARISONS,
            produces = CONSUMES_PRODUCES)
    public List<StatisticsOfComparing> getRecentComparisons(@RequestBody IDRequest idRequest) {
        return statisticsFileService.getStatistics(idRequest.getID());
    }


}
