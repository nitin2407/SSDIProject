package com.showurskillz.services;

import com.showurskillz.model.Post;
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
        int interestedCountAfter=skillQuery.getInterestedPeopleCount(1,dao.establishConnection());
        assertEquals(interestedCountBefore+1 , interestedCountAfter);
    }

    @Test
    public void testGetDiscussionList() throws Exception {

        SkillQuery skillQuery = new SkillQuery();
        List<Post> posts = skillQuery.getDiscussionList(dao.establishConnection(),1);
        assertNotEquals(posts, null);
    }

    @Test
    public void postDiscussion() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        skillQuery.postDiscussion(dao.establishConnection(),"new Reply",1,"vshukla3@uncc.edu");
        List<Post> posts = skillQuery.getDiscussionList(dao.establishConnection(),1);
        assertNotEquals(posts.size(),0);
    }

    @Test
    public void retrieveAllEnrolledCourses() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        skillQuery.enrollSkill(dao.establishConnection(),1,"vshukla3@uncc.edu");
        List<Skill> enrolledCourses=skillQuery.retrieveAllEnrolledCourses(dao.establishConnection(),"vshukla3@uncc.edu");
        assertNotEquals(enrolledCourses.size(),0);
    }

    @Test
    public void enrollSkill() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        skillQuery.enrollSkill(dao.establishConnection(),1,"vshukla3@uncc.edu");
        List<Skill> enrolledCourses=skillQuery.retrieveAllEnrolledCourses(dao.establishConnection(),"vshukla3@uncc.edu");
        assertNotEquals(enrolledCourses.size(),0);
    }

    @Test
    public void retrieveAllUsersEnrolledForSubscriptionInACourse() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        skillQuery.subscribeForEmailNotifications(dao.establishConnection(),1,"vshukla3@uncc.edu");
        List<String>listOfSubscribers=skillQuery.retrieveAllUsersEnrolledForSubscriptionInACourse(dao.establishConnection(),1);
        assertNotEquals(listOfSubscribers,0);
    }

}