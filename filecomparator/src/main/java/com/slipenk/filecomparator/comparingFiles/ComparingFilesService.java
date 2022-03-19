package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@AllArgsConstructor
public class ComparingFilesService {

    private List<MultipartFile> listFiles;

    void compareFile(MultipartFile file) {
        listFiles.add(file);
        if(listFiles.size() == 2) {
            compareFiles(listFiles.get(0), listFiles.get(1));
        }
    }

    void compareFiles(MultipartFile file1, MultipartFile file2) {

    }
}
