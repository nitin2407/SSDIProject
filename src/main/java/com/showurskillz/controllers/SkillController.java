package com.showurskillz.controllers;

import com.showurskillz.model.Skill;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.ISkillQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by vipul on 11/3/2016.
 */
@RestController
public class SkillController {
    private ISkillQuery skillQuery;
    private IConnection dao;

    @Autowired
    public SkillController(ISkillQuery skillQuery, IConnection dao) {
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
}
