package com.slipenk.filecomparator.comparingFiles;


import org.apache.commons.text.diff.CommandVisitor;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.slipenk.filecomparator.Constants.*;
import static com.slipenk.filecomparator.comparingFiles.ComparingFilesController.DIR;

@Service
public class FileCommandsVisitor implements CommandVisitor<Character> {

    private static final String DELETE_CHARS = "<span style=`background-color: #FB504B`>${text}</span>";
    private static final String INSERT_CHARS = "<span style=`background-color: #45EA85`>${text}</span>";
    private static final String BR_ROW = "<br/>";
    private static final String REPLACEMENT = "${text}";
    private static final String LEFT_FILE = "LeftFile.txt";
    private static final String RIGHT_FILE = "RightFile.txt";

    private String left = "";
    private String right = "";
    public static int countChanges = 0;

    @Override
    public void visitKeepCommand(Character c) {
        String append = NEW_ROW.equals(EMPTY_STRING + c) ? BR_ROW : EMPTY_STRING + c;
        left = left + append;
        right = right + append;
    }

    @Override
    public void visitInsertCommand(Character c) {
        String append = NEW_ROW.equals(EMPTY_STRING + c) ? BR_ROW : EMPTY_STRING + c;
        right = right + INSERT_CHARS.replace(REPLACEMENT, EMPTY_STRING + append);
        ++countChanges;
    }

    @Override
    public void visitDeleteCommand(Character c) {
        String toAppend = NEW_ROW.equals(EMPTY_STRING + c) ? BR_ROW : EMPTY_STRING + c;
        left = left + DELETE_CHARS.replace(REPLACEMENT, EMPTY_STRING + toAppend);
        ++countChanges;
    }

    public List<File> generateTextInHTML() throws IOException {
        File tmpFileLeft = new File(DIR + SLASH + LEFT_FILE);
        File tmpFileRight = new File(DIR + SLASH + RIGHT_FILE);
        FileWriter writerLeft = new FileWriter(tmpFileLeft);
        FileWriter writerRight = new FileWriter(tmpFileRight);
        writerLeft.write(left);
        writerRight.write(right);
        left = EMPTY_STRING;
        right = EMPTY_STRING;

        writerLeft.close();
        writerRight.close();

        List<File> listFiles = new ArrayList<>();
        listFiles.add(tmpFileLeft);
        listFiles.add(tmpFileRight);
        return listFiles;
    }
}
