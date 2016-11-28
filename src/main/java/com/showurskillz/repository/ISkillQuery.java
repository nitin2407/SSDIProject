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
    int insertSkill(Connection conn, Skill skill, String tutor);
    int insertSkillTime(Connection conn,Time time,String tutor);
    Skill getSkillByTutor(Connection conn, String tutor);
    int updateSkill(Connection conn, Skill skill);
    List<Time> getSkillTime(Connection conn,String tutor,int skillId);
    int deleteSkillTime(Connection conn,String tutor,int skillId);
    int updateSkillTime(Connection conn,Skill skill,Time time);
    List<Skill> retrieveSkills(Connection conn, String tutor);
    boolean deleteSkillById(Connection connection, int id);
    void increaseInterestedCount(Connection connection, int id);
    void insertInterestedUser(Connection conn,int id,String username);
    boolean checkSkillInterest(Connection conn,int id,String username);
    List<String> getInterestedUsersList(Connection conn,int id);
    void decreaseInterestedCount(Connection conn, int id);
    void removeInterestedUser(Connection conn,int id,String username);
    int getInterestedPeopleCount(int id, Connection conn);
}
