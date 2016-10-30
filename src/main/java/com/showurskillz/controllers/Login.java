package com.example.controllers;

/**
 * Created by nitin on 10/21/2016.
 */
import com.example.model.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.omg.CORBA.Request;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.web.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.*;

@RestController
public class Login{

    @RequestMapping(path="/hello",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Access checkUser(@RequestBody User user, HttpSession userSession,HttpServletRequest request) {
        Access access = new Access();

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/showyourskillz", "root", "nitin4192");
            PreparedStatement pst = conn.prepareStatement("Select user_name,password from user where user_name=? and password=?");
            pst.setString(1, user.getUsername());
            pst.setString(2, user.getPassword());
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                access.setAllow("yes");
                userSession = request.getSession();
                userSession.setAttribute("username",user.getUsername());
                rs.close();
                return access;
            } else {
                access.setAllow("no");
                rs.close();
                return access;
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        //if (user.getUsername().equals("nitin")){
        //  access.setAllow("yes");
        //return access;
        //}
        //else{
        //  access.setAllow("no");
        //return access;
        //}

        return access;
    }
    @RequestMapping(path="/login",method = RequestMethod.GET,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody User sendUser(HttpSession userSession, HttpServletRequest request,HttpServletResponse response) throws IOException {

        userSession = request.getSession();

        User user = new User();
        if(request.getSession(false)== null && request.getSession(false).toString().isEmpty()) {
            response.sendRedirect("/");
        }
        else{
            user.setUsername((String) userSession.getAttribute("username"));
            return user;
        }
        //else
        //{
          //  user.setUsername("no");
            //return user;
        //}
        return user;
    }
    @RequestMapping(path="/logout",method = RequestMethod.GET)
    public void logOut(HttpSession userSession, HttpServletRequest request) {

        if(userSession != null){
            userSession.invalidate();
        }
    }

    @RequestMapping(path="/signup",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public void registerUser(@RequestBody User user) {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/showyourskillz", "root", "nitin4192");
            PreparedStatement pst = conn.prepareStatement("Insert into user VALUES (?,?,?,?,?,?,?,?,?,?)");
            pst.setString(1, user.getUsername());
            pst.setString(2, user.getPassword());
            pst.setString(3, user.getFname());
            pst.setString(4, user.getLname());
            pst.setString(5, (user.getAddress()).getAddressLine1());
            pst.setString(6, (user.getAddress()).getAddressLine2());
            pst.setString(7, (user.getAddress()).getCity());
            pst.setString(8, (user.getAddress()).getZip_code());
            pst.setString(9, (user.getAddress()).getState());
            pst.setString(10, user.getPhoneNumber());
            //Statement stmt = conn.createStatement();
            pst.executeUpdate();
            /*ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                //userSession = request.getSession();
                //userSession.setAttribute("username",user.getUsername());
                rs.close();
                //return access;
            } else {

                rs.close();
                //return access;
            }*/
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }

        //return access;
    }

    @RequestMapping(path="/profile",method = RequestMethod.GET,produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody User sendUserDetails(HttpSession userSession, HttpServletRequest request) {

        User user = new User();
        Address address=new Address();
        user.setUsername((String) userSession.getAttribute("username"));
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/showyourskillz", "root", "nitin4192");
            PreparedStatement pst = conn.prepareStatement("SELECT * from user where user_name= ?");
            pst.setString(1,user.getUsername());
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                user.setPassword(rs.getString("password"));
                user.setFname(rs.getString("fname"));
                user.setLname(rs.getString("lname"));
                user.setPhoneNumber(rs.getString("phone_no"));
                address.setAddressLine1(rs.getString("addr1"));
                address.setAddressLine2(rs.getString("addr2"));
                address.setCity(rs.getString("city"));
                address.setState(rs.getString("state"));
                address.setZip_code(rs.getString("zip_code"));
                user.setAddress(address);
                rs.close();
                return user;
            } else {
                rs.close();
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    @RequestMapping(path="/profile",method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public void editUser(@RequestBody User user,HttpSession userSession, HttpServletRequest request) {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/showyourskillz", "root", "nitin4192");
            PreparedStatement pst = conn.prepareStatement("Update user set fname=?,lname=?,password=?,addr1=?,addr2=?,city=?,state=?,zip_code=?,phone_no=? where user_name=?");
            pst.setString(1, user.getFname());
            pst.setString(2, user.getLname());
            pst.setString(3, user.getPassword());
            pst.setString(4, (user.getAddress()).getAddressLine1());
            pst.setString(5, (user.getAddress()).getAddressLine2());
            pst.setString(6, (user.getAddress()).getCity());
            pst.setString(7, (user.getAddress()).getState());
            pst.setString(8, (user.getAddress()).getZip_code());
            pst.setString(9, user.getPhoneNumber());
            pst.setString(10, (String) userSession.getAttribute("username"));
            pst.executeUpdate();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }


}
