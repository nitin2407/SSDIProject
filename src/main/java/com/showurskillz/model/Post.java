package com.showurskillz.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by nitin on 11/11/2016.
 */

@JsonSerialize
@Component
public class Post {

    private String data;
    private String username;
    //private Date postDate;

    public String getData() {
        return data;
    }

    public void setData(String discussion) {
        this.data = discussion;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}


