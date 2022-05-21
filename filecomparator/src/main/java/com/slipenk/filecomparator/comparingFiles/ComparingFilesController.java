package com.slipenk.filecomparator.comparingFiles;

import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
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
    private static final String PARAM = "file";
    private static final String USER_EMAIL = "userEmail";
    private static final String FILE_NAME = "compare.txt";

    private ComparingFilesService comparingFilesService;

    @PostMapping(path = PATH,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> uploadFile(@RequestParam(PARAM) MultipartFile multipartFile, @RequestParam(USER_EMAIL) String email) {
        try {
            File convFile = new File(DIR + SLASH + multipartFile.getOriginalFilename());
            try(InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, convFile.toPath());
            }

            //List<File> filesList = comparingFilesService.compareFile(convFile, email);
            List<XWPFDocument> filesList = comparingFilesService.compareFileDOCX(convFile, email);


            if(!filesList.isEmpty()) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
                httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(FILE_NAME).build().toString());


                List<XWPFParagraph> paragraphs1 = filesList.get(0).getParagraphs();
                List<XWPFParagraph> paragraphs2 = filesList.get(1).getParagraphs();
                String file1 = "", file2 = "";

                for(XWPFParagraph par : paragraphs1) {
                    file1 += par.getParagraphText();
                }
                for(XWPFParagraph par : paragraphs2) {
                    file2 += par.getParagraphText();
                }
                byte[] bytes1 = file1.getBytes();
                byte[] bytes2 = file2.getBytes();

                /*ByteArrayOutputStream out1 = new ByteArrayOutputStream();
                ByteArrayOutputStream out2 = new ByteArrayOutputStream();
                filesList.get(0).write(out1);
                filesList.get(1).write(out2);
                out1.close();
                out2.close();
                byte[] bytes1 = out1.toByteArray();
                byte[] bytes2 = out2.toByteArray();*/


                //byte[] bytes1 = FileUtils.readFileToByteArray(filesList.get(0));
                //byte[] bytes2 = FileUtils.readFileToByteArray(filesList.get(1));
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
}
