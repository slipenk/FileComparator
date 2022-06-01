package com.slipenk.filecomparator.comparingFiles;


import org.apache.commons.text.diff.CommandVisitor;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import static com.slipenk.filecomparator.Constants.*;
import static com.slipenk.filecomparator.comparingFiles.ComparingFilesController.DIR;
import static com.slipenk.filecomparator.comparingFiles.FileDifference.leftVD;
import static com.slipenk.filecomparator.comparingFiles.FileDifference.rightVD;

@Service
public class FileCommandsVisitor implements CommandVisitor<Character> {

    private static final String DELETE_CHARS = "<span style=`background-color: #FB504B`>${text}</span>";
    private static final String INSERT_CHARS = "<span style=`background-color: #45EA85`>${text}</span>";
    private static final String BR_ROW = "<br/>";
    private static final String REPLACEMENT = "${text}";
    private static final String LEFT_FILE_TXT = "LeftFile.txt";
    private static final String RIGHT_FILE_TXT = "RightFile.txt";
    private static final String LEFT_FILE_DOCX = "LeftFile.docx";
    private static final String RIGHT_FILE_DOCX = "RightFile.docx";

    public static String leftV = EMPTY_STRING;
    public static String rightV = EMPTY_STRING;
    private int countChanges = 0;
    private int countDeletions = 0;
    private int countAdditions = 0;
    private int countSimilarSymbols = 0;

    @Override
    public void visitKeepCommand(Character c) {
        String append = NEW_ROW.equals(EMPTY_STRING + c) ? BR_ROW : EMPTY_STRING + c;
        leftV = leftV + append;
        rightV = rightV + append;
        if (append.equals(EMPTY_STRING + c)) {
            ++countSimilarSymbols;
        }
    }

    @Override
    public void visitInsertCommand(Character c) {
        String append = NEW_ROW.equals(EMPTY_STRING + c) ? BR_ROW : EMPTY_STRING + c;
        rightV = rightV + INSERT_CHARS.replace(REPLACEMENT, EMPTY_STRING + append);
        ++countChanges;
        ++countAdditions;
    }

    @Override
    public void visitDeleteCommand(Character c) {
        String toAppend = NEW_ROW.equals(EMPTY_STRING + c) ? BR_ROW : EMPTY_STRING + c;
        leftV = leftV + DELETE_CHARS.replace(REPLACEMENT, EMPTY_STRING + toAppend);
        ++countChanges;
        ++countDeletions;
    }

    public List<File> createComparedFilesTXT() throws IOException {
        File tmpFileLeft = new File(DIR + SLASH + LEFT_FILE_TXT);
        File tmpFileRight = new File(DIR + SLASH + RIGHT_FILE_TXT);
        FileWriter writerLeft = new FileWriter(tmpFileLeft);
        FileWriter writerRight = new FileWriter(tmpFileRight);
        writerLeft.write(leftVD);
        writerRight.write(rightVD);
        leftVD = EMPTY_STRING;
        rightVD = EMPTY_STRING;

        writerLeft.close();
        writerRight.close();

        List<File> listFiles = new ArrayList<>();
        listFiles.add(tmpFileLeft);
        listFiles.add(tmpFileRight);
        return listFiles;
    }

    public List<XWPFDocument> createComparedFilesDOCX() throws IOException {
        XWPFDocument tmpFileLeft = new XWPFDocument() ;
        XWPFDocument tmpFileRight = new XWPFDocument() ;
        XWPFParagraph pLeft = tmpFileLeft.createParagraph();
        XWPFParagraph pRight = tmpFileRight.createParagraph();
        pLeft.setAlignment(ParagraphAlignment.LEFT);
        pRight.setAlignment(ParagraphAlignment.LEFT);

        XWPFRun rLeft = pLeft.createRun();
        XWPFRun rRight = pRight.createRun();
        rLeft.setText(leftVD);
        rRight.setText(rightVD);
        leftVD = EMPTY_STRING;
        rightVD = EMPTY_STRING;

        try (FileOutputStream out = new FileOutputStream(DIR + SLASH + LEFT_FILE_DOCX)) {
            tmpFileLeft.write(out);
        }
        try (FileOutputStream out = new FileOutputStream(DIR + SLASH + RIGHT_FILE_DOCX)) {
            tmpFileRight.write(out);
        }

        List<XWPFDocument> listFiles = new ArrayList<>();
        listFiles.add(tmpFileLeft);
        listFiles.add(tmpFileRight);
        return listFiles;
    }

    public List<Integer> getStatisticsOfComparing() {
        List<Integer> listStatistics = new ArrayList<>();

        listStatistics.add(countChanges);
        countChanges = 0;
        listStatistics.add(countDeletions);
        countDeletions = 0;
        listStatistics.add(countAdditions);
        countAdditions = 0;
        listStatistics.add(countSimilarSymbols);
        countSimilarSymbols = 0;

        return listStatistics;
    }
}
