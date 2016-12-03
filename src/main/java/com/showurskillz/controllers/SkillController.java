package com.showurskillz.controllers;

import com.showurskillz.model.*;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.ISkillQuery;
import com.showurskillz.repository.JdbcConnection;
import com.showurskillz.repository.SkillQuery;
import com.showurskillz.services.MailSendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@RestController
public class SkillController {
    private ISkillQuery skillQuery;
    private IConnection dao;

    @Autowired
    public SkillController(SkillQuery skillQuery , IConnection dao) {
        this.skillQuery = skillQuery;
        this.dao = dao;
    }

    @RequestMapping(path="/skills",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Skill> getAllSkills() {
        return skillQuery.retrieveAllSkills(dao.establishConnection());
    }

    @RequestMapping(path="/skills/category/{category}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Skill> filterCategoryBySkills(@PathVariable("category") String category, HttpSession userSession) {
        return skillQuery.filterSkillsByCategory(dao.establishConnection(), category, (String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/addskill",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addSkill(@RequestBody Skill skill,HttpServletResponse response,HttpSession userSession) {

        int skillResult;
        int timeResult=0;
        String tutor = (String) userSession.getAttribute("username");
        skillResult = skillQuery.insertSkill(dao.establishConnection(),skill,tutor);
        for(Time skillTime: skill.getTime()){
            timeResult = skillQuery.insertSkillTime(dao.establishConnection(),skillTime,tutor);
            if(timeResult==0){
                break;
            }
        }
        if(skillResult>0 && timeResult>0){
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
        {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }


    @RequestMapping(path="/manageSkill/{id}",method = RequestMethod.GET,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Skill sendSkill(@PathVariable("id") int id, HttpSession userSession, HttpServletResponse response) throws IOException {

        return skillQuery.getSkillById(dao.establishConnection(),id);

    }

    @RequestMapping(path="/manageSkill",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public  void editSkill(@RequestBody Skill skill,HttpSession userSession,HttpServletResponse response) {

        int skillResult=0;
        int timeResult=0;
        skill.setTutor((String) userSession.getAttribute("username"));
        skillResult = skillQuery.updateSkill(dao.establishConnection(), skill);
        for(Time skillTime: skill.getTime()){
            timeResult = skillQuery.updateSkillTime(dao.establishConnection(),skill,skillTime);
            if(timeResult==0){
                break;
            }
        }
        if(skillResult>0 && timeResult>0){
            response.setStatus(HttpServletResponse.SC_OK);
            MailSendingService mailSendingService=new MailSendingService();
            mailSendingService.sendMail(dao,skill);
        }
        else
        {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }

    @RequestMapping(path = "/skillByUser", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Skill> getSkills(HttpSession userSession,HttpServletRequest request) {

        //userSession = request.getSession();
        return skillQuery.retrieveSkills(dao.establishConnection(), (String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/deleteSkill/{id}",method=RequestMethod.GET)
    public @ResponseBody boolean deleteSkillById(@PathVariable("id") int id) {
        return skillQuery.deleteSkillById(dao.establishConnection(),id);
    }
    @RequestMapping(path="/increaseInterestedCount/{id}",method=RequestMethod.POST)
    public void increaseInterestedCount(@PathVariable("id") int id,HttpSession userSession)
    {
        skillQuery.increaseInterestedCount(dao.establishConnection(),id);
        skillQuery.insertInterestedUser(dao.establishConnection(),id,(String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/decreaseInterestedCount/{id}",method=RequestMethod.POST)
    public void decreaseInterestedCount(@PathVariable("id") int id,HttpSession userSession)
    {
        if(skillQuery.getInterestedPeopleCount(id,dao.establishConnection())>0) {
            skillQuery.decreaseInterestedCount(dao.establishConnection(), id);
            skillQuery.removeInterestedUser(dao.establishConnection(), id, (String) userSession.getAttribute("username"));
        }
    }

    @RequestMapping(path="/checkInterest/{id}",method=RequestMethod.GET)
    public @ResponseBody boolean checkSkillInterestById(@PathVariable("id") int id,HttpSession userSession) {

        return skillQuery.checkSkillInterest(dao.establishConnection(),id,(String) userSession.getAttribute("username"));
    }

    @RequestMapping(path = "/discussionForum/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Post> getPosts(@PathVariable int id) {
        return skillQuery.getDiscussionList(dao.establishConnection(), id);
    }

    @RequestMapping(path = "/postDiscussion/{reply}/{id}", method = RequestMethod.POST)
    public void postDiscussion(@PathVariable("reply") String reply,@PathVariable("id") int id,HttpSession userSession) {
        skillQuery.postDiscussion(dao.establishConnection(),reply,id,(String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/enrolledCoursesOfUser",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Skill> getAllEnrolledCourses(HttpSession userSession) {
        return skillQuery.retrieveAllEnrolledCourses(dao.establishConnection(), (String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/subscribeForEmailNotification/{skillId}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    void subscribeForEmailNotification(@PathVariable("skillId") int skillId,HttpSession userSession) {
         skillQuery.subscribeForEmailNotifications(dao.establishConnection(), skillId, (String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/unsubscribeFromEmailNotification/{skillId}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    void unsubscribeFromEmailNotification(@PathVariable("skillId") int skillId,HttpSession userSession) {
        skillQuery.unsubscribeFromEmailNotifications(dao.establishConnection(), skillId, (String) userSession.getAttribute("username"));
    }

    @RequestMapping(path="/interestedCoursesOfUser",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Skill> getAllInterestedCourses(HttpSession userSession) {
        return skillQuery.retrieveAllInterestedCourses(dao.establishConnection(), (String) userSession.getAttribute("username"));
    }

    @RequestMapping(path = "/enrollSkill/{id}", method = RequestMethod.POST)
    public void getPosts(@PathVariable int id,HttpSession userSession) {
        skillQuery.enrollSkill(dao.establishConnection(), id,(String)userSession.getAttribute("username"));
    }

}
