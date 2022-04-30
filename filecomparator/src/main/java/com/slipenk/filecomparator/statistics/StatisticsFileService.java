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
public class StatisticsFileService {

    public List<Integer> getStatisticsFile(File file) {
        return countStatistics(file);
    }

    private List<Integer> countStatistics(File file) {
        try {
            Scanner input = new Scanner(file);
            List<Integer> listStatistics = new ArrayList<>();
            int wordCount = 0;
            int punctuationCount = 0;
            int charactersCount = 0;
            int palindromeCount = 0;

            while (input.hasNextLine()) {
                String nextLine = input.nextLine();
                charactersCount += nextLine.length();

                punctuationCount += nextLine.chars().filter(ch -> ch == '-' | ch == '.' | ch == ',' | ch == ';' | ch == ':'
                        | ch == '–' | ch == '—' | ch == '…' | ch == '!' | ch == '?' | ch == '‘' | ch == '’' | ch == '«'
                        | ch == '»' | ch == '"' | ch == '[' | ch == ']' | ch == '(' | ch == ')'
                        | ch == '{' | ch == '}' | ch == '/' | ch == ' ').count();

                nextLine = nextLine.replaceAll("[^A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ\\d]"," ");

                Scanner word = new Scanner(nextLine);

                while(word.hasNext()) {
                    wordCount++;
                    String wordForPalindrome = word.next();
                    if(isPalindrome(wordForPalindrome)) {
                        ++palindromeCount;
                    }
                }
                word.close();
            }
            input.close();
            listStatistics.add(wordCount);
            listStatistics.add(punctuationCount);
            listStatistics.add(charactersCount);
            listStatistics.add(palindromeCount);
            return listStatistics;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Collections.emptyList();
        }
    }

    private boolean isPalindrome(String str)
    {
        int i = 0, j = str.length() - 1;

        while (i < j) {

            if (str.charAt(i) != str.charAt(j)) {
                return false;
            }

            ++i;
            --j;
        }

        return true;
    }

}
