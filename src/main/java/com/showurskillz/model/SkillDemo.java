package com.showurskillz.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by nitin on 11/11/2016.
 */
@JsonSerialize
@Component
public class SkillDemo {

    private String skillName;
    private String category;
    private List<Time> time;
    private String phoneNumber;
    private String fname;
    private String lname;

}
