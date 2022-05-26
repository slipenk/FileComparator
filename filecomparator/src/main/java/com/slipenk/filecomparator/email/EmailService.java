package com.slipenk.filecomparator.email;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender {

    private static final String NOT_SEND_EMAIL = "Помилка при надсиланні електронного листа";
    private static final String CONFIRM_EMAIL = "Лист від застосунку \"Беруля\"";
    private static final String MY_EMAIL = "slipenk92@gmail.com";
    private static final String ENCODING = "UTF-8";
    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, ENCODING);
            mimeMessageHelper.setText(email, true);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(CONFIRM_EMAIL);
            mimeMessageHelper.setFrom(MY_EMAIL);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error(NOT_SEND_EMAIL, e);
            throw new IllegalStateException(NOT_SEND_EMAIL);
        }
    }
}
