package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
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
import java.util.Objects;

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
    private static final String FILE_NAME = "compare.txt";
    public static String TEMP_FILE_NAME = "";

    private ComparingFilesService comparingFilesService;
    private List<XWPFDocument> filesListDOCX;
    private List<File> filesListTXT;
    private byte[] bytes1;
    private byte[] bytes2;
    private static int counter;

    @PostMapping(path = PATH,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> uploadFile(@RequestParam(PARAM) MultipartFile multipartFile, @RequestParam(USER_EMAIL) String email) {
        try {
            File convFile = new File(DIR + SLASH + multipartFile.getOriginalFilename());
            try(InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, convFile.toPath());
            }
            ++counter;

            if (Objects.equals(FilenameUtils.getExtension(convFile.getAbsolutePath()), DOCX)) {
                filesListDOCX = comparingFilesService.compareFileDOCX(convFile, email);
            } else if (Objects.equals(FilenameUtils.getExtension(convFile.getAbsolutePath()), TXT)) {
                filesListTXT = comparingFilesService.compareFileTXT(convFile, email);
            } else {
                counter = 0;
                clearDirectory();
                return ResponseEntity.ok().body(EMPTY_STRING.getBytes());
            }


            if(!filesListDOCX.isEmpty() || !filesListTXT.isEmpty()) {
                counter = 0;
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
                httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(FILE_NAME).build().toString());


                if (!filesListDOCX.isEmpty()) {
                    String text1 = new XWPFWordExtractor(filesListDOCX.get(0)).getText();
                    String text2 = new XWPFWordExtractor(filesListDOCX.get(1)).getText();
                    text1 = text1.replace("\n", "");
                    text2 = text2.replace("\n", "");
                    bytes1 = text1.getBytes();
                    bytes2 = text2.getBytes();
                    filesListDOCX.clear();
                } else if (!filesListTXT.isEmpty()) {
                    bytes1 = FileUtils.readFileToByteArray(filesListTXT.get(0));
                    bytes2 = FileUtils.readFileToByteArray(filesListTXT.get(1));
                    filesListTXT.clear();
                } else {
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
                clearDirectory();
                counter = 0;
            }


        } catch (Exception e) {
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

            XWPFDocument fileDOCX = comparingFilesService.getDOCXFile(convFile);
            String text = new XWPFWordExtractor(fileDOCX).getText();
            text = text.replace("\n", "");



            return ResponseEntity.ok().headers(httpHeaders).body(text.getBytes());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.ok().body(EMPTY_STRING.getBytes());
    }
}
