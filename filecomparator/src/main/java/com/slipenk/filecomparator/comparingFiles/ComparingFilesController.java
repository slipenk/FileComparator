package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;


@RestController
@RequestMapping("berulia")
@AllArgsConstructor
public class ComparingFilesController {

    public static final String DIR = "src/main/resources/filesToCompare";
    private static final String BORDER = "End File1  bordeeeeeer Start File2";

    ComparingFilesService comparingFilesService;

    @PostMapping(path = "uploadFile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
        try {
            File convFile = new File(DIR + "/" + multipartFile.getOriginalFilename());
            try(InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, convFile.toPath());
            }

            List<File> filesList = comparingFilesService.compareFile(convFile);

            if(!filesList.isEmpty()) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
                httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("compare.txt").build().toString());

                byte[] bytes1 = FileUtils.readFileToByteArray(filesList.get(0));
                byte[] bytes2 = FileUtils.readFileToByteArray(filesList.get(1));
                byte[] combined = new byte[bytes1.length + bytes2.length + BORDER.length()];

                System.arraycopy(bytes1,0, combined,0, bytes1.length);
                System.arraycopy(BORDER.getBytes(),0, combined, bytes1.length, BORDER.length());
                System.arraycopy(bytes2,0, combined, bytes1.length + BORDER.length(), bytes2.length);

                clearDirectory();

                return ResponseEntity.ok().headers(httpHeaders).body(combined);
            }


        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.ok().body("".getBytes());
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
