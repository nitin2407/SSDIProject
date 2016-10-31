package com.showurskillz.services;

import com.showurskillz.model.*;
import com.showurskillz.repository.ICheckAuthorize;
import com.showurskillz.repository.IConnection;
import com.showurskillz.repository.IExecuteQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;

/**
 * Created by nitin on 10/28/2016.
 */

@Service
public class CheckAuthorization implements ICheckAuthorize {

    IExecuteQuery executeService;
    IConnection dao;
    String query;

    @Autowired
    public CheckAuthorization(IExecuteQuery executeService, IConnection dao){
        this.executeService=executeService;
        this.dao=dao;
    }

    public IExecuteQuery getExecuteService() {
        return executeService;
    }

    public void setExecuteService(IExecuteQuery executeService) {
        this.executeService = executeService;
    }

    public IConnection getDao() {
        return dao;
    }

    public void setDao(IConnection dao) {
        this.dao = dao;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public UserAuthorize loginCheck(User user){

        query="Select user_name,password from user where user_name=? and password=?";
        Connection conn = dao.establishConnection();
        return executeService.loginQuery(query,conn,user);
    }
}
