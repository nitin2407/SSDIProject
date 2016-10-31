package com.showurskillz.controllers;

/**
 * Created by nitin on 10/21/2016.
 */
import com.showurskillz.model.*;
import com.showurskillz.services.ExecuteQuery;
import com.showurskillz.services.JdbcConnection;
import com.showurskillz.services.CheckAuthorization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.showurskillz.repository.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.*;

@RestController
public class Login{

    private UserAuthorize access;
    private User user;
    private Address address;
    private IConnection dao;
    private IExecuteQuery executeQuery;
    private ICheckAuthorize checkUser;

    @Autowired
    public Login(UserAuthorize access, User user, JdbcConnection dao, Address address, ExecuteQuery executeQuery, CheckAuthorization checkUser){
        this.access=access;
        this.user=user;
        this.address=address;
        this.dao=dao;
        this.executeQuery=executeQuery;
        this.checkUser=checkUser;
    }

    public UserAuthorize getAccess() {
        return access;
    }

    public void setAccess(UserAuthorize access) {
        this.access = access;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public IConnection getDao() {
        return dao;
    }

    public void setDao(IConnection dao) {
        this.dao = dao;
    }

    public IExecuteQuery getExecuteService() {
        return executeQuery;
    }

    public void setExecuteService(IExecuteQuery executeService) {
        this.executeQuery = executeService;
    }

    public ICheckAuthorize getCheckUser() {
        return checkUser;
    }

    public void setCheckUser(ICheckAuthorize checkUser) {
        this.checkUser = checkUser;
    }

    @RequestMapping(path="/login",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody UserAuthorize checkUser(@RequestBody User user,HttpServletRequest request) {

        HttpSession userSession;
        access=checkUser.loginCheck(user);
        if(access.getAllow()==true){
            userSession = request.getSession();
            userSession.setAttribute("username",user.getUsername());
        }
        return access;
    }


    @RequestMapping(path="/home",method = RequestMethod.GET,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody User sendUser(HttpSession userSession) throws IOException {

        user.setUsername((String) userSession.getAttribute("username"));
        return user;
    }

    @RequestMapping(path="/logout",method = RequestMethod.GET)
    public void logOut(HttpSession userSession) {

        if(userSession != null){
            userSession.invalidate();
        }
    }

    @RequestMapping(path="/signup",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public void registerUser(@RequestBody User user,HttpServletResponse response) {

        int result;
        result = executeQuery.insertUser(dao.establishConnection(),user);
        if(result>0){
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
        {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }

    @RequestMapping(path="/profile",method = RequestMethod.GET,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody User sendUserDetails(HttpSession userSession, HttpServletRequest request) {

        return executeQuery.retrieveUser(dao.establishConnection(),(String) userSession.getAttribute("username"));

    }

    @RequestMapping(path="/profile",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public void editUser(@RequestBody User user,HttpSession userSession, HttpServletRequest request) {

        executeQuery.updateUser(dao.establishConnection(),user);

    }


}
