package com.showurskillz.repository;

/**
 * Created by nitin on 10/28/2016.
 */

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.*;


public interface IConnection {
    Connection establishConnection();
}

