package com.slipenk.filecomparator.comparingFiles;


import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.LineIterator;
import org.apache.commons.text.diff.StringsComparator;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.List;

import static com.slipenk.filecomparator.Constants.EMPTY_STRING;
import static com.slipenk.filecomparator.Constants.NEW_ROW;


@Service
@AllArgsConstructor
public class FileDifference {

    private final FileCommandsVisitor fileCommandsVisitor;

    public List<File> FileDiff(File file1, File file2) throws IOException {
        LineIterator fileLeft = FileUtils.lineIterator(file1);
        LineIterator fileRight = FileUtils.lineIterator(file2);

        while (fileLeft.hasNext() || fileRight.hasNext()) {
            String left = (fileLeft.hasNext() ? fileLeft.nextLine() : EMPTY_STRING) + NEW_ROW;
            String right = (fileRight.hasNext() ? fileRight.nextLine() : EMPTY_STRING) + NEW_ROW;

            StringsComparator comparator = new StringsComparator(left, right);

            if (comparator.getScript().getLCSLength() > (Integer.max(left.length(), right.length()) * 0.4)) {
                comparator.getScript().visit(fileCommandsVisitor);
            } else {
                StringsComparator leftComparator = new StringsComparator(left, NEW_ROW);
                leftComparator.getScript().visit(fileCommandsVisitor);
                StringsComparator rightComparator = new StringsComparator(NEW_ROW, right);
                rightComparator.getScript().visit(fileCommandsVisitor);
            }
        }

       return fileCommandsVisitor.createComparedFiles();
    }

    public List<Integer> getStatisticsOfComparing() {
            return fileCommandsVisitor.getStatisticsOfComparing();
    }
}
