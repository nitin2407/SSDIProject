package com.showurskillz.repository;

import com.showurskillz.model.*;
import com.showurskillz.model.Time;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.ISkillQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@Repository
public class SkillQuery implements ISkillQuery{

    private List<Skill> skillList;
    private String query;
    //private SkillDemo skillDemo;
    //private Time time;
    private Skill skill;

    @Autowired
    public SkillQuery(Skill skill)
    {
        //this.skillDemo = skillDemo;
        //this.time=time;
        this.skill=skill;
    }

    @Override
    public List<Skill> retrieveAllSkills(Connection conn) {
        query = "select * from skills";
        PreparedStatement pst = null;
        skillList=new ArrayList<Skill>();

        try {
            pst = conn.prepareStatement(query);
            ResultSet rs = pst.executeQuery();
            while(rs.next()){
                skill = new Skill();
                skill.setSkillId(rs.getInt("skillId"));
                skill.setSkillName(rs.getString("skillName"));
                skill.setSkillDescription(rs.getString("skillDescription"));
                skill.setCategory(rs.getString("category"));
                skill.setTutor(rs.getString("tutor"));
                skill.setNumberOfInterestedPeople(rs.getInt("interestedPeopleCount"));
                skillList.add(skill);
            }
            rs.close();
            conn.close();
        }
        catch(SQLException ex){
            ex.printStackTrace();
        }
       return skillList;
    }

    @Override
    public Skill getSkillById(Connection conn, int id) {
        query = "select * from skills where skillId=?";
        PreparedStatement pst = null;
        try {
            pst=conn.prepareStatement(query);
            pst.setInt(1,id);
            ResultSet rs = pst.executeQuery();
            if(rs.next()) {
                skill.setSkillId(rs.getInt("skillId"));
                skill.setSkillName(rs.getString("skillName"));
                skill.setSkillDescription(rs.getString("skillDescription"));
                skill.setCategory(rs.getString("category"));
                skill.setTutor(rs.getString("tutor"));
                skill.setNumberOfInterestedPeople(rs.getInt("interestedPeopleCount"));
                rs.close();
                conn.close();
            }
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return skill;
    }

    @Override
    public List<Skill> filterSkillsByCategory(Connection conn, String category) {
        String commaSeperatedCategory=createSearchParameters(category);
        skillList=new ArrayList<Skill>();
        query = "select * from skills where category IN ("+commaSeperatedCategory+")";
        PreparedStatement pst = null;
        try {
            pst=conn.prepareStatement(query);
            ResultSet rs = pst.executeQuery();
            while(rs.next()) {
                skill = new Skill();
                skill.setSkillId(rs.getInt("skillId"));
                skill.setSkillName(rs.getString("skillName"));
                skill.setSkillDescription(rs.getString("skillDescription"));
                skill.setCategory(rs.getString("category"));
                skill.setTutor(rs.getString("tutor"));
                skill.setNumberOfInterestedPeople(rs.getInt("interestedPeopleCount"));
                skillList.add(skill);
            }
            rs.close();
            conn.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return skillList;
    }

    private String createSearchParameters(String incomingCategory){
        String[] categoryArray = incomingCategory.split(",");
        String commaSeperatedCategories="";
        for(String category: categoryArray){
            commaSeperatedCategories=commaSeperatedCategories+"'"+category+"',";
        }
        commaSeperatedCategories = commaSeperatedCategories.replaceAll(",$", "");
        return commaSeperatedCategories;
    }

    @Override
    public int insertSkill(Connection conn, SkillDemo skill, String tutor) {

        int result;
        query="Insert into skills VALUES (?,?,?,?,?,?)";
        PreparedStatement pst = null;
        try {
            pst = conn.prepareStatement(query);
            pst.setString(1, null);
            pst.setString(2, skill.getSkillName());
            pst.setString(3, skill.getDescription());
            pst.setString(4, skill.getCategory());
            pst.setString(5, tutor);
            pst.setInt(6, 0);
            result=pst.executeUpdate();
            return result;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;

    }

    @Override
    public int insertSkillTime(Connection conn,Time time,String tutor) {

        int result;
        int skillId;
        String queryInitial = "SELECT skillId FROM skills ORDER BY skillId DESC LIMIT 1";
        query="Insert into skilltimings VALUES (?,?,?,?,?)";
        PreparedStatement pst = null;
        try {
            pst = conn.prepareStatement(queryInitial);
            ResultSet rs = pst.executeQuery();
            if(rs.next()){
                skillId = rs.getInt("skillId");
            }
            else{
                skillId=0;
            }
            pst = conn.prepareStatement(query);
            pst.setString(1, tutor);
            pst.setInt(2, skillId);
            pst.setString(3, time.getDay());
            pst.setTimestamp(4, new Timestamp((time.getToTime()).getTime()));
            pst.setTimestamp(5, new Timestamp((time.getFromTime()).getTime()));
            result=pst.executeUpdate();
            return result;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;

    }

}
