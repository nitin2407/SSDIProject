package com.showurskillz.services;

/**
 * Created by nitin on 10/28/2016.
 */

import com.showurskillz.repository.IConnection;
import org.springframework.stereotype.Service;

import java.sql.*;

@Service
public class JdbcConnection implements IConnection {

    private String connectionString="jdbc:mysql://localhost:3306/showyourskillz";
    private String sqlUser="root";
    private String sqlPass="nitin4192";

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
