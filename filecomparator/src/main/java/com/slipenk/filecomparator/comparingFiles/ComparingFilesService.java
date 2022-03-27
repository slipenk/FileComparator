package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.File;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class ComparingFilesService {

    private List<File> listFiles;
    private final FileDifference fileDifference;

    List<File> compareFile(File file) {
        listFiles.add(file);
        if(listFiles.size() == 2) {
            return compareFiles(listFiles.get(0), listFiles.get(1));
        }
        return Collections.emptyList();
    }

    List<File> compareFiles(File fileLeft, File fileRight) {
        try {
            listFiles.clear();
            return fileDifference.FileDiff(fileLeft, fileRight);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

}
