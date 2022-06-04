package com.slipenk.filecomparator.statistics;

import com.slipenk.filecomparator.user.User;
import com.slipenk.filecomparator.user.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
@Getter
@Setter
public class StatisticsFileService {

    private StatisticsFileRepository statisticsFileRepository;
    private UserService userService;

    private List<Integer> listStatisticsTwoFiles;

    public List<Integer> getStatisticsFile(File file) {
        if (Objects.equals(FilenameUtils.getExtension(file.getAbsolutePath()), "docx")) {
            return countStatisticsDOCX(file);
        } else if (Objects.equals(FilenameUtils.getExtension(file.getAbsolutePath()), "txt")) {
            return countStatisticsTXT(file);
        } else {
            return Collections.emptyList();
        }
    }
    private List<Integer> countStatisticsDOCX(File file) {
        try {
            List<Integer> listStatistics = new ArrayList<>();
            int wordCount = 0;
            int punctuationCount = 0;
            int charactersCount = 0;
            int palindromeCount = 0;
            FileInputStream fis1 = new FileInputStream(file.getAbsolutePath());
            XWPFDocument document1 = new XWPFDocument(fis1);
            List<XWPFParagraph> paragraphs1 = document1.getParagraphs();
            for (XWPFParagraph xwpfParagraph : paragraphs1) {
                String text = xwpfParagraph.getParagraphText();
                charactersCount += text.length();
                punctuationCount += text.chars().filter(ch -> ch == '-' | ch == '.' | ch == ',' | ch == ';' | ch == ':'
                        | ch == '–' | ch == '—' | ch == '…' | ch == '!' | ch == '?' | ch == '‘' | ch == '’' | ch == '«'
                        | ch == '»' | ch == '"' | ch == '[' | ch == ']' | ch == '(' | ch == ')'
                        | ch == '{' | ch == '}' | ch == '/' | ch == ' ').count();
                text = text.replaceAll("[^A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ\\d]"," ");

                Scanner word = new Scanner(text);

                while(word.hasNext()) {
                    wordCount++;
                    String wordForPalindrome = word.next();
                    if(isPalindrome(wordForPalindrome.toLowerCase())) {
                        ++palindromeCount;
                    }
                }
                word.close();
            }

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

    private List<Integer> countStatisticsTXT(File file) {
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

                nextLine = nextLine.replaceAll("[^A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ\\-\\d]"," ");

                Scanner word = new Scanner(nextLine);

                while(word.hasNext()) {
                    wordCount++;
                    String wordForPalindrome = word.next();
                    if(isPalindrome(wordForPalindrome.toLowerCase())) {
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

        if(j == 0){
            return false;
        }

        while (i < j) {

            if (str.charAt(i) != str.charAt(j)) {
                return false;
            }

            ++i;
            --j;
        }

        return true;
    }

    public void saveStatistics(String firstFile, String secondFile, String email) {

        User user = userService.getUserByEmail(email);

        StatisticsOfComparing statisticsOfComparing = new StatisticsOfComparing(
                firstFile,
                secondFile,
                listStatisticsTwoFiles.get(8),
                listStatisticsTwoFiles.get(9),
                listStatisticsTwoFiles.get(10),
                listStatisticsTwoFiles.get(11),
                LocalDateTime.now(),
                user
        );

        statisticsFileRepository.save(statisticsOfComparing);
    }

    public List<StatisticsOfComparing> getStatistics(Long ID) {
        return statisticsFileRepository.findByUserID(ID);
    }

}
