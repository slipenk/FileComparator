package com.slipenk.filecomparator.statistics;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

@Service
@AllArgsConstructor
public class StatisticsService {

    public void getStatisticsFile_1(File file) {
        List<Integer> listStatistics = countStatistics(file);
    }

    private List<Integer> countStatistics(File file) {
        try {
            Scanner input = new Scanner(file);
            List<Integer> listStatistics = new ArrayList<>();
            int wordCount = 0;
            int punctuationCount = 0;
            while (input.hasNextLine()) {
                String nextLine = input.nextLine();

                punctuationCount += nextLine.chars().filter(ch -> ch == '-' | ch == '.' | ch == ',' | ch == ';' | ch == ':'
                        | ch == '–' | ch == '—' | ch == '…' | ch == '!' | ch == '?' | ch == '‘' | ch == '’' | ch == '«'
                        | ch == '»' | ch == '"' | ch == '[' | ch == ']' | ch == '(' | ch == ')'
                        | ch == '{' | ch == '}' | ch == '/' | ch == ' ').count();

                nextLine = nextLine.replaceAll("[^A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ\\d]"," ");

                Scanner word = new Scanner(nextLine);

                while(word.hasNext()) {
                    wordCount++;
                    word.next();
                }
                word.close();
            }
            input.close();
            listStatistics.add(wordCount);
            listStatistics.add(punctuationCount);
            return listStatistics;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }
}
