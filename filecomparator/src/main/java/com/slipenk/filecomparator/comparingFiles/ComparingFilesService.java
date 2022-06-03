package com.slipenk.filecomparator.comparingFiles;

import com.slipenk.filecomparator.statistics.StatisticsFileService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileInputStream;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import static com.slipenk.filecomparator.Constants.*;


@Service
@AllArgsConstructor
@Getter
public class ComparingFilesService {

    public List<File> listFiles;
    public List<String> listCountingRows;
    private final FileDifference fileDifference;
    private StatisticsFileService statisticsFileService;
    private List<Integer> listStatisticsTwoFiles;

    public List<String> compareFile(File file, String email, String optionsCountingRows) {
        listFiles.add(file);
        listCountingRows.add(optionsCountingRows);
        if(listFiles.size() == 2) {
            return compareFiles(listFiles.get(0), listFiles.get(1), email);
        }
        return Collections.emptyList();
    }


    private List<String> compareFiles(File fileLeft, File fileRight, String email) {
        getStatisticsFiles(fileLeft, fileRight);

        try {
            listFiles.clear();
            List<String> files = Collections.emptyList();

            if (Objects.equals(FilenameUtils.getExtension(fileLeft.getAbsolutePath()), DOCX) && Objects.equals(FilenameUtils.getExtension(fileRight.getAbsolutePath()), DOCX)) {
               files = fileDifference.FileDiffDOCX(fileLeft, fileRight, listCountingRows);
            } else if (Objects.equals(FilenameUtils.getExtension(fileLeft.getAbsolutePath()), TXT) && Objects.equals(FilenameUtils.getExtension(fileRight.getAbsolutePath()), TXT)) {
                files = fileDifference.FileDiffTXT(fileLeft, fileRight, listCountingRows);
            } else {
                return files;
            }

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

    public String getDOCXFile(File file) {
        try {
            FileInputStream fis = new FileInputStream(file.getAbsolutePath());
            XWPFDocument document = new XWPFDocument(fis);
            List<XWPFParagraph> paragraphs = document.getParagraphs();
            Iterator<XWPFParagraph> it = paragraphs.iterator();
            String text = EMPTY_STRING;
            while (it.hasNext() ) {
                text += it.next().getParagraphText() + BR;
            }

            return text;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return EMPTY_STRING;
    }


    public void getStatisticsFiles(File fileLeft, File fileRight) {
        List<Integer> listStatisticsFirstFile = statisticsFileService.getStatisticsFile(fileLeft);
        List<Integer> listStatisticsSecondFile = statisticsFileService.getStatisticsFile(fileRight);
        listStatisticsTwoFiles = Stream.concat(listStatisticsFirstFile.stream(), listStatisticsSecondFile.stream()).toList();
    }



}
