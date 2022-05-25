package com.slipenk.filecomparator.comparingFiles;


import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.LineIterator;
import org.apache.commons.text.diff.StringsComparator;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;


import static com.slipenk.filecomparator.Constants.EMPTY_STRING;
import static com.slipenk.filecomparator.Constants.NEW_ROW;


@Service
@AllArgsConstructor
public class FileDifference {

    private final FileCommandsVisitor fileCommandsVisitor;

    public List<File> FileDiffTXT(File file1, File file2) throws IOException {

        LineIterator fileLeft = FileUtils.lineIterator(file1);
        LineIterator fileRight = FileUtils.lineIterator(file2);

        while (fileLeft.hasNext() || fileRight.hasNext()) {
            String left = (fileLeft.hasNext() ? fileLeft.nextLine() : EMPTY_STRING) + NEW_ROW;
            String right = (fileRight.hasNext() ? fileRight.nextLine() : EMPTY_STRING) + NEW_ROW;

            StringsComparator comparator = new StringsComparator(left, right);

            if (comparator.getScript().getLCSLength() > (Integer.max(left.length(), right.length()) * 0.4)) {
                comparator.getScript().visit(fileCommandsVisitor);
            } else {
                StringsComparator leftComparator = new StringsComparator(left, EMPTY_STRING);
                leftComparator.getScript().visit(fileCommandsVisitor);
                StringsComparator rightComparator = new StringsComparator(EMPTY_STRING, right);
                rightComparator.getScript().visit(fileCommandsVisitor);
            }
        }

      return fileCommandsVisitor.createComparedFilesTXT();
    }

    public List<XWPFDocument> FileDiffDOCX(File file1, File file2) throws IOException {
        try {
            if (Objects.equals(FilenameUtils.getExtension(file1.getAbsolutePath()), "docx") && Objects.equals(FilenameUtils.getExtension(file2.getAbsolutePath()), "docx")) {
                FileInputStream fis1 = new FileInputStream(file1.getAbsolutePath());
                FileInputStream fis2 = new FileInputStream(file2.getAbsolutePath());

                XWPFDocument document1 = new XWPFDocument(fis1);
                XWPFDocument document2 = new XWPFDocument(fis2);

                List<XWPFParagraph> paragraphs1 = document1.getParagraphs();
                List<XWPFParagraph> paragraphs2 = document2.getParagraphs();
                Iterator<XWPFParagraph> it1 = paragraphs1.iterator();
                Iterator<XWPFParagraph> it2 = paragraphs2.iterator();

                while (it1.hasNext() || it2.hasNext()) {
                    String left = (it1.hasNext() ? it1.next().getParagraphText() : EMPTY_STRING) + NEW_ROW;
                    String right = (it2.hasNext() ? it2.next().getParagraphText() : EMPTY_STRING) + NEW_ROW;

                    StringsComparator comparator = new StringsComparator(left, right);

                    if (comparator.getScript().getLCSLength() > (Integer.max(left.length(), right.length()) * 0.4)) {
                        comparator.getScript().visit(fileCommandsVisitor);
                    } else {
                        StringsComparator leftComparator = new StringsComparator(left, EMPTY_STRING);
                        leftComparator.getScript().visit(fileCommandsVisitor);
                        StringsComparator rightComparator = new StringsComparator(EMPTY_STRING, right);
                        rightComparator.getScript().visit(fileCommandsVisitor);
                    }
                }
                fis1.close();
                fis2.close();

            }
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return fileCommandsVisitor.createComparedFilesDOCX();
    }

    public List<Integer> getStatisticsOfComparing() {
            return fileCommandsVisitor.getStatisticsOfComparing();
    }

}
