package com.slipenk.filecomparator.comparingFiles;

import com.slipenk.filecomparator.statistics.StatisticsFileService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Service;
import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static com.slipenk.filecomparator.comparingFiles.FileCommandsVisitor.countChanges;

@Service
@AllArgsConstructor
@Getter
public class ComparingFilesService {

    private List<File> listFiles;
    private final FileDifference fileDifference;
    private StatisticsFileService statisticsFileService;
    private List<Integer> listStatisticsTwoFiles;

    public List<File> compareFile(File file) {
        listFiles.add(file);
        if(listFiles.size() == 2) {
            return compareFiles(listFiles.get(0), listFiles.get(1));
        }
        return Collections.emptyList();
    }

    private List<File> compareFiles(File fileLeft, File fileRight) {
        getStatisticsFiles(fileLeft, fileRight);

        try {
            listFiles.clear();

            List<File> files = fileDifference.FileDiff(fileLeft, fileRight);

            List<Integer> unionStatistics = new ArrayList<>();
            unionStatistics.add(countChanges);
            countChanges = 0;



            return files;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

    public void getStatisticsFiles(File fileLeft, File fileRight) {
        List<Integer> listStatisticsFirstFile = statisticsFileService.getStatisticsFile(fileLeft);
        List<Integer> listStatisticsSecondFile = statisticsFileService.getStatisticsFile(fileRight);
        listStatisticsTwoFiles = Stream.concat(listStatisticsFirstFile.stream(), listStatisticsSecondFile.stream()).toList();
    }



}
