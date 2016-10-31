package com.showurskillz.services;

import com.showurskillz.model.Address;
import com.showurskillz.model.User;
import com.showurskillz.model.UserAuthorize;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.IExecuteQuery;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by vipul on 10/30/2016.
 */
public class CheckAuthorizationTest {
    IExecuteQuery executeService;
    UserAuthorize authorize;
    User validUser;
    User invalidUser;
    Address address;
    IConnection dao;

    @Before
    public void prepare(){
        validUser = new User();
        validUser.setUsername("validUsername");
        validUser.setPassword("validPassword");

        invalidUser = new User();
        invalidUser.setUsername("invalidUsername");
        invalidUser.setPassword("invalidPassword");

        authorize = new UserAuthorize();
        address = new Address();

        executeService= new ExecuteQuery(authorize, validUser, address);

        dao = new JdbcConnection();

    }

    @Test
    public void loginValidCheck() throws Exception {
    CheckAuthorization checkAuthorization = new CheckAuthorization(executeService, dao);
        authorize=checkAuthorization.loginCheck(validUser);
       assertEquals(true, authorize.getAllow());
    }

    @Test
    public void loginInvalidCheck() throws Exception {
        CheckAuthorization checkAuthorization = new CheckAuthorization(executeService, dao);
        authorize=checkAuthorization.loginCheck(invalidUser);
        assertEquals(false, authorize.getAllow());
    }

}