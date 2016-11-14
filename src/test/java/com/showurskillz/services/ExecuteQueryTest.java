package com.showurskillz.services;

import com.showurskillz.model.Address;
import com.showurskillz.model.User;
import com.showurskillz.model.UserAuthorize;
import com.showurskillz.repository.ExecuteQuery;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.JdbcConnection;
import org.junit.Before;
import org.junit.Test;

import java.sql.Connection;

import static org.junit.Assert.*;

/**
 * Created by vipul on 10/30/2016.
 */
public class ExecuteQueryTest {
    UserAuthorize authorize;
    User validUser;
    User invalidUser;
    Address address;
    String qry;
    ExecuteQuery executeQuery;
    IConnection dao;

    @Before
    public void prepareForTestCases() {
        validUser = new User();
        validUser.setUsername("vshukla3@uncc.edu");
        validUser.setPassword("password");

        invalidUser = new User();
        invalidUser.setUsername("invalidUsername");
        invalidUser.setPassword("invalidPassword");

        authorize = new UserAuthorize();
        address = new Address();

        executeQuery = new ExecuteQuery(authorize, validUser, address);
        dao = new JdbcConnection();
    }

    @Test
    public void loginQuery() throws Exception {
        String query = "Select user_name,password from user where user_name=? and password=?";
        Connection conn = dao.establishConnection();
        authorize = executeQuery.loginQuery(query, conn, validUser);
        assertEquals(true, authorize.getAllow());
    }

    @Test
    public void retrieveUserTest() throws Exception {
        Connection conn = dao.establishConnection();
        User validUser=executeQuery.retrieveUser(conn, "validUsername");
        assertEquals("validUsername",validUser.getUsername());
        assertEquals("validPassword", validUser.getPassword());
    }

    @Test
    public void updateUserTest() throws Exception{
        Connection conn = dao.establishConnection();
        validUser.setUsername("Vipul");
        validUser.setPassword("Shukla");
        address.setAddressLine1("9539, University Terrace Dr., APT#A");
        validUser.setAddress(address);
        validUser.setPhoneNumber("9803958824");
        validUser.setPassword("password");
        executeQuery.updateUser(dao.establishConnection(), validUser);

        User user=executeQuery.retrieveUser(dao.establishConnection(),"vshukla3@uncc.edu");
        assertEquals(user.getPassword(),"password");
    }

}