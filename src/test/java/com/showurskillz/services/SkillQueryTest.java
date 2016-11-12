package com.showurskillz.services;

import com.showurskillz.model.Skill;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.JdbcConnection;
import com.showurskillz.repository.SkillQuery;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
public class SkillQueryTest {
    private IConnection dao;
    private Skill skill;

    @Before
    public void prepareForTestcases(){
         dao = new JdbcConnection();
    }

    @Test
    public void retrieveAllSkills() throws Exception {
        SkillQuery skillQuery = new SkillQuery(skill);
        List<Skill> listOfSkills = skillQuery.retrieveAllSkills(dao.establishConnection());
    }

}