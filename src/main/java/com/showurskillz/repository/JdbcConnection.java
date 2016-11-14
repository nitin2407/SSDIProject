package com.showurskillz.repository;

/**
 * Created by nitin on 10/28/2016.
 */

import com.showurskillz.repository.IConnection;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.*;
@Repository
public class JdbcConnection implements IConnection {

    private String connectionString="jdbc:mysql://localhost:3306/showyourskillz";
    private String sqlUser="root";
    private String sqlPass="password";

    @Override
    public Connection establishConnection() {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            return DriverManager.getConnection(connectionString, sqlUser, sqlPass);
        }
        catch(ClassNotFoundException|SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
}
