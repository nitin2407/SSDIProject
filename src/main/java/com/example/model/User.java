package com.example.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Created by nitin on 10/21/2016.
 */
@JsonSerialize
public class User {

    //private  long id;
    private String username;
    //private String email;
    //private String password;


    public User()
    {
        // default controller
    }
    public User(String username) {
        this.username = username;
       // this.email = email;
        //this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
*/
}
