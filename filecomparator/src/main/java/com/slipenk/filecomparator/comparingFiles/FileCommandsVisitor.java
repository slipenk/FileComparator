package com.slipenk.filecomparator.comparingFiles;


import org.apache.commons.text.diff.CommandVisitor;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.slipenk.filecomparator.comparingFiles.ComparingFilesController.DIR;

@Service
public class FileCommandsVisitor implements CommandVisitor<Character> {

    private static final String DELETE_CHARS = "<span style=\"background-color: #FB504B\">${text}</span>";
    private static final String INSERT_CHARS = "<span style=\"background-color: #45EA85\">${text}</span>";

    private String left = "";
    private String right = "";

    @Override
    public void visitKeepCommand(Character c) {
        String append = "\n".equals("" + c) ? "<br/>" : "" + c;
        left = left + append;
        right = right + append;
    }

    @Override
    public void visitInsertCommand(Character c) {
        String append = "\n".equals("" + c) ? "<br/>" : "" + c;
        right = right + INSERT_CHARS.replace("${text}", "" + append);
    }

    @Override
    public void visitDeleteCommand(Character c) {
        String toAppend = "\n".equals("" + c) ? "<br/>" : "" + c;
        left = left + DELETE_CHARS.replace("${text}", "" + toAppend);
    }

    public List<File> generateTextInHTML() throws IOException {
        File tmpFileLeft = new File(DIR + "/" + "LeftFile.txt");
        File tmpFileRight = new File(DIR + "/" + "RightFile.txt");
        FileWriter writerLeft = new FileWriter(tmpFileLeft);
        FileWriter writerRight = new FileWriter(tmpFileRight);
        writerLeft.write(left);
        writerRight.write(right);
        writerLeft.close();
        writerRight.close();

        List<File> listFiles = new ArrayList<>();
        listFiles.add(tmpFileLeft);
        listFiles.add(tmpFileRight);
        return listFiles;
    }
}
