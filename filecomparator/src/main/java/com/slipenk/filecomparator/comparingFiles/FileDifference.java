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
import java.util.*;

import static com.slipenk.filecomparator.Constants.*;
import static com.slipenk.filecomparator.comparingFiles.FileCommandsVisitor.leftV;
import static com.slipenk.filecomparator.comparingFiles.FileCommandsVisitor.rightV;

@Service
@AllArgsConstructor
public class FileDifference {

    private final FileCommandsVisitor fileCommandsVisitor;

    public static String leftVD = EMPTY_STRING;
    public static String rightVD = EMPTY_STRING;

    private static final String CONTAINS = "background-color:";
    private static final String CONTAINS_PLUS = ") (+)  ";
    private static final String CONTAINS_MINUS = ") (-)  ";
    private static final String CONTAINS_EMPTY = ")  ";
    private static final String WITH_COUNTING_ROWS = "With counting rows";


    public List<String> FileDiffTXT(File file1, File file2, List<String> listCountingRows) throws IOException {

        int counter = 0;

        LineIterator fileLeft = FileUtils.lineIterator(file1);
        LineIterator fileRight = FileUtils.lineIterator(file2);

        while (fileLeft.hasNext() || fileRight.hasNext()) {
            ++counter;
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

            if (listCountingRows.get(0).equals(WITH_COUNTING_ROWS)) {
                if (leftV.contains(CONTAINS)) {
                    leftV = counter + CONTAINS_MINUS + leftV;
                } else {
                    leftV = counter + CONTAINS_EMPTY + leftV;
                }
            }
            if (listCountingRows.get(1).equals(WITH_COUNTING_ROWS)) {
                if (rightV.contains(CONTAINS)) {
                    rightV = counter + CONTAINS_PLUS + rightV;
                } else {
                    rightV = counter + CONTAINS_EMPTY + rightV;
                }
            }

            leftVD += leftV;
            rightVD += rightV;
            leftV = EMPTY_STRING;
            rightV = EMPTY_STRING;
        }

      return fileCommandsVisitor.createComparedFiles();
    }

    public List<String> FileDiffDOCX(File file1, File file2, List<String> listCountingRows) {
        try {
            if (Objects.equals(FilenameUtils.getExtension(file1.getAbsolutePath()), DOCX) && Objects.equals(FilenameUtils.getExtension(file2.getAbsolutePath()), DOCX)) {
                int counter = 0;

                FileInputStream fis1 = new FileInputStream(file1.getAbsolutePath());
                FileInputStream fis2 = new FileInputStream(file2.getAbsolutePath());

                XWPFDocument document1 = new XWPFDocument(fis1);
                XWPFDocument document2 = new XWPFDocument(fis2);

                List<XWPFParagraph> paragraphs1 = document1.getParagraphs();
                List<XWPFParagraph> paragraphs2 = document2.getParagraphs();
                Iterator<XWPFParagraph> it1 = paragraphs1.iterator();
                Iterator<XWPFParagraph> it2 = paragraphs2.iterator();

                while (it1.hasNext() || it2.hasNext()) {
                    ++counter;
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

                    if (listCountingRows.get(0).equals(WITH_COUNTING_ROWS)) {
                        if (leftV.contains(CONTAINS)) {
                            leftV = counter + CONTAINS_MINUS + leftV;
                        } else {
                            leftV = counter + CONTAINS_EMPTY + leftV;
                        }
                    }
                    if (listCountingRows.get(1).equals(WITH_COUNTING_ROWS)) {
                        if (rightV.contains(CONTAINS)) {
                            rightV = counter + CONTAINS_PLUS + rightV;
                        } else {
                            rightV = counter + CONTAINS_EMPTY + rightV;
                        }
                    }

                    leftVD += leftV;
                    rightVD += rightV;
                    leftV = EMPTY_STRING;
                    rightV = EMPTY_STRING;

                }
                fis1.close();
                fis2.close();
            }
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
       return fileCommandsVisitor.createComparedFiles();
    }

    public List<Integer> getStatisticsOfComparing() {
            return fileCommandsVisitor.getStatisticsOfComparing();
    }

}
