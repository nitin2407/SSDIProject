package com.showurskillz.controllers;

import com.showurskillz.model.*;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.ISkillQuery;
import com.showurskillz.repository.JdbcConnection;
import com.showurskillz.repository.SkillQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@RestController
public class SkillController {
    private ISkillQuery skillQuery;
    private IConnection dao;

    @Autowired
    public SkillController(SkillQuery skillQuery , JdbcConnection dao) {
        this.skillQuery = skillQuery;
        this.dao = dao;
    }

    @RequestMapping(path="/skills",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Skill> getAllSkills() {
        return skillQuery.retrieveAllSkills(dao.establishConnection());
    }

    @RequestMapping(path="/skills/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Skill getSkillById(@PathVariable("id") int id) {
        return skillQuery.getSkillById(dao.establishConnection(), id);
    }

    @RequestMapping(path="/skills/category/{category}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Skill> filterCategoryBySkills(@PathVariable("category") String category) {
        return skillQuery.filterSkillsByCategory(dao.establishConnection(), category);
    }

    @RequestMapping(path="/addskill",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addSkill(@RequestBody Skill skill,HttpServletResponse response,HttpSession userSession) {

        int skillResult;
        int timeResult=0;
        String tutor = (String) userSession.getAttribute("username");
        skillResult = skillQuery.insertSkill(dao.establishConnection(),skill,tutor);
        for(Time skillTime: skill.getTime()){
            timeResult = skillQuery.insertSkillTime(dao.establishConnection(),skillTime,tutor);
            if(timeResult==0){
                break;
            }
        }
        if(skillResult>0 && timeResult>0){
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
        {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }
}
