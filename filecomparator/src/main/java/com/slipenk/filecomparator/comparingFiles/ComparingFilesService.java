package com.slipenk.filecomparator.comparingFiles;

import com.slipenk.filecomparator.statistics.StatisticsFileService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import static com.slipenk.filecomparator.Constants.*;
import static com.slipenk.filecomparator.comparingFiles.ComparingFilesController.DIR;
import static com.slipenk.filecomparator.comparingFiles.ComparingFilesController.TEMP_FILE_NAME;


@Service
@AllArgsConstructor
@Getter
public class ComparingFilesService {

    public List<File> listFiles;
    private final FileDifference fileDifference;
    private StatisticsFileService statisticsFileService;
    private List<Integer> listStatisticsTwoFiles;
    private static final String TEMP_DOCX = "temp.docx";

    public List<File> compareFileTXT(File file, String email) {
        listFiles.add(file);
        if(listFiles.size() == 2) {
            if (Objects.equals(FilenameUtils.getExtension(listFiles.get(0).getAbsolutePath()), "txt") && Objects.equals(FilenameUtils.getExtension(listFiles.get(1).getAbsolutePath()), "txt")) {
                return compareFilesTXT(listFiles.get(0), listFiles.get(1), email);
            } else  {
                return Collections.emptyList();
            }
        }
        return Collections.emptyList();
    }

    public List<XWPFDocument> compareFileDOCX(File file, String email) {
        listFiles.add(file);
        if(listFiles.size() == 2) {
            if (Objects.equals(FilenameUtils.getExtension(listFiles.get(0).getAbsolutePath()), "docx") && Objects.equals(FilenameUtils.getExtension(listFiles.get(1).getAbsolutePath()), "docx")) {
                return compareFilesDOCX(listFiles.get(0), listFiles.get(1), email);
            } else  {
                return Collections.emptyList();
            }
        }
        return Collections.emptyList();
    }

    private List<File> compareFilesTXT(File fileLeft, File fileRight, String email) {
        getStatisticsFiles(fileLeft, fileRight);

        try {
            listFiles.clear();

            List<File> files = fileDifference.FileDiffTXT(fileLeft, fileRight);

            List<Integer> listStatistics = fileDifference.getStatisticsOfComparing();
            listStatisticsTwoFiles = Stream.concat(listStatisticsTwoFiles.stream(), listStatistics.stream()).toList();
            statisticsFileService.setListStatisticsTwoFiles(listStatisticsTwoFiles);

            statisticsFileService.saveStatistics(fileLeft.getName(), fileRight.getName(), email);

            return files;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

    private List<XWPFDocument> compareFilesDOCX(File fileLeft, File fileRight, String email) {
        getStatisticsFiles(fileLeft, fileRight);

        try {
            listFiles.clear();

            List<XWPFDocument> files = fileDifference.FileDiffDOCX(fileLeft, fileRight);

            List<Integer> listStatistics = fileDifference.getStatisticsOfComparing();
            listStatisticsTwoFiles = Stream.concat(listStatisticsTwoFiles.stream(), listStatistics.stream()).toList();
            statisticsFileService.setListStatisticsTwoFiles(listStatisticsTwoFiles);

            statisticsFileService.saveStatistics(fileLeft.getName(), fileRight.getName(), email);

            return files;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

    public XWPFDocument getDOCXFile(File file) {
        try {
            FileInputStream fis = new FileInputStream(file.getAbsolutePath());
            XWPFDocument document = new XWPFDocument(fis);
            List<XWPFParagraph> paragraphs = document.getParagraphs();
            Iterator<XWPFParagraph> it = paragraphs.iterator();
            String text = EMPTY_STRING;
            while (it.hasNext() ) {
                text += it.next().getParagraphText() + BR;
            }

            XWPFDocument fileDOCX = new XWPFDocument();
            XWPFParagraph fileDOCXP = fileDOCX.createParagraph();
            fileDOCXP.setAlignment(ParagraphAlignment.LEFT);
            XWPFRun rFile = fileDOCXP.createRun();

            rFile.setText(text);

            try (FileOutputStream out = new FileOutputStream(DIR + SLASH + TEMP_FILE_NAME + "T")) {
                fileDOCX.write(out);
            }

            return fileDOCX;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return new XWPFDocument();
    }


    public void getStatisticsFiles(File fileLeft, File fileRight) {
        List<Integer> listStatisticsFirstFile = statisticsFileService.getStatisticsFile(fileLeft);
        List<Integer> listStatisticsSecondFile = statisticsFileService.getStatisticsFile(fileRight);
        listStatisticsTwoFiles = Stream.concat(listStatisticsFirstFile.stream(), listStatisticsSecondFile.stream()).toList();
    }



}
