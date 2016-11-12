package com.showurskillz.repository;

import com.showurskillz.model.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@Service
public interface ISkillQuery {

    List<Skill> retrieveAllSkills(Connection conn);
    Skill getSkillById(Connection conn, int id);
    List<Skill> filterSkillsByCategory(Connection conn, String category);
    int insertSkill(Connection conn, SkillDemo skill, String tutor);
    int insertSkillTime(Connection conn,Time time,String tutor);
}
