package com.showurskillz.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Created by vipul on 11/15/2016.
 */
public class JdbcTestDBConnection implements IConnection{
    private String connectionString="jdbc:mysql://localhost:3306/showyourskillztest";
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
