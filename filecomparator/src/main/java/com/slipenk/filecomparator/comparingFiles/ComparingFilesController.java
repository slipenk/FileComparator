package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("berulia")
@AllArgsConstructor
public class ComparingFilesController {

    public static final String DIR = "src/main/resources/filesToCompare";

    ComparingFilesService comparingFilesService;

    @PostMapping(path = "uploadFile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<File> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
        try {
            File convFile = new File(DIR + "/" + multipartFile.getOriginalFilename());
            try(InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, convFile.toPath());
            }
            return comparingFilesService.compareFile(convFile);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return Collections.emptyList();
    }
}
