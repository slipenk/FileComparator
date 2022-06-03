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


import static com.slipenk.filecomparator.Constants.*;


@RestController
@RequestMapping(BERULIA)
@AllArgsConstructor
public class ComparingFilesController {

    public static final String DIR = "src/main/resources/filesToCompare";
    private static final String BORDER = "End File1  bordeeeeeer Start File2";
    private static final String PATH = "uploadFile";
    private static final String PATH_DOCX = "uploadFileDOCX";
    private static final String PARAM = "file";
    private static final String USER_EMAIL = "userEmail";
    private static final String SELECTED_OPTION_COUNTING_ROWS = "selectedOptionCountingRows";
    private static final String FILE_NAME = "compare.txt";
    public static String TEMP_FILE_NAME = "";
    private ComparingFilesService comparingFilesService;
    private List<String> stringList;
    private byte[] bytes1;
    private byte[] bytes2;
    private static int counter;

    @PostMapping(path = PATH,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> uploadFile(@RequestParam(PARAM) MultipartFile multipartFile,  @RequestParam(USER_EMAIL) String email, @RequestParam(SELECTED_OPTION_COUNTING_ROWS) String optionsCountingRows) {
        try {
            File convFile = new File(DIR + SLASH + multipartFile.getOriginalFilename());
            try(InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, convFile.toPath());
            }
            ++counter;

            stringList = comparingFilesService.compareFile(convFile, email, optionsCountingRows);

            if(!stringList.isEmpty()) {
                counter = 0;
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
                httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(FILE_NAME).build().toString());
                if (!stringList.isEmpty()) {
                    bytes1 = stringList.get(0).getBytes();
                    bytes2 = stringList.get(1).getBytes();
                    comparingFilesService.listFiles.clear();
                    comparingFilesService.listCountingRows.clear();
                } else {
                    comparingFilesService.listFiles.clear();
                    comparingFilesService.listCountingRows.clear();
                    clearDirectory();
                    return ResponseEntity.ok().body(EMPTY_STRING.getBytes());
                }
                byte[] combined = new byte[bytes1.length + bytes2.length + BORDER.length()];

                System.arraycopy(bytes1,0, combined,0, bytes1.length);
                System.arraycopy(BORDER.getBytes(),0, combined, bytes1.length, BORDER.length());
                System.arraycopy(bytes2,0, combined, bytes1.length + BORDER.length(), bytes2.length);

                clearDirectory();
                return ResponseEntity.ok().headers(httpHeaders).body(combined);
            } else if(counter == 2) {
                comparingFilesService.listFiles.clear();
                comparingFilesService.listCountingRows.clear();
                clearDirectory();
                counter = 0;
            }

        } catch (Exception e) {
            counter = 0;
            clearDirectory();
            comparingFilesService.listFiles.clear();
            comparingFilesService.listCountingRows.clear();
            System.out.println(e.getMessage());
        }
        return ResponseEntity.ok().body(EMPTY_STRING.getBytes());
    }
    void clearDirectory() {
        try {
            File dirFile = new File(DIR);
            FileUtils.cleanDirectory(dirFile);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    @PostMapping(path = PATH_DOCX,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> uploadFile(@RequestParam(PARAM) MultipartFile multipartFile) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
        httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(FILE_NAME).build().toString());

        try {
            TEMP_FILE_NAME = multipartFile.getOriginalFilename() + multipartFile.getOriginalFilename();
            File convFile = new File(DIR + SLASH + TEMP_FILE_NAME);
            try(InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, convFile.toPath());
            }

            String text = comparingFilesService.getDOCXFile(convFile);
            text = text.replace("\n", "");

            return ResponseEntity.ok().headers(httpHeaders).body(text.getBytes());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.ok().body(EMPTY_STRING.getBytes());
    }
}
