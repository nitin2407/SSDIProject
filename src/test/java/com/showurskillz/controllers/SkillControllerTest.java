package com.showurskillz.controllers;

import com.showurskillz.model.Skill;
import com.showurskillz.repository.JdbcConnection;
import com.showurskillz.repository.SkillQuery;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by vipul on 11/14/2016.
 */
public class SkillControllerTest {
    SkillController skillController;
    MockHttpSession mockHttpSession;
    MockHttpServletRequest mockHttpServletRequest;
    MockHttpServletResponse mockHttpServletResponse;
    JdbcConnection dao;

    @Before
    public void prepareForTest() {
        SkillQuery skillQuery=new SkillQuery();
         dao=new JdbcConnection();
        skillController=new SkillController(skillQuery,dao);
        mockHttpSession = new MockHttpSession();
        mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletResponse = new MockHttpServletResponse();
    }


    @Test
    public void getAllSkills() throws Exception {
        List<Skill> skillList=skillController.getAllSkills();
        assertNotEquals(skillList, null);
    }

    @Test
    public void filterCategoryBySkills() throws Exception {
       List<Skill>skillList= skillController.filterCategoryBySkills("study");
        assertNotEquals(skillList, null);
    }

    @Test
    public void sendSkill() throws Exception {
        mockHttpSession.setAttribute("username", "vshukla3@uncc.edu");
        mockHttpServletRequest.setSession(mockHttpSession);
        mockHttpServletResponse = new MockHttpServletResponse();
        Skill skill=skillController.sendSkill(1,mockHttpSession,mockHttpServletResponse);
        assertEquals(skill.getSkillId(),1);
    }


    @Test
    public void getSkills() throws Exception {
        mockHttpSession.setAttribute("username", "vshukla3@uncc.edu");
        mockHttpServletRequest.setSession(mockHttpSession);
        mockHttpServletResponse = new MockHttpServletResponse();
        List<Skill>skill=skillController.getSkills(mockHttpSession, mockHttpServletRequest);
        assertNotEquals(skill, null);
    }

    @Test
    public void increaseInterestedCount() throws Exception {
        mockHttpSession.setAttribute("username", "vshukla3@uncc.edu");
        mockHttpServletRequest.setSession(mockHttpSession);
        mockHttpServletResponse = new MockHttpServletResponse();

        Skill skillBefore=skillController.sendSkill(1,mockHttpSession,mockHttpServletResponse);
        int countBefore=skillBefore.getNumberOfInterestedPeople();

        skillController.increaseInterestedCount(1);

        Skill skillAfter=skillController.sendSkill(1,mockHttpSession,mockHttpServletResponse);
        int countAfter=skillAfter.getNumberOfInterestedPeople();

        assertEquals(countBefore+1,countAfter);
    }

}