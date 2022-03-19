package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("berulia")
@AllArgsConstructor
public class ComparingFilesController {

    ComparingFilesService comparingFilesService;

    @PostMapping(path = "uploadFile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void uploadFile(@RequestParam("file") MultipartFile file) {
        comparingFilesService.compareFile(file);
    }
}
