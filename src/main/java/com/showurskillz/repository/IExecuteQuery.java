package com.showurskillz.repository;

/**
 * Created by nitin on 10/28/2016.
 */

import java.sql.*;
import com.showurskillz.model.*;
import org.springframework.stereotype.Repository;


public interface IExecuteQuery {
    UserAuthorize loginQuery(String qry,Connection conn,User user);
    int insertUser(Connection conn,User user);
    User retrieveUser(Connection conn,String username);
    void updateUser(Connection conn, User user);
    void clearAll();
}
