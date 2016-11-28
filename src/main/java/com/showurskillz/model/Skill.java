package com.showurskillz.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@JsonSerialize
@Component
public class Skill {
    private int skillId;
    private String skillName;
    private String skillDescription;
    private String category;
    private List<Time> time;
    private String tutor;
    private int numberOfInterestedPeople;
    private List<String> interestedUsers;

    public int getSkillId() {
        return skillId;
    }

    public void setSkillId(int skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getSkillDescription() {
        return skillDescription;
    }

    public void setSkillDescription(String skillDescription) {
        this.skillDescription = skillDescription;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Time> getTime() {
        return time;
    }

    public void setTime(List<Time> time) {
        this.time = time;
    }

    public String getTutor() {
        return tutor;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

    public int getNumberOfInterestedPeople() {
        return numberOfInterestedPeople;
    }

    public void setNumberOfInterestedPeople(int numberOfInterestedPeople) {
        this.numberOfInterestedPeople = numberOfInterestedPeople;
    }

    public List<String> getInterestedUsers() {
        return interestedUsers;
    }

    public void setInterestedUsers(List<String> interestedUsers) {
        this.interestedUsers = interestedUsers;
    }
}
