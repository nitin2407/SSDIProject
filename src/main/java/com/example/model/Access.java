package com.example.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Created by nitin on 10/22/2016.
 */
@JsonSerialize
public class Access {

    private String allow;

    public Access()
    {
        // default controller
    }
    public Access(String allow) {
        this.allow = allow;
    }


    public String getAllow() {
        return allow;
    }

    public void setAllow(String allow) {
        this.allow = allow;
    }



}
