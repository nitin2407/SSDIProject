package com.showurskillz.services;

import com.showurskillz.model.Skill;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.JdbcTestDBConnection;
import com.showurskillz.repository.SkillQuery;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
public class SkillQueryTest {
    private IConnection dao;
    private Skill skill;

    @Before
    public void prepareForTestcases() {
        dao = new JdbcTestDBConnection();
    }

    @Test
    public void retrieveAllSkills() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        List<Skill> listOfSkills = skillQuery.retrieveAllSkills(dao.establishConnection());
        assertNotEquals(listOfSkills, null);
    }

    @Test
    public void getSkillByIdTest() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        Skill skill = skillQuery.getSkillById(dao.establishConnection(), 1);
        assertEquals(skill.getSkillId(), 1);
    }

    @Test
    public void filterSkillsByCategoryTest() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        List<Skill> skillList = skillQuery.filterSkillsByCategory(dao.establishConnection(), "study", "vshukla3@uncc.edu");
        assertNotEquals(skillList, null);
    }

    @Test
    public void getSkillByTutorTest() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        Skill skill = skillQuery.getSkillByTutor(dao.establishConnection(), "npurohi1@uncc.edu");
        assertEquals(skill.getTutor(), "npurohi1@uncc.edu");
    }

    @Test
    public void retrieveSkillsTest(){
        SkillQuery skillQuery=new SkillQuery();
        List<Skill> skillList=skillQuery.retrieveSkills(dao.establishConnection(),"vshukla3@uncc.edu");
        assertNotEquals(skillList, null);
    }

    @Test
    public void testIncreaseInterestedCount() throws Exception{
        SkillQuery skillQuery=new SkillQuery();
        Skill skill=skillQuery.getSkillById(dao.establishConnection(),1);
        int interestedCountBefore=skill.getNumberOfInterestedPeople();
        skillQuery.increaseInterestedCount(dao.establishConnection(),1);
        int interestedCountAfter=skill.getNumberOfInterestedPeople();
        assertEquals(interestedCountBefore+1 , interestedCountAfter);
    }



}