package com.slipenk.filecomparator.comparingFiles;


import org.apache.commons.text.diff.CommandVisitor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

import static com.slipenk.filecomparator.Constants.*;
import static com.slipenk.filecomparator.comparingFiles.FileDifference.leftVD;
import static com.slipenk.filecomparator.comparingFiles.FileDifference.rightVD;

@Service
public class FileCommandsVisitor implements CommandVisitor<Character> {

    private static final String DELETE_CHARS = "<span style=`background-color: #FB504B`>${text}</span>";
    private static final String INSERT_CHARS = "<span style=`background-color: #45EA85`>${text}</span>";
    private static final String BR_ROW = "<br/>";
    private static final String REPLACEMENT = "${text}";

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

    public List<String> createComparedFiles() {
        List<String> stringList = new ArrayList<>();
        String left = leftVD;
        String right = rightVD;
        leftVD = EMPTY_STRING;
        rightVD = EMPTY_STRING;
        stringList.add(left);
        stringList.add(right);
        return stringList;
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
