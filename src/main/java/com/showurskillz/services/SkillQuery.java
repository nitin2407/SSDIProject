package com.showurskillz.services;

import com.showurskillz.model.Skill;
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


    @Override
    public List<Skill> retrieveAllSkills(Connection conn) {
        query = "select * from skills";
        PreparedStatement pst = null;
        skillList=new ArrayList<Skill>();

        try {
            pst = conn.prepareStatement(query);
            ResultSet rs = pst.executeQuery();
            while(rs.next()){
                Skill skill = new Skill();
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
        Skill skill = new Skill();
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
                Skill skill = new Skill();
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
}
