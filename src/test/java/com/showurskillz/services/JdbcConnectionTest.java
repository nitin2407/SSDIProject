package com.showurskillz.services;

import com.showurskillz.repository.JdbcTestDBConnection;
import org.junit.Test;

import java.sql.Connection;

import static org.junit.Assert.*;

/**
 * Created by vipul on 10/30/2016.
 */
public class JdbcConnectionTest {
    @Test
    public void establishConnection() throws Exception {
    JdbcTestDBConnection jdbcConnection = new JdbcTestDBConnection();
        Connection conn = jdbcConnection.establishConnection();
        assertNotEquals(conn, null);
    }

}