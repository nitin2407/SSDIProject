package com.showurskillz.services;

import com.showurskillz.model.*;
import com.showurskillz.repository.ISkillQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@Service
public class SkillQuery implements ISkillQuery{

    private List<Skill> skillList;
    private String query;
    private SkillDemo skillDemo;
    private Time time;
    private Skill skill;

    @Autowired
    public SkillQuery(SkillDemo skillDemo,Time time,Skill skill)
    {
        this.skillDemo = skillDemo;
        this.time=time;
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
    public int insertSkill(Connection conn, SkillDemo skill,String tutor) {

        int result;
        query="Insert into skills VALUES (?,?,?,?,?)";
        PreparedStatement pst = null;
        try {
            pst = conn.prepareStatement(query);
            pst.setString(1, skillDemo.getSkillName());
            pst.setString(2, skillDemo.getDescription());
            pst.setString(3, skillDemo.getCategory());
            pst.setString(4, tutor);
            pst.setInt(5, 0);
            result=pst.executeUpdate();
            return result;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;

    }

}
