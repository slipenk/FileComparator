package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import java.io.File;
import java.util.Collections;
import java.util.List;

import static com.slipenk.filecomparator.comparingFiles.ComparingFilesController.DIR;

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
            clearDirectory();
            return fileDifference.FileDiff(fileLeft, fileRight);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

    void clearDirectory() {
        try {
            File dirFile = new File(DIR);
            FileUtils.cleanDirectory(dirFile);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
