package com.showurskillz.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.stereotype.Component;

/**
 * Created by nitin on 10/21/2016.
 */
@JsonSerialize
@Component
public class User {

    //private  long id;
    private String username;
    private String password;
    private Address address;
    private String phoneNumber;
    private String fname;
    private String lname;

    public User()
    {
        // default controller
    }
    /*public User(String username, String password) {
        this.username = username;
       // this.email = email;
        this.password = password;
    }*/

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    /*    public long getId()
     {
            return id;
        }

       public void setId(long id) {
            this.id = id;

        }
    */
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
/*
    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }
*/
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
