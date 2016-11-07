package com.showurskillz.services;

import com.showurskillz.model.Skill;
import com.showurskillz.repository.IConnection;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by vipul on 11/3/2016.
 */
public class SkillQueryTest {
    private IConnection dao;

    @Before
    public void prepareForTestcases(){
         dao = new JdbcConnection();
    }

    @Test
    public void retrieveAllSkills() throws Exception {
        SkillQuery skillQuery = new SkillQuery();
        List<Skill> listOfSkills = skillQuery.retrieveAllSkills(dao.establishConnection());
    }

}