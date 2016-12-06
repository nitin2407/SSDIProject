package com.showurskillz.services;

import com.showurskillz.model.Skill;
import com.showurskillz.model.Time;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.SkillQuery;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Properties;

/**
 * Created by vipul on 12/2/2016.
 */
public class MailSendingService {
    public void sendMail(IConnection dao, Skill skill) {
        SkillQuery skillQuery = new SkillQuery();
        List<String> emailReceipients = skillQuery.retrieveAllUsersEnrolledForSubscriptionInACourse(dao.establishConnection(), skill.getSkillId());
        List<Time> listOfTime = skillQuery.getSkillTime(dao.establishConnection(), skill.getTutor(),skill.getSkillId());
        String skillTimings="";
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        for(Time time : listOfTime){
//            Calendar fromTime = new GregorianCalendar(time.getFromTime().getHours());
//            Calendar toTime = new GregorianCalendar(time.getToTime());
            skillTimings=skillTimings+("\n"+time.getDay()+": "+time.getToTime().getHours()+":"+time.getToTime().getMinutes()+" - "+time.getFromTime().getHours()+":"+time.getFromTime().getMinutes());
        }
        if (emailReceipients.size() > 0) {


            // Recipient's email ID needs to be mentioned.
            //String to = "vshukla3@uncc.edu";//change accordingly

            // Sender's email ID needs to be mentioned
            String from = "showyourskillz4@gmail.com";//change accordingly
            final String username = "showyourskillz4@gmail.com";//change accordingly
            final String password = "ShowYourSkillz";//change accordingly

            // Assuming you are sending email through relay.jangosmtp.net
            String host = "smtp.gmail.com";

            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.port", "465");

            // Get the Session object.
            Session session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(username, password);
                        }
                    });

            try {
                // Create a default MimeMessage object.
                Message message = new MimeMessage(session);

                // Set From: header field of the header.
                message.setFrom(new InternetAddress(from));

                // Set To: header field of the header.
                //message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));

                for (String emailId : emailReceipients) {
                    message.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(emailId));
                }

                // Set Subject: header field
                message.setSubject("Notification: Course details changed");

                // Now set the actual message
                message.setText("Dear User," +
                        "\n\nYou are receiving this mail because some of the course details that you are enrolled in have changed." +
                        "\n \nThe new details are as follows:" +
                        "\n" +
                        "\nCourse: " + skill.getSkillName() +
                        "\nCourse Tutor: " + skill.getTutor() +
                        "\nCourse Description: " + skill.getSkillDescription() +
                        "\nCourse Timings: "+skillTimings+
                        "\n"+
                        "\nBest Regards," +
                        "\nShowYourSkillz Team");

                // Send message
                Transport.send(message);

            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
