package com.showurskillz.controllers;

import com.showurskillz.model.Address;
import com.showurskillz.model.SkillDemo;
import com.showurskillz.model.User;
import com.showurskillz.model.UserAuthorize;
import com.showurskillz.services.CheckAuthorization;
import com.showurskillz.repository.ExecuteQuery;
import com.showurskillz.repository.JdbcConnection;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;

import static org.junit.Assert.*;

/**
 * Created by vipul on 10/29/2016.
 */
public class LoginTest {

    User validUser;
    User invalidUser;
    MockHttpSession mockHttpSession;
    MockHttpServletRequest mockHttpServletRequest;
    MockHttpServletResponse mockHttpServletResponse;
    Address address;
    UserAuthorize access;
    JdbcConnection jdbcConnection;
    ExecuteQuery executeQuery;
    CheckAuthorization checkAuthorization;
    Login login;
    SkillDemo skillDemo;

    @Before
    public void prepareForTestcases() {
        validUser = new User();
        validUser.setUsername("validUsername");
        validUser.setPassword("validPassword");

        invalidUser = new User();
        invalidUser.setUsername("invalidUsername");
        invalidUser.setPassword("invalidPassword");

        address = new Address();

        access = new UserAuthorize();
        jdbcConnection = new JdbcConnection();
        skillDemo = new SkillDemo();

        executeQuery = new ExecuteQuery(access, validUser, address,skillDemo);

        checkAuthorization = new CheckAuthorization(executeQuery, jdbcConnection);

        mockHttpSession = new MockHttpSession();
        mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletResponse = new MockHttpServletResponse();

        login = new Login(access, validUser, jdbcConnection, address, executeQuery, checkAuthorization);
    }


    @Test
    public void checkValidUser() throws Exception {
        UserAuthorize userAuthorize = login.checkUser(validUser, mockHttpServletRequest);
        assertEquals(true, userAuthorize.getAllow());
    }

    @Test
    public void checkInvalidUser() throws Exception {
        UserAuthorize userAuthorize = login.checkUser(invalidUser, mockHttpServletRequest);
        assertEquals(false, userAuthorize.getAllow());
    }

    @Test
    public void sendUser() throws Exception {
        mockHttpSession.setAttribute("username", "validUsername");
        mockHttpServletRequest.setSession(mockHttpSession);
        User response = login.sendUser(mockHttpSession,mockHttpServletRequest,mockHttpServletResponse);
        assertEquals("validUsername", response.getUsername());
    }

    @Test
    public void sendUserDetails() throws Exception {
        mockHttpSession.setAttribute("username", "validUsername");
        mockHttpServletRequest.setSession(mockHttpSession);
        User response = login.sendUserDetails(mockHttpSession);
        assertEquals("validUsername", response.getUsername());
    }



}